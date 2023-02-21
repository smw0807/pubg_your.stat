import { defineStore } from 'pinia';
import { TeamRoomAPI } from '@/apis';
import { DocumentData } from 'firebase/firestore';
import { ITeamMessage, ITeamInfo } from '@/interfaces';

const JOIN_FAIL_MSG = '팀 참가에 실패하였습니다.';

const teamroomAPI = new TeamRoomAPI();
export const useTeamRoomStore = defineStore({
  id: 'teamRoom',
  state: () => ({
    //팀 아이디
    teamId: null as null | string,
    //팀 입장 시간 (이 시간 이후의 대화내용 가져옴)
    joinTime: null as null | string,
    //팀 정보
    teamInfo: null as null | ITeamInfo,
  }),
  getters: {},
  actions: {
    //팀 존재 여무 및 입장 가능한지 확인
    async checkTeam(): Promise<string | boolean> {
      let result: string | boolean = false;
      try {
        //팀 정보 가져오기
        const team = await teamroomAPI.getTeamInfo(this.teamId!);
        //방 존재 여무 확인
        if (team) {
          //방 최대 인원과 현재 접속중인 인원 확인해서 입장 가능여부 확인
          if (await teamroomAPI.checkMembers(this.teamId!)) {
            result = true;
            this.teamInfo = team.data();
          } else {
            result = '팀 인원이 가득차 참여할 수 없습니다.';
          }
        } else {
          result = '팀이 존재하지 않습니다.';
        }
      } catch (err) {
        console.error(err);
        result = JOIN_FAIL_MSG;
      }
      return result;
    },
    //팀 입장
    async joinTeam(userId: string) {
      let result: string | boolean = false;
      try {
        result = await teamroomAPI.joinTeam(userId, this.teamId!);
      } catch (err) {
        result = JOIN_FAIL_MSG;
      }
      return result;
    },
  },
});
