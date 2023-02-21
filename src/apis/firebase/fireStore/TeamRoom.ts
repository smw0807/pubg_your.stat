import { FireStore } from '@/apis/firebase';
import { doc, getDoc, setDoc, DocumentData, onSnapshot } from 'firebase/firestore';
import { ITeamMessage, ITeamInfo } from '@/interfaces';
import { useTeamRoomStore } from '@/store';

export class TeamRoomAPI {
  private db = FireStore;
  private collection: string = 'teams';
  private teamInfo: ITeamInfo | undefined = undefined;

  //팀 정보 가져오기 - 팀 있으면 팀정보, 없으면 null
  getTeamInfo(teamId: string): Promise<DocumentData | null> {
    return new Promise(async (resolve, reject) => {
      const docRef = doc(this.db, this.collection, teamId);
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
  checkMembers(teamId: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        //최신의 팀정보 가져오기
        const team = await this.getTeamInfo(teamId);
        if (team) {
          const data = team.data() as ITeamInfo;
          //팀 최대 허용인원 수와 현재 참여자 수 비교
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
  joinTeam(userId: string, teamId: string): Promise<string | boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        //최신의 팀정보 가져오기
        const team = (await this.getTeamInfo(teamId)) as DocumentData;
        const data = team!.data() as ITeamInfo;
        //혹시 몰라서 인원수 한 번 더 체크
        if (data.maxCount! > data.members!.length) {
          const members = new Set(data.members);
          //member 필드에 참여자 아이디 추가
          members.add(userId);
          data.members = [...members];
          //데이터 업데이트
          await setDoc(doc(this.db, this.collection, team.id), data);
          resolve(true);
        } else {
          resolve('팀 인원이 가득차 참여할 수 없습니다.');
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  //팀 접속자 리스트 가져오기
  getTeamMembers() {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (err) {
        reject(err);
      }
    });
  }

  //팀 데이터 변화 감지
  startWatchTeamData(teamId: string): void {
    //데이터 변경마다 실행은 되지만 그 결과값을 store로 전달 방법을 모르겠어서 여기서 직접 데이터 조작하게함...
    const store = useTeamRoomStore();
    try {
      onSnapshot(doc(this.db, this.collection, teamId), doc => {
        store.teamInfo = doc.data() as ITeamInfo;
      });
    } catch (err) {
      console.error(err);
    }
  }
}
