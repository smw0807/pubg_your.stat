import { defineStore } from 'pinia';
import { PlayersAPI, SeasonAPI } from '../apis';
import { ISearchForm } from '../interfaces';
import type { AxiosPromise } from 'axios';
import type { IPlayerSeason, IPlayerSeasonRank, ISeason } from '../interfaces';
/**
 * 검색 관련 스토어
 * nowSeasons : 모든 시즌 정보들
 * nowSeason : 현재 시즌 정보
 */
export const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    nowSeasons: [] as ISeason[],
    nowSeason: {} as ISeason,
    rankStat: {} as IPlayerSeasonRank,
    stat: {} as IPlayerSeason,
  }),
  getters: {
    getAllSeason(): ISeason[] {
      return this.nowSeasons;
    },
    getNowSeason(): ISeason {
      return this.nowSeason;
    },
  },
  actions: {
    //시즌 정보 세팅
    async setSeason(param: string): Promise<void> {
      try {
        const api = new SeasonAPI(param);
        const seasons = await api.getSeasons;

        this.nowSeasons = seasons.data.data;
        this.nowSeason = seasons.data.data.filter(
          v => v.attributes.isCurrentSeason
        )[0];
      } catch (err) {
        console.error(err);
      }
    },
    //검색
    async searchPlayer(params: ISearchForm): Promise<void> {
      try {
        params.seasonID = this.nowSeason.id;
        const searchAPI = new PlayersAPI(params);
        const stat = await searchAPI.allStat;
        this.rankStat = stat[0]?.data;
        this.stat = stat[1]?.data;
      } catch (err) {
        console.error(err);
      }
    },
  },
});
