import { defineStore } from 'pinia';
import { PlayersAPI, SeasonAPI, PlayerStatsAPI } from '@/apis';
import { player404, _429, errorCode } from '@/utils';
import type { ISearchForm, IPlayerSeason, IPlayerSeasonRank, ISeason } from '@/interfaces';

const firestore = new PlayerStatsAPI();
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
    lastUpdateDate: null,
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
    getStats(params: ISearchForm): Promise<number> {
      return new Promise(async (resolve, reject) => {
        let result: number = 0;
        try {
          const rs = await firestore.getStats(params);
          //저장소에 데이터가 있을 경우
          if (rs.data()) {
            this.rank = JSON.parse(rs.data().rank);
            this.normal = JSON.parse(rs.data().normal);
            this.lastUpdateDate = rs.data()['last-update-date'].toDate();
            result = 200;
          } else {
            //데이터가 없을 경우 pubg api에다 검색 요청 후 저장소에 저장
            await this.setSeason(params.platform);
            await this.searchPlayer(params);
          }
          resolve(result);
        } catch (err) {
          if (err === 404) player404();
          if (err === 429) _429();
          reject(err);
        }
      });
    },
    //데이터 리로드
    reloadStats(params: ISearchForm): Promise<void> {
      return new Promise(async (resolve, reject) => {
        try {
          await this.setSeason(params.platform);
          await this.searchPlayer(params);
          resolve();
        } catch (err) {
          if (err === 404) player404();
          if (err === 429) _429();
          reject(err);
        }
      });
    },
    //시즌 정보 세팅
    setSeason(param: string): Promise<number> {
      return new Promise(async (resolve, reject) => {
        try {
          const api = new SeasonAPI(param);
          const seasons = await api.getSeasons;

          this.nowSeasons = seasons.data.data;
          this.nowSeason = seasons.data.data.filter(v => v.attributes.isCurrentSeason)[0];
          resolve(200);
        } catch (err) {
          reject(errorCode(err));
        }
      });
    },
    //검색
    searchPlayer(params: ISearchForm): Promise<number> {
      return new Promise(async (resolve, reject) => {
        try {
          params.seasonID = this.nowSeason.id;
          const searchAPI = new PlayersAPI(params);
          const stat = await searchAPI.allStat;

          //파이어베이스에 검색한 스탯정보 저장
          await firestore.setStats(params, stat[0].data, stat[1].data);
          //파이어베이스에 저장된 데이터 가져오기
          const rs = await firestore.getStats(params);

          this.rank = JSON.parse(rs.data().rank);
          this.normal = JSON.parse(rs.data().normal);
          this.lastUpdateDate = rs.data()['last-update-date'].toDate();
          resolve(200);
        } catch (err) {
          reject(errorCode(err));
        }
      });
    },
  },
});
