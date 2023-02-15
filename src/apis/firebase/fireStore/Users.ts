import { FireStore } from '@/apis/firebase';
import { doc, getDoc, getDocs, setDoc, query, collection, where } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { IUserPlatformNickNames } from '@/interfaces';
import { nowDateFormat } from '@/utils';

export class UsersAPI {
  private db = FireStore;
  private collection: string = 'users';

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

  //최초 로그인 시 사용할 함수, 사용자의 카카오, 스팀 플레이 닉네임 저장
  savePlatformNickname(user: User, steamNickName: string, kakaoNickName: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const data: IUserPlatformNickNames = {
          email: user.email,
          'kakao-nickname': kakaoNickName,
          'steam-nickname': steamNickName,
          'created-date': nowDateFormat('YYYY-MM-DD HH:mm:ss'),
          'updated-date': nowDateFormat('YYYY-MM-DD HH:mm:ss'),
        };
        //플랫폼 별 닉네임 중복체크
        // let isDuple = false;
        // if (steamNickName !== '') {
        //   isDuple = await this.duplicateCheck('steam', steamNickName);
        // }
        // if (kakaoNickName !== '') {
        //   isDuple = await this.duplicateCheck('kakao', kakaoNickName);
        // }
        // console.log('isDuple : ', isDuple);
        // if (!isDuple) {
        await setDoc(doc(this.db, this.collection, user.uid), data);
        // }
        resolve();
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }

  //사용자 닉네임 중복체크
  async duplicateCheck(platform: string, nickname: string): Promise<boolean> {
    let result = false;
    try {
      let q = query(
        collection(this.db, this.collection),
        where(`${platform}-nickname`, '==', nickname)
      );
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.docs);
      querySnapshot.docs.map(v => {
        console.log(v.data());
      });
    } catch (err) {
      console.warn('닉네임 중복체크 실패');
      console.error(err);
    }
    return result;
  }

  //todo 플레이 닉네임 수정 함수
}
