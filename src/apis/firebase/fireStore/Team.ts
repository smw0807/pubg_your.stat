//팀 안에서 사용할...
import { FireStore } from '@/apis/firebase';

export class TeamAPI {
  private db = FireStore;

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
