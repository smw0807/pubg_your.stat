import { defineStore } from 'pinia';
import { PlayersAPI, SeasonAPI } from '@/apis';
import type {
  ISearchForm,
  IPlayerSeason,
  IPlayerSeasonRank,
  ISeason,
} from '@/interfaces';
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
    rank: {} as IPlayerSeasonRank,
    normal: {} as IPlayerSeason,
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
    setSeason(param: string): Promise<void> {
      return new Promise(async (resolve, reject) => {
        try {
          const api = new SeasonAPI(param);
          const seasons = await api.getSeasons;

          this.nowSeasons = seasons.data.data;
          this.nowSeason = seasons.data.data.filter(
            v => v.attributes.isCurrentSeason
          )[0];
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },
    //검색
    searchPlayer(params: ISearchForm): Promise<void> {
      return new Promise(async (resolve, reject) => {
        try {
          params.seasonID = this.nowSeason.id;
          const searchAPI = new PlayersAPI(params);
          const stat = await searchAPI.allStat;
          this.rank = stat[0]?.data;
          this.normal = stat[1]?.data;
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },
  },
});
