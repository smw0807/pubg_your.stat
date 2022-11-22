import { PubgAPI } from '.';
import {
  ISearchForm,
  IPlayerList,
  IPlayerSeasonRank,
  IPlayerSeason,
} from '../interfaces';
import { AxiosPromise } from 'axios';

/**
 * 플레이어 관련 API
 * https://api.pubg.com/shards/$platform/seasons/$seasonId/gameMode/$gameMode/players?filter[playerIds]=$playerId-1,$playerId-2
 */
export class PlayersAPI extends PubgAPI {
  private _platform;
  private _nickname;
  private _seasonID;
  private _userInfo: IPlayerList | null;
  constructor(params: ISearchForm) {
    super();
    this._platform = params.platform;
    this._nickname = params.nickname;
    this._seasonID = params.seasonID;
    this._userInfo = null;
  }

  //시즌 랭크 스탯, 시즌 스탯 가져오기
  get allStat() {
    return Promise.all([this.getRankStat(), this.getStat()]);
  }

  //닉네임 검색
  get playerInfo(): AxiosPromise<IPlayerList> {
    return this.axios(
      `/${this._platform}/players?filter[playerNames]=${this._nickname}`
    );
  }

  //유저 정보 가져오기
  getUserInfo(): Promise<IPlayerList | null> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this._userInfo) {
          const player = await this.playerInfo;
          this._userInfo = player.data;
        }
        resolve(this._userInfo);
      } catch (err) {
        reject(err);
      }
    });
  }

  //랭크 스탯 가져오기
  getRankStat(): AxiosPromise<IPlayerSeasonRank> {
    return new Promise(async (resolve, reject) => {
      try {
        let result = null;
        const user = await this.getUserInfo();
        result = await this.axios(
          `/${this._platform}/players/${user?.data[0].id}/seasons/${this._seasonID}/ranked`
        );
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  //일반 스탯 가져오기
  getStat(): AxiosPromise<IPlayerSeason> {
    return new Promise(async (resolve, reject) => {
      try {
        let result = null;
        const user = await this.getUserInfo();
        result = await this.axios(
          `/${this._platform}/players/${user?.data[0].id}/seasons/${this._seasonID}`
        );
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }
}
