import { FireStore } from '@/apis/firebase';
import {
  doc,
  addDoc,
  getDoc,
  setDoc,
  DocumentData,
  onSnapshot,
  Unsubscribe,
  deleteDoc,
  collection,
  query,
  orderBy,
  where,
  DocumentReference,
  getDocs,
  writeBatch,
} from 'firebase/firestore';
import { ITeamMessage, ITeamInfo } from '@/interfaces';
import { useTeamRoomStore } from '@/store';
import { nowDateFormat } from '@/utils';

export class TeamRoomAPI {
  private db = FireStore;
  private collection: string = 'teams';
  private subCollection: string = 'messages';
  private unsubscribeForTeam: null | Unsubscribe = null;
  private unsubscribeForMsg: null | Unsubscribe = null;

  //팀 정보 가져오기 - 팀 있으면 팀정보, 없으면 null
  async getTeamInfo(teamId: string): Promise<DocumentData | null> {
    try {
      const docRef = doc(this.db, this.collection, teamId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap;
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
      throw '팀 정보 불러오기 실패';
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
      console.error(err);
      throw '팀 참가 실패';
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
        //남은 인원이 없을 경우 삭제
        if (members.size === 0) {
          await this.deleteTeam(teamId);
        } else {
          //데이터 감시 중단
          this.unsubscribeData();
        }
        return true;
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
      throw '팀 나가기 중 오류 발생';
    }
  }

  //팀 삭제
  private async deleteTeam(teamId: string): Promise<void> {
    try {
      const teamRef = doc(this.db, this.collection, teamId);
      //팀 메세지 삭제
      // await this.deleteMessages(teamRef);
      //팀 삭제
      await deleteDoc(teamRef);
    } catch (err) {
      console.error(err);
      throw '팀 삭제 실패';
    }
  }
  //팀 메시지 데이터 및 컬렉션 삭제
  private async deleteMessages(teamRef: DocumentReference) {
    try {
      const messagesCollection = collection(teamRef, this.subCollection);
      //meesages 컬렉션 안 데이터 모두 삭제
      const messagesQuerySnapshot = await getDocs(messagesCollection);
      messagesQuerySnapshot.forEach(async doc => {
        await deleteDoc(doc.ref);
      });
      //messages 컬렉션 삭제
      await this.deleteCollection(teamRef, this.subCollection);
    } catch (err) {
      console.error(err);
      throw '팀 메세지 삭제 실패';
    }
  }

  //컬렉션 삭제
  private async deleteCollection(docRef: DocumentReference<DocumentData>, collectionName: string) {
    try {
      const batch = writeBatch(this.db);

      const messagesCollection = collection(docRef, collectionName);
      const snapshot = await getDocs(messagesCollection);
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    } catch (err) {
      console.error(err);
      throw '컬렉션 삭제 실패';
    }
  }

  //메세지 전송
  async sendMessage(params: ITeamMessage): Promise<void> {
    try {
      const teamRef = doc(this.db, this.collection, params['team-uid']!);
      delete params['team-uid'];
      const data: ITeamMessage = {
        ...params,
        'send-time': nowDateFormat('YYYY-MM-DD HH:mm:ss'),
      };
      const messagesCollection = collection(teamRef, this.subCollection);
      await addDoc(messagesCollection, data);
    } catch (err) {
      console.error(err);
      throw '메세지 전송 실패';
    }
  }

  //팀 데이터 변화 감지
  startWatchTeamData(teamId: string): void {
    //데이터 변경마다 실행은 되지만 그 결과값을 store로 전달 방법을 모르겠어서 여기서 직접 데이터 조작하게함...
    const store = useTeamRoomStore();
    try {
      this.unsubscribeForTeam = onSnapshot(doc(this.db, this.collection, teamId), doc => {
        store.teamInfo = doc.data() as ITeamInfo;
      });
    } catch (err) {
      console.error(err);
    }
  }

  //팀 메세지 데이터 변화 감지
  startWatchTeamMessageData(teamId: string, joinTime: string): void {
    try {
      const store = useTeamRoomStore();

      const teamRef = doc(this.db, this.collection, teamId);
      const messageCollection = collection(teamRef, this.subCollection);
      let q = query(messageCollection, orderBy('send-time', 'asc'));
      q = query(q, where('send-time', '>=', joinTime));
      this.unsubscribeForMsg = onSnapshot(q, querySnapshot => {
        let message: ITeamMessage[] = [];
        querySnapshot.forEach(doc => {
          message.push(doc.data() as ITeamMessage);
        });
        store.messages = [...message];
      });
    } catch (err) {
      console.error(err);
    }
  }

  //데이터 감지 중단
  private unsubscribeData(): void {
    if (this.unsubscribeForTeam) {
      this.unsubscribeForTeam();
      this.unsubscribeForTeam = null;
    }
    if (this.unsubscribeForMsg) {
      this.unsubscribeForMsg();
      this.unsubscribeForMsg = null;
    }
  }
}
