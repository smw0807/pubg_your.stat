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

  //파이어스토어에 플레이닉네임이 저장된 데이터가 있는지 확인
  existsUser(uid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = doc(this.db, this.collection, uid);
        const docSnap = await getDoc(docRef);
        resolve(docSnap.exists());
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
