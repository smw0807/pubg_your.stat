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
  }),
  getters: {
    getList(): DocumentData {
      return this.list;
    },
  },
  actions: {
    async teamList(params: ITeamFilter): Promise<void> {
      try {
        this.list = await teamApi.teamList(params);
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
