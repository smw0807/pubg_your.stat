import { FireStore } from '@/apis/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ITeamMessage, ITeamInfo } from '@/interfaces';

export class TeamRoomAPI {
  private db = FireStore;
  private collection: string = 'teams';
  //방 아이디
  private uid: string | null = null;
  //방 접속 시간 (이 시간 이후의 대화 내용만 가져옴)
  private joinTime: string | null = null;

  public teamInfo: any = null;
  private nowMembers: [] = [];
  private teamMaxCount: number = 0;

  // //팀 정보 가져오기
  // async getTeamInfo() {
  //   let result = null;
  //   try {
  //     const docRef = doc(this.db, this.collection, this.uid);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       result = docSnap.data();
  //     }
  //   } catch (err) {
  //     console.error('팀 정보 가져오기 실패');
  //   }
  //   return result;
  // }

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
