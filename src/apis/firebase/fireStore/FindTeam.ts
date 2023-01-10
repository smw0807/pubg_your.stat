//팀 구하기에서 사용할...
import { FireStore } from '@/apis/firebase';
import { ITeamInfo } from '@/interfaces';

const collection = 'teams';
interface ITeamFilter {
  createdAt: string;
  platform: string;
  gameMode: string;
  gameType: string;
}
export class FindTeamAPI {
  private db = FireStore;

  //팀 리스트 가져오기
  async teamList(params: ITeamFilter) {}

  //팀 만들기
  async createTeam(params: ITeamInfo) {}

  //팀 수정하기
  async updateTeam(parmas: ITeamInfo) {}

  //팀 삭제하기
  async deleteTeam(id: string) {}
}
