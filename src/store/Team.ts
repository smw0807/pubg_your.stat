/**
 * 팀 구하기 관련 저장소
 * - 팀 리스트
 * - 팀 만들기
 */

import { defineStore } from 'pinia';
import { TeamAPI } from '@/apis';
import { ITeamForm, ITeamFilter } from '@/types';
import type { DocumentData } from 'firebase/firestore';

const teamApi = new TeamAPI();

export const useTeamStore = defineStore({
  id: 'team',
  state: () => ({
    list: [] as DocumentData,
    // 페이지 이동해도 설정된 값 유지하기 위해 스토어 사용 ======= S
    kakaoFilter: {
      isRank: null,
      mode: 'all',
      orderBy: 'desc',
      platform: 'kakao',
    } as ITeamFilter,
    steamFilter: {
      isRank: null,
      mode: 'all',
      orderBy: 'desc',
      platform: 'steam',
    } as ITeamFilter,
    // 페이지 이동해도 설정된 값 유지하기 위해 스토어 사용 ======= E
  }),
  getters: {
    getList(): DocumentData {
      return this.list;
    },
  },
  actions: {
    // 팀 리스트 불러오기
    async teamList(params: ITeamFilter): Promise<void> {
      try {
        const result = await teamApi.teamList(params);
        this.list = result || [];
      } catch (err) {
        throw err;
      }
    },
    // 팀 생성하기
    async createTeam(params: ITeamForm): Promise<string | null> {
      let result = null;
      try {
        result = await teamApi.createTeam(params);
      } catch (err) {
        throw err;
      }
      return result;
    },
  },
});
