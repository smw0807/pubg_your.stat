import { defineStore } from 'pinia';
import { PlayersAPI, SeasonAPI, PlayerStatsAPI } from '@/apis';
import { player404, _429, errorCode } from '@/utils';
import type { ISearchForm, IPlayerSeason, IPlayerSeasonRank, ISeason } from '@/interfaces';

const statAPI = new PlayerStatsAPI();
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
    lastUpdateDate: '',
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
    //파이어베이스 저장소에 저장된 데이터 가져오기
    async getStats(params: ISearchForm): Promise<number> {
      try {
        const statData = await statAPI.getStats(params);
        //저장소에 데이터가 있을 경우
        if (statData) {
          this.rank = JSON.parse(statData.rank);
          this.normal = JSON.parse(statData.normal);
          this.lastUpdateDate = statData['last-update-date'];
        } else {
          //데이터가 없을 경우 pubg api에다 검색 요청 후 저장소에 저장
          await this.setSeason(params.platform);
          await this.searchPlayer(params);
        }
        return 200;
      } catch (err) {
        if (err === 404) player404();
        if (err === 429) _429();
        throw err;
      }
    },
    //데이터 리로드
    async reloadStats(params: ISearchForm): Promise<void> {
      try {
        await this.setSeason(params.platform);
        await this.searchPlayer(params);
      } catch (err) {
        if (err === 404) player404();
        if (err === 429) _429();
        throw err;
      }
    },
    //시즌 정보 세팅
    async setSeason(param: string): Promise<number> {
      try {
        const api = new SeasonAPI(param);
        const seasons = await api.getSeasons;
        this.nowSeasons = seasons.data.data;
        this.nowSeason = seasons.data.data.filter(v => v.attributes.isCurrentSeason)[0];
        return 200;
      } catch (err) {
        throw errorCode(err);
      }
    },
    //검색
    async searchPlayer(params: ISearchForm): Promise<number> {
      try {
        params.seasonID = this.nowSeason.id;
        const searchAPI = new PlayersAPI(params);
        const stat = await searchAPI.allStat;

        //파이어베이스에 검색한 스탯정보 저장
        await statAPI.setStats(params, stat[0].data, stat[1].data);

        //파이어베이스에 저장된 데이터 가져오기
        const statData = await statAPI.getStats(params);
        if (statData) {
          this.rank = JSON.parse(statData.rank);
          this.normal = JSON.parse(statData.normal);
          this.lastUpdateDate = statData['last-update-date'];
          return 200;
        } else {
          throw new Error('404');
        }
      } catch (err) {
        throw errorCode(err);
      }
    },
  },
});
