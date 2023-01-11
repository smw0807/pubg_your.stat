//팀 안에서 사용할...
import { FireStore } from '@/apis/firebase';
import { ITeamFilter, ITeamInfo } from '@/interfaces';

export class TeamAPI {
  private db = FireStore;

  //팀 리스트 가져오기
  async teamList(params: ITeamFilter) {}

  //팀 만들기
  async createTeam(params: ITeamInfo) {}

  //팀 수정하기
  async updateTeam(parmas: ITeamInfo) {}

  //팀 삭제하기
  async deleteTeam(id: string) {}

  //팀원 리스트?
  async memberList() {}

  //팀 만들기
  async createdTeam() {}

  //메세지 내역 가져오기
  async getMessages() {}

  //메세지 전송
  async sendMessage() {}

  //팀원 정보 가져오기
  async getMemeberInfo() {}

  //팀원 내보내기
  async kickoutMember() {}
}
