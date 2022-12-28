import { FireStore } from '@/apis/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
// import type { DocumentData } from 'firebase/firestore';
import { IUsers } from '@/interfaces';

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
  insertUser(uid: string, steamNickName: string, kakaoNickName: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const data: IUsers = {
          'kakao-nickname': kakaoNickName,
          'steam-nickname': steamNickName,
          'created-date': new Date(),
          'updated-date': new Date(),
        };
        await setDoc(doc(this.db, this.collection, uid), data);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }

  //todo 플레이 닉네임 수정 함수
}
