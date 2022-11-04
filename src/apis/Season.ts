import { PubgAPI } from '.';
import { AxiosPromise } from 'axios';
import { ISeasonList } from '../interfaces';

export class SeasonAPI extends PubgAPI {
  public _platform;
  constructor(platform: string) {
    super();
    this._platform = platform;
  }
  //시즌 아이디들
  get getSeasons(): AxiosPromise<ISeasonList> {
    return this.axios(`/${this._platform}/seasons`);
  }
}
