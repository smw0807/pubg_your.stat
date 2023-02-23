import { FireStore } from '@/apis/firebase';
import { doc, getDoc, setDoc, DocumentData, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { ITeamMessage, ITeamInfo } from '@/interfaces';
import { useTeamRoomStore } from '@/store';

export class TeamRoomAPI {
  private db = FireStore;
  private collection: string = 'teams';
  private unsubscribe: null | Unsubscribe = null;

  //팀 정보 가져오기 - 팀 있으면 팀정보, 없으면 null
  async getTeamInfo(teamId: string): Promise<DocumentData | null> {
    const docRef = doc(this.db, this.collection, teamId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }

  //팀 입장 자리 있는지 체크
  checkMembers(team: ITeamInfo): boolean {
    //팀 최대 허용인원 수와 현재 참여자 수 비교
    if (team.maxCount! > team.members!.length) {
      return true;
    } else {
      return false;
    }
  }

  //팀 참여
  async joinTeam(userId: string, teamId: string): Promise<null | true> {
    try {
      //최신의 팀정보 가져오기
      const team = (await this.getTeamInfo(teamId)) as DocumentData;
      const data = team!.data() as ITeamInfo;
      //혹시 몰라서 인원수 한 번 더 체크
      if (this.checkMembers(data)) {
        const members = new Set(data.members);
        //member 필드에 참여자 아이디 추가
        members.add(userId);
        data.members = [...members];
        //데이터 업데이트
        await setDoc(doc(this.db, this.collection, team.id), data);
        return true;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }

  //팀 데이터 변화 감지
  startWatchTeamData(teamId: string): void {
    //데이터 변경마다 실행은 되지만 그 결과값을 store로 전달 방법을 모르겠어서 여기서 직접 데이터 조작하게함...
    const store = useTeamRoomStore();
    try {
      this.unsubscribe = onSnapshot(doc(this.db, this.collection, teamId), doc => {
        store.teamInfo = doc.data() as ITeamInfo;
      });
    } catch (err) {
      console.error(err);
    }
  }

  //팀 나가기
  async exitTeam(userId: string, teamId: string): Promise<null | true> {
    try {
      const team = await this.getTeamInfo(teamId);
      if (team) {
        const data = team.data() as ITeamInfo;
        const members = new Set(data.members);
        members.delete(userId);
        data.members = [...members];
        await setDoc(doc(this.db, this.collection, team.id), data);
        return true;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }

  //데이터 감지 중단
  unsubscribeData(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }
}
