// import axios from '../plugins/axios';
import axios, { AxiosInstance, AxiosPromise } from 'axios';
const api = import.meta.env.VITE_PUBG_API_URL;

export class PubgAPI {
  private _axios: AxiosInstance;
  constructor() {
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
  //플레이어 아이디 가져오기
  // async getPlayerID() {
  //   try {
  //     const rs = await this.axios(
  //       `/${this._platform}/players?filter[playerNames]=${this._nickname}`
  //     );
  //     if (rs.status === 200) {
  //       return rs.data.data[0].id;
  //     } else {
  //       return new Error('존재하지 않는 플레이어 이름입니다.');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     return new Error('플레이어 조회 실패');
  //   }
  // }
}
