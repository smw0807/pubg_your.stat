import { defineStore } from 'pinia';
import { TeamRoomAPI, UsersAPI, PlayerStatsAPI } from '@/apis';
import {
  ITeamMessage,
  ITeamInfo,
  IUserPlatformNickNames,
  IPlayerStats,
  RankModeType,
  ISearchForm,
  ModeType,
} from '@/types';
import { nowDateFormat, dateFormat, parseRankStat } from '@/utils';
import { useUserStore } from '@/store';
import { IPlayerStatsV2 } from '@/types/firebase/PlayerStats';

const JOIN_FAIL_MSG = '팀 참가에 실패하였습니다.';
const NOT_EXISTS_TEAM_MSG = '팀이 존재하지 않습니다.';
const MAXIMUM_MEMBERS_MSG = '팀 인원이 가득차 참여할 수 없습니다.';

const teamroomAPI = new TeamRoomAPI();
const usersAPI = new UsersAPI();
const statAPI = new PlayerStatsAPI();
export const useTeamRoomStore = defineStore({
  id: 'teamRoom',
  state: () => ({
    //팀 입장 시간 (이 시간 이후의 대화내용 가져옴)
    joinTime: null as null | string,
    //팀 정보
    teamInfo: null as null | ITeamInfo,
    //접속중인 멤버(아이디 표시)
    members: [] as IUserPlatformNickNames[],
    //팀 채팅 메세지
    messages: [] as ITeamMessage[],
  }),
  getters: {
    getTeamInfo(): null | ITeamInfo {
      return this.teamInfo;
    },
    getMembers(): IUserPlatformNickNames[] {
      return this.members;
    },
    getMessages(): ITeamMessage[] {
      return this.messages;
    },
  },
  actions: {
    //팀 입장
    async joinTeam(userId: string, teamId: string): Promise<string | true> {
      try {
        //팀 정보 가져오기
        const team = (await teamroomAPI.getTeamInfo(teamId)) as ITeamInfo;
        //팀 정보 없을 시
        if (!team) {
          return NOT_EXISTS_TEAM_MSG;
        }
        //팀 입장 허용인원 꽉 찼을 시
        if (!teamroomAPI.checkMembers(team)) {
          return MAXIMUM_MEMBERS_MSG;
        }
        const join = await teamroomAPI.joinTeam(userId, teamId);
        //팀 참여 처리 실패 시
        if (!join) {
          return JOIN_FAIL_MSG;
        }
        //팀 정보 저장
        this.teamInfo = team;
        //팀 잠가 시간
        this.joinTime = nowDateFormat('YYYY-MM-DD HH:mm:ss');
        //입장 후 데이터 변화 감지 함수 실행
        teamroomAPI.startWatchTeamData(teamId);
        //팀 메세지 변화 감지 함수 실행
        teamroomAPI.startWatchTeamMessageData(teamId, this.joinTime);
        //랭크 팀일 경우 파이어베이스에 저장된 스탯 정보 시스템 메세지로 뿌리기(해당되는 모드 스탯으로.)
        if (this.teamInfo.isRank) {
          await this.sendUserStatInfo(this.teamInfo.mode);
        }
        return true;
      } catch (err) {
        throw err;
      }
    },
    //접속자 스탯 정보 시스템 메세지 보내기
    async sendUserStatInfo(mode: ModeType) {
      try {
        const userStore = useUserStore();
        const nicknames = userStore.getNickname;
        //PUBG API를 통해 갱신된 스탯정보가 있을 경우.
        if (nicknames && this.teamInfo) {
          //팀 플랫폼에 해당하는 닉네임
          const platformNickname = nicknames[`${this.teamInfo.platform}-nickname`];
          //닉네임 스탯 정보
          const stat = (await statAPI.getStats({
            nickname: platformNickname,
            platform: this.teamInfo.platform,
          })) as IPlayerStatsV2;

          //스탯 정보 있을 경우
          if (stat) {
            const mode = this.teamInfo.mode as RankModeType;
            const parseStat = mode === 'duo' ? JSON.parse(stat.duo) : JSON.parse(stat.squad);
            const roundsPlayed = parseStat?.roundsPlayed || 0;
            //파이어베이스에 데이터는 있는데 현재 시즌 데이터가 아니거나, 팀 모드에 해당되는 판수가 없을 경우
            if (roundsPlayed === 0) {
              await teamroomAPI.sendMessage({
                'team-uid': this.teamInfo.id,
                'sender-uid': '',
                message: `${platformNickname} 님은 현재 갱신된 스탯 정보가 없습니다.`,
                sender: 'system',
                type: 'system',
              });
            } else {
              let message = `${platformNickname} | `;
              message += `kad: ${parseStat.kda.toFixed(2)} | `;
              message += `평딜: ${Number((parseStat.damageDealt / roundsPlayed).toFixed(0))} | `;
              message += `판수: ${roundsPlayed} | `;
              message += `${dateFormat(stat['last-update-date'], 'YYYY-MM-DD')} 기준 `;
              await teamroomAPI.sendMessage({
                'team-uid': this.teamInfo.id,
                'sender-uid': '',
                message: message,
                sender: 'system',
                type: 'system',
              });
            }
          } else {
            //없을 경우
            await teamroomAPI.sendMessage({
              'team-uid': this.teamInfo.id,
              'sender-uid': '',
              message: `${platformNickname} 님은 현재 갱신된 스탯 정보가 없습니다.`,
              sender: 'system',
              type: 'system',
            });
          }
        }
      } catch (err) {
        console.error(err);
        throw '접속자 스탯 정보 가져오기 실패';
      }
    },
    //팀 접속자 정보 가져오기
    async getMembersData(members: string[]): Promise<void> {
      try {
        if (members && members.length > 0) {
          //users에서 팀 플랫폼에 해당되는 아이디 가져오기
          const userNicknames = await Promise.all(
            members.map(async v => await usersAPI.getPlatformNickname(v))
          );
          this.members = [...userNicknames] as IUserPlatformNickNames[];
        }
      } catch (err) {
        throw err;
      }
    },
    //팀원 스탯 정보 가져오기
    async getMemberStat(params: ISearchForm): Promise<IPlayerStatsV2 | null> {
      try {
        return (await statAPI.getStats(params)) as IPlayerStatsV2;
      } catch (err) {
        throw err;
      }
    },
    //팀 나가기
    async exitTeam(userId: string, teamId: string): Promise<void> {
      try {
        //팀 데이터 members에서 현재 사용자 아이디 제거
        const result = await teamroomAPI.exitTeam(userId, teamId);
        if (result) {
          //상태값들 초기화
          this.joinTime = null;
          this.teamInfo = null;
          this.members = [];
          this.messages = [];
        }
      } catch (err) {
        throw err;
      }
    },
    //메세지 보내기
    async sendMessage(params: ITeamMessage): Promise<void> {
      try {
        await teamroomAPI.sendMessage(params);
      } catch (err) {
        throw err;
      }
    },
  },
});
