// import axios from '../plugins/axios';
import axios, { AxiosInstance, AxiosPromise } from 'axios';
const api = import.meta.env.VITE_PUBG_API_URL;

export class PubgAPI {
  private _axios: AxiosInstance;
  public _platform;
  public _nickname;
  constructor(platform: string, nickname: string) {
    this._platform = platform;
    this._nickname = nickname;
    this._axios = axios.create({
      baseURL: import.meta.env.VITE_PUBG_API_URL,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PUBG_API_KEY}`,
        Accept: 'application/vnd.api+json',
      },
    });
  }
  axios(url: string) {
    return this._axios.get(api + url);
  }
  //시즌 아이디들
  async getSeasonIDs() {
    try {
      const rs = await this.axios(`/${this._platform}/seasons`);
      return rs.data.data;
    } catch (err) {
      console.error(err);
      return new Error('시즌 정보 가져오기 실패');
    }
  }
  //현재 시즌 아이디
  async getNowSeasonID() {
    try {
      const rs = await this.axios(`/${this._platform}/seasons`);
      return rs.data.data[rs.data.data.length - 1].id;
    } catch (err) {
      console.error(err);
      return new Error('시즌 정보 가져오기 실패');
    }
  }
  //플레이어 아이디 가져오기
  async getPlayerID() {
    try {
      const rs = await this.axios(
        `/${this._platform}/players?filter[playerNames]=${this._nickname}`
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
