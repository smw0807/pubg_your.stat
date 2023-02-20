import { FireStore } from '@/apis/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ITeamMessage, ITeamInfo } from '@/interfaces';

export class TeamRoomAPI {
  private db = FireStore;
  private collection: string = 'teams';

  getTeamInfo(uid: string) {
    return new Promise(async (resolve, reject) => {
      const docRef = doc(this.db, this.collection, uid);
      try {
        const docSnap = await getDoc(docRef);
        resolve(docSnap);
      } catch (err) {
        reject(err);
      }
    });
  }

  //팀 참여
  joinTeam() {}

  //팀 접속자 리스트 가져오기
  getTeamMembers() {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (err) {
        reject(err);
      }
    });
  }
}
