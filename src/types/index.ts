export type {
  IAPIObject,
  ISimpleAPIObject,
  ISeason,
  ISeasonList,
  IPlayer,
  IPlayerList,
  IPlayerSeason,
  IPlayerSeasonRank,
  IGameStats,
  IGameRankStats,
} from './pubg';

export type {
  ITeamFilter,
  ITeamForm,
  ITeamInfo,
  ITeamMessage,
  IPlayerStats,
  IUserPlatformNickNames,
} from './firebase';

export type RankModeType = 'All' | 'solo' | 'solo-fpp' | 'squad' | 'squad-fpp';
export type ModeType = RankModeType | 'duo' | 'duo-fpp';

export type PlatformType = 'kakao' | 'steam';
export interface ISearchForm {
  platform: string;
  nickname: string;
  seasonID?: string;
}
