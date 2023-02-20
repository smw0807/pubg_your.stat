import { FireStore } from '@/apis/firebase';
import { ITeamMessage } from '@/interfaces';

export class TeamRoomAPI {
  private db = FireStore;
  private collection: string = 'teams';
  //방 아이디
  private uid: string;
  //방 접속 시간 (이 시간 이후의 대화 내용만 가져옴)
  private joinTime: string;
  constructor(uid: string, joinTime: string) {
    this.uid = uid;
    this.joinTime = joinTime;
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
