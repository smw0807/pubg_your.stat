import { FireStore } from '@/apis/firebase';
import { doc, getDoc, setDoc, DocumentData } from 'firebase/firestore';
import { ITeamMessage, ITeamInfo } from '@/interfaces';

export class TeamRoomAPI {
  private db = FireStore;
  private collection: string = 'teams';
  private teamInfo: ITeamInfo | undefined = undefined;

  //팀 정보 가져오기 - 팀 있으면 팀정보, 없으면 null
  getTeamInfo(uid: string): Promise<DocumentData | null> {
    return new Promise(async (resolve, reject) => {
      const docRef = doc(this.db, this.collection, uid);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.teamInfo = docSnap.data() as ITeamInfo;
          resolve(docSnap);
        } else {
          resolve(null);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  //팀 입장 자리 있는지 체크
  checkMembers(uid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const team = await this.getTeamInfo(uid);
        if (team) {
          const data = team.data() as ITeamInfo;
          if (data.maxCount! > data.members!.length) {
            resolve(true);
          } else {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  //팀 참여
  joinTeam(uid: string) {}

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
