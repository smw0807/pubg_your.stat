import axios from 'axios';
import { SearchAPI } from './Search';
import Player from '../interfaces/Players';
/**
 * "https://api.pubg.com/shards/steam/players?filter[playerIds]=account.c0e530e9b7244b358def282782f893af&filter[playerNames]=WackyJacky101"
 * https://api.pubg.com/shards/kakao/players?filter[playerNames]=NoMic_Min
 * https://api.pubg.com/shards/steam/players/account.12ddde2e5fec4688ad5a3b10abfe8d59/seasons/division.bro.official.console-20/ranked
 *
 * https://api.pubg.com/shards/steam/players/account.a144e39e400d4be799f412e872b4c09f/seasons/lifetime
 *
 * 시즌 스탯이 생각보다 디테일한 정보가 안나오는데...?
 */
export class PlayersAPI extends SearchAPI implements Player {
  public platform = '';
  public nickname = '';

  constructor(platform: string, nickname: string) {
    super();
    this.platform = platform;
    this.nickname = nickname;
  }
  //플레이어 한명 조회
  async getPlayer() {
    try {
      const player = await this.getAPI(
        `/${this.platform}/players?filter[playerNames]=${this.nickname}`
      );
      // const seasons = await this.getSeasonIDs(this.platform);
      // console.log('seasons : ', seasons);
      // const seasonID = seasons.data.data[seasons.data.data.length - 1].id;
      // console.log('seasonID : ', seasonID);
      // const url = `/${this.platform}/players/${player.data.data[0].id}/seasons/${seasonID}/ranked`;
      // console.log(url);
      // const detail = await this.getAPI(url);
      // console.log('detail :', detail);

      const lifetime = await this.getAPI(
        //모슨 시즌 합친 게임모드별 스탯???
        `/${this.platform}/players/${player.data.data[0].id}/seasons/lifetime`
      );
      console.log('lifetime : ', lifetime);
      return player;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
  //플레이어 여러명 조회
  async getPlayers() {}
}
