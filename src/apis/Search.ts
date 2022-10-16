import axios from '../plugins/axios';
const api = import.meta.env.VITE_PUBG_API_URL;

export class SearchAPI {
  public platform = '';
  public nickname = '';
  constructor(platform: string, nickname: string) {
    this.platform = platform;
    this.nickname = nickname;
  }
  getAPI(url: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const rs = await axios.get(api + url);
        resolve(rs);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }
  //시즌 아이디들
  async getSeasonIDs() {
    try {
      const rs = await this.getAPI(`/${this.platform}/seasons`);
      return rs.data.data;
    } catch (err) {
      console.error(err);
      return new Error('시즌 정보 가져오기 실패');
    }
  }
  //현재 시즌 아이디
  async getNowSeasonID() {
    try {
      const rs = await this.getAPI(`/${this.platform}/seasons`);
      return rs.data.data[rs.data.data.length - 1].id;
    } catch (err) {
      console.error(err);
      return new Error('시즌 정보 가져오기 실패');
    }
  }
  //플레이어 아이디 가져오기
  async getPlayerID() {
    try {
      const rs = await this.getAPI(
        `/${this.platform}/players?filter[playerNames]=${this.nickname}`
      );
      if (rs.status === 200) {
        return rs.data.data[0].id;
      } else {
        return new Error('존재하지 않는 플레이어 이름입니다.');
      }
    } catch (err) {
      console.error(err);
      return new Error('플레이어 조회 실패');
    }
  }
}
