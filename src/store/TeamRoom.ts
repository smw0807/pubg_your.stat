import { defineStore } from 'pinia';
import { TeamRoomAPI } from '@/apis';

const teamroomAPI = new TeamRoomAPI();
export const useTeamRoomStore = defineStore({
  id: 'teamRoom',
  state: () => ({
    //팀 아이디
    teamId: '',
    //팀 입장 시간 (이 시간 이후의 대화내용 가져옴)
    joinTime: '',
    //팀 정보
    teamInfo: null,
    // team
    // teamroomAPI: new TeamRoomAPI()
  }),
  getters: {},
  actions: {
    //방 존재 여무 및 입장 가능한지 확인
    async checkRoom() {
      try {
        const team = await teamroomAPI.getTeamInfo(this.teamId);
        console.log(team);
      } catch (err) {
        console.error(err);
      }
    },
  },
});
