import { SearchAPI } from './Search';
import Player from '../interfaces/Players';
/**
 * 플레이어 관련 API
 * https://api.pubg.com/shards/$platform/seasons/$seasonId/gameMode/$gameMode/players?filter[playerIds]=$playerId-1,$playerId-2
 */
export class PlayersAPI extends SearchAPI implements Player {
  constructor(platform: string, nickname: string) {
    super(platform, nickname);
  }
  //플레이어 한명 조회
  async getPlayer() {
    try {
      //todo 이렇게 순차적으로 처리하게 할 필요가 있을지 고민해보자.
      const sId = await this.getNowSeasonID();
      const id = await this.getPlayerID();
      const rs = await this.getAPI(
        `/${this.platform}/seasons/${sId}/gameMode/squad/players?filter[playerIds]=${id}`
        // `/${this.platform}/players/${id}/seasons/${sId}`
        // `/${this.platform}/players/${id}/seasons/${sId}/ranked`
      );
      //왜 시즌 랭크 스탯 안들어있는지 모르겠음
      return rs;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
  //플레이어 여러명 조회
  async getPlayers() {}
}
