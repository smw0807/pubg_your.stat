import { FireStore } from '@/apis/firebase';
import { doc, getDoc, getDocs, setDoc, query, collection, where } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { IUserPlatformNickNames } from '@/interfaces';
import { nowDateFormat } from '@/utils';

export class UsersAPI {
  private db = FireStore;
  private collection: string = 'users';
  //반환할 메세지 담을 곳
  private message: string = '';

  //저장된 플렛폼 플레이 닉네임 가져오기
  getMyPlatformNickname(uid: string): Promise<IUserPlatformNickNames | null> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: IUserPlatformNickNames | null = null;
        const docRef = doc(this.db, this.collection, uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          result = {
            email: data.email,
            'kakao-nickname': data['kakao-nickname'],
            'steam-nickname': data['steam-nickname'],
            'created-date': data['created-date'],
            'updated-date': data['updated-date'],
          };
        }
        resolve(result);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }

  //사용자의 카카오, 스팀 플레이 닉네임 저장
  savePlatformNickname(
    mode: 'ins' | 'upd' = 'ins',
    user: User,
    steamNickName: string,
    kakaoNickName: string
  ): Promise<boolean | string> {
    return new Promise(async (resolve, reject) => {
      try {
        const data: IUserPlatformNickNames = {
          email: user.email,
          'kakao-nickname': kakaoNickName,
          'steam-nickname': steamNickName,
          'updated-date': nowDateFormat('YYYY-MM-DD HH:mm:ss'),
        };
        if (mode === 'ins') {
          data['created-date'] = nowDateFormat('YYYY-MM-DD HH:mm:ss');
        } else {
          // 기존 created-date 가져오기
          const docSnap = await getDoc(doc(this.db, this.collection, user.uid));
          const existingData = docSnap.data();
          data['created-date'] = existingData?.['created-date'] || '';
        }
        //플레이어 닉네임 중복체크
        let isDupl = false;
        //스팀 중복체크
        if (steamNickName !== '') {
          isDupl = await this.duplicateCheck(data.email as string, 'steam', steamNickName);
        }
        //카카오 중복체크
        if (kakaoNickName !== '' && !isDupl) {
          isDupl = await this.duplicateCheck(data.email as string, 'kakao', kakaoNickName);
        }
        //중복 닉네임 있을 시
        if (isDupl) {
          resolve(this.message);
          this.message = '';
        } else {
          await setDoc(doc(this.db, this.collection, user.uid), data);
          resolve(true);
        }
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }

  //사용자 닉네임 중복체크
  async duplicateCheck(email: string, platform: string, nickname: string): Promise<boolean> {
    let result = false;
    try {
      let q = query(
        collection(this.db, this.collection),
        where(`email`, '!=', email),
        where(`${platform}-nickname`, '==', nickname)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length === 0) {
        result = false;
      } else {
        querySnapshot.docs.map(v => {
          this.message = '닉네임 [';
          this.message += v.data()[`${platform}-nickname`];
          this.message += ']은/는 다른 사용자가 이미 등록한 닉네임입니다.';
        });
        result = true;
      }
    } catch (err) {
      console.warn('닉네임 중복체크 실패');
      console.error(err);
    }
    return result;
  }

  //todo 플레이 닉네임 수정 함수
}
