import { defineStore } from 'pinia';
import { PlayersAPI, SeasonAPI } from '../apis';
import { ISearchForm } from '../interfaces';
import type { AxiosPromise } from 'axios';
import type { ISeasonList, ISeason } from '../interfaces';

export const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    nowSeasons: [] as ISeason[], //모든 시즌 정보들
    nowSeason: {} as ISeason, //현재 시즌
    nowSeasonID: '' as string, //현재 시즌 아이디
  }),
  getters: {
    getAllSeason(): ISeason[] {
      return this.nowSeasons;
    },
    getNowSeason(): ISeason {
      return this.nowSeason;
    },
    getNowSeasonID(): string {
      return this.nowSeasonID;
    },
  },
  actions: {
    //시즌 정보 세팅
    async setSeason(param: string): Promise<void> {
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
    //검색
    async searchPlayer(params: ISearchForm): Promise<void> {
      const searchAPI = new PlayersAPI(params);
      const rs = await searchAPI.getPlayer();
      console.log(rs);
    },
  },
});
