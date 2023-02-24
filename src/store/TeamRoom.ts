import { defineStore } from 'pinia';
import { TeamRoomAPI, UsersAPI, PlayerStatsAPI } from '@/apis';
import { ITeamMessage, ITeamInfo } from '@/interfaces';
import { useUserStore } from '@/store';

const JOIN_FAIL_MSG = '팀 참가에 실패하였습니다.';
const NOT_EXISTS_TEAM_MSG = '팀이 존재하지 않습니다.';
const MAXIMUM_MEMBERS_MSG = '팀 인원이 가득차 참여할 수 없습니다.';

const teamroomAPI = new TeamRoomAPI();
const usersAPI = new UsersAPI();
const statAPI = new PlayerStatsAPI();
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
  getters: {
    getTeamInfo(): null | ITeamInfo {
      return this.teamInfo;
    },
  },
  actions: {
    //팀 입장
    async joinTeam(userId: string): Promise<string | true> {
      if (!this.teamId) {
        return NOT_EXISTS_TEAM_MSG;
      }
      try {
        //팀 정보 가져오기
        const team = await teamroomAPI.getTeamInfo(this.teamId);
        //팀 정보 없을 시
        if (!team) {
          return NOT_EXISTS_TEAM_MSG;
        }
        //팀 입장 허용인원 꽉 찼을 시
        if (!teamroomAPI.checkMembers(team.data())) {
          return MAXIMUM_MEMBERS_MSG;
        }
        const join = await teamroomAPI.joinTeam(userId, this.teamId);
        //팀 참여 처리 실패 시
        if (!join) {
          return JOIN_FAIL_MSG;
        }
        //팀 정보 저장
        this.teamInfo = team.data();
        //입장 후 데이터 변화 감지 함수 실행
        teamroomAPI.startWatchTeamData(this.teamId);
        return true;
      } catch (err) {
        console.error(err);
        return JOIN_FAIL_MSG;
      }
    },
    //팀 접속자 정보 가져오기
    async getMembers(members: string[]) {
      console.log(members);
      try {
        //1. users에서 팀 플랫폼에 해당되는 아이디 가져오기
        //2 랭크팀일 경우 player-stats에서 kad, avgDmg 가져오기
      } catch (err) {
        console.error(err);
      }
    },
    //팀 나가기
    async exitTeam(userId: string): Promise<void> {
      try {
        //팀 데이터 members에서 현재 사용자 아이디 제거
        const result = await teamroomAPI.exitTeam(userId, this.teamId!);
        if (result) {
          //상태값들 초기화
          this.teamId = null;
          this.joinTime = null;
          this.teamInfo = null;
        }
      } catch (err) {
        /**
         * todo
         * 나가지면  Cannot read properties of null (reading 'indexOf') 이런 에러뜸
         */
        console.error(err);
      }
    },
  },
});
