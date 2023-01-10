export type { IAPIObject, ISimpleAPIObject } from './Common';
export type { ISeason, ISeasonList } from './Season';
export type {
  IPlayer,
  IPlayerList,
  IPlayerSeason,
  IPlayerSeasonRank,
  IGameStats,
  IGameRankStats,
} from './Players';

export type { IFindTeam } from './FindTeam';
export type { IPlayerStats } from './FireStore';
export type { IUsers } from './Users';

export type ModeType = 'solo' | 'solo-fpp' | 'duo' | 'duo-fpp' | 'squad' | 'squad-fpp';

export type PlatformType = 'kakao' | 'steam';
export interface ISearchForm {
  platform: string;
  nickname: string;
  seasonID?: string;
}
