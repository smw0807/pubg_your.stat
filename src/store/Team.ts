/**
 * 팀 구하기 관련 저장소
 * - 팀 리스트
 * - 팀 만들기
 */

import { defineStore } from 'pinia';
import { TeamAPI } from '@/apis';
import { ITeamForm } from '@/interfaces';

const teamApi = new TeamAPI();

export const useTeamStore = defineStore({
  id: 'team',
  state: () => ({}),
  getters: {},
  actions: {
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
