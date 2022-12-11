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
  axios(url: string): AxiosPromise {
    return this._axios.get(api + url);
  }
}
