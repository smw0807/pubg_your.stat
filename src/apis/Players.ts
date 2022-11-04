import { PubgAPI } from '.';
import { ISearchForm, IPlayerList, IPlayer } from '../interfaces';
import { AxiosPromise } from 'axios';

/**
 * 플레이어 관련 API
 * https://api.pubg.com/shards/$platform/seasons/$seasonId/gameMode/$gameMode/players?filter[playerIds]=$playerId-1,$playerId-2
 */
export class PlayersAPI extends PubgAPI {
  private _platform;
  private _nickname;
  private _seasonID;
  constructor(params: ISearchForm) {
    super();
    this._platform = params.platform;
    this._nickname = params.nickname;
    this._seasonID = params.seasonID;
  }

  //닉네임에서 플레이어 아이디 가져오기
  get getPlayerID(): AxiosPromise<IPlayerList> {
    return this.axios(
      `/${this._platform}/players?filter[playerNames]=${this._nickname}`
    );
  }

  //플레이어 한명 조회
  async getPlayer() {
    try {
      const player = await this.getPlayerID;
      console.log(player);
      console.log(player.data.data[0].id);
      //! 왜 스탯이 다 0으로 나올까??
      return await this.axios(
        // `/${this._platform}/players/${player.data.data[0].id}/seasons/${this._seasonID}/ranked`
        `/${this._platform}/players/${player.data.data[0].id}/seasons/${this._seasonID}`
      );
    } catch (err) {
      console.error(err);
      return err;
    }
  }
  //플레이어 여러명 조회
  async getPlayers() {}
}
