/**
 * 팀 구하기 관련 저장소
 * - 팀 리스트
 * - 팀 만들기
 */

import { defineStore } from 'pinia';
import { TeamAPI } from '@/apis';
import { ITeamForm, ITeamFilter } from '@/interfaces';
import type { DocumentData } from 'firebase/firestore';

const teamApi = new TeamAPI();

export const useTeamStore = defineStore({
  id: 'team',
  state: () => ({
    list: [] as DocumentData,
    kakaoFilter: {
      createdAt: 'desc',
      gameMode: '',
      gameType: '',
      platform: 'kakao',
    },
    steamFilter: {
      createdAt: 'desc',
      gameMode: '',
      gameType: '',
      platform: 'kakao',
    },
  }),
  getters: {
    getList(): DocumentData {
      return this.list;
    },
    //   getKakaoFilter(): ITeamFilter {
    //     return this.kakaoFilter;
    //   },
    //   getSteamFilter(): ITeamFilter {
    //     return this.steamFilter;
    //   },
  },
  actions: {
    async teamList(params: ITeamFilter): Promise<void> {
      try {
        this.list = await teamApi.teamList(params);
        console.log(this.list);
      } catch (err) {
        console.error(err);
      }
    },
    async createTeam(params: ITeamForm): Promise<string> {
      let result = '';
      try {
        result = await teamApi.createTeam(params);
      } catch (err) {
        console.error(err);
      }
      return result;
    },
  },
});
