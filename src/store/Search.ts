import { defineStore } from 'pinia';
import { PlayersAPI, SeasonAPI, PlayerStatsAPI } from '@/apis';
import { _429, errorCode } from '@/utils';
import type { ISearchForm, IPlayerSeason, IPlayerSeasonRank, ISeason } from '@/types';

const statAPI = new PlayerStatsAPI();
/**
 * 검색 관련 스토어
 * allSeasons : 모든 시즌 정보들 (지금은 현재 시즌의 데이터만 제공해서 안씀)
 * nowSeason : 현재 시즌 정보
 */
export const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    allSeasons: [] as ISeason[],
    nowSeason: {} as ISeason,
    rank: {} as IPlayerSeasonRank,
    normal: {} as IPlayerSeason,
    lastUpdateDate: '',
  }),
  getters: {
    getLastUpdateDate(): string {
      return this.lastUpdateDate;
    },
  },
  actions: {
    //파이어베이스 저장소에 저장된 데이터 가져오기
    async getStats(params: ISearchForm): Promise<true> {
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
        return true;
      } catch (err) {
        throw err;
      }
    },
    //데이터 리로드
    async reloadStats(params: ISearchForm): Promise<void> {
      try {
        await this.setSeason(params.platform);
        await this.searchPlayer(params);
      } catch (err) {
        throw err;
      }
    },
    //시즌 정보 세팅
    async setSeason(param: string): Promise<void> {
      try {
        const api = new SeasonAPI(param);
        const seasons = await api.getSeasons;
        //PC버전의 시즌 정보만 담음
        this.allSeasons = seasons.data.data.filter(v => v.id.match(/pc-.*/gi));
        //현재 시즌 정보
        this.nowSeason = seasons.data.data.filter(v => v.attributes.isCurrentSeason)[0];
      } catch (err) {
        throw errorCode(err);
      }
    },
    //검색
    async searchPlayer(params: ISearchForm): Promise<void> {
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
        } else {
          throw new Error('404');
        }
      } catch (err) {
        throw errorCode(err);
      }
    },
  },
});
