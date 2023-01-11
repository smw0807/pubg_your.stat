//팀 안에서 사용할...
import { FireStore } from '@/apis/firebase';
import { ITeamFilter, ITeamInfo } from '@/interfaces';

export class TeamAPI {
  private db = FireStore;
  private collection: string = 'teams';

  //팀 리스트 가져오기
  async teamList(params: ITeamFilter) {}

  //팀 만들기
  createTeam(params: ITeamInfo) {
    return new Promise(async (resolve, reject) => {
      try {
        // params.title
        // params.platform
        // params.isRank
        // params.mode
        // params.members = [] 고정
        // params.createdAt = new Date();
        // params.roomLeader = 로그인 유저 (값 뭘로 넣을지 고민하기)
        console.log(params);
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  }

  //팀 수정하기
  async updateTeam(parmas: ITeamInfo) {}

  //팀 삭제하기
  async deleteTeam(id: string) {}

  //팀원 리스트?
  async memberList() {}

  //메세지 내역 가져오기
  async getMessages() {}

  //메세지 전송
  async sendMessage() {}

  //팀원 정보 가져오기
  async getMemeberInfo() {}

  //팀원 내보내기
  async kickoutMember() {}
}
