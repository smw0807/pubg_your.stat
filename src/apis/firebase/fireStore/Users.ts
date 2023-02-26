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
  async getPlatformNickname(uid: string): Promise<IUserPlatformNickNames | null> {
    try {
      const docRef = doc(this.db, this.collection, uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists()
        ? {
            email: docSnap.data().email,
            'kakao-nickname': docSnap.data()['kakao-nickname'],
            'steam-nickname': docSnap.data()['steam-nickname'],
            'created-date': docSnap.data()['created-date'],
            'updated-date': docSnap.data()['updated-date'],
          }
        : null;
    } catch (err) {
      console.error(err);
      throw '저장된 플레이어 닉네임을 가져오는데 실패 했습니다.';
    }
  }

  //사용자의 카카오, 스팀 플레이 닉네임 저장, 수정
  async savePlatformNickname(
    mode: 'ins' | 'upd' = 'ins',
    user: User,
    steamNickName: string,
    kakaoNickName: string
  ): Promise<boolean | string> {
    try {
      const data: IUserPlatformNickNames = {
        email: user.email,
        'kakao-nickname': kakaoNickName,
        'steam-nickname': steamNickName,
        'updated-date': nowDateFormat('YYYY-MM-DD HH:mm:ss'),
      };

      switch (mode) {
        case 'ins':
          data['created-date'] = nowDateFormat('YYYY-MM-DD HH:mm:ss');
          break;
        case 'upd':
          const docSnap = await getDoc(doc(this.db, this.collection, user.uid));
          const existingData = docSnap.data();
          data['created-date'] = existingData?.['created-date'] || '';
          break;
        default:
          throw new Error(`Invalid mode: ${mode}`);
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
        return this.message;
      } else {
        await setDoc(doc(this.db, this.collection, user.uid), data);
        return true;
      }
    } catch (err) {
      console.error(err);
      throw '닉네임 저장 실패에 실패하였습니다.';
    }
  }

  //사용자 닉네임 중복체크
  async duplicateCheck(email: string, platform: string, nickname: string): Promise<boolean> {
    try {
      const q = query(
        collection(this.db, this.collection),
        where(`email`, '!=', email),
        where(`${platform}-nickname`, '==', nickname)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length === 0) {
        return false;
      } else {
        querySnapshot.docs.forEach(doc => {
          this.message = `닉네임 [${
            doc.data()[`${platform}-nickname`]
          }]은/는 다른 사용자가 이미 등록한 닉네임입니다.`;
        });
        return true;
      }
    } catch (err) {
      console.error(err);
      throw '닉네임 중복체크 실패';
    }
  }
}
