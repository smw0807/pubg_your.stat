import { PubgAPI } from '.';
export class SearchAPI extends PubgAPI {
  public platform = '';
  public nickname = '';
  constructor(platform: string, nickname: string) {
    super();
    this.platform = platform;
    this.nickname = nickname;
  }
  //플레이어 아이디 가져오기
  get playerID() {
    return this.axios(
      `/${this.platform}/players?filter[playerNames]=${this.nickname}`
    );
  }
}
