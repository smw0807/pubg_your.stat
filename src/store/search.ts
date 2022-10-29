import { defineStore } from 'pinia';
import { PlayersAPI, SeasonAPI } from '../apis';
import { ISearchForm } from '../interfaces';
import type { AxiosPromise } from 'axios';
import type { ISeasonList, ISeason } from '../interfaces';

export const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    test: 'hihihi',
    nowSeasons: [] as ISeason[], //시즌 정보들
    nowSeason: {} as ISeason,
    nowSeasonID: '' as string,
  }),
  getters: {
    getTest(state) {
      return state.test;
    },
    getNowSeason(state) {
      return state.nowSeason;
    },
  },
  actions: {
    async setNowSeason(param: string) {
      try {
        const api = new SeasonAPI(param);
        const seasons = await api.getSeasons;

        this.nowSeasons = seasons.data.data;
        this.nowSeason = seasons.data.data[seasons.data.data.length - 1];
        this.nowSeasonID = this.nowSeason.id;
      } catch (err) {
        console.error(err);
      }
    },
    async search(params: ISearchForm) {
      const searchAPI = new PlayersAPI(params.platform, params.nickname);
      const player = await searchAPI.getPlayer();
      console.log(player);
    },
  },
});
