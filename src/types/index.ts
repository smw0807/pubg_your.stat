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
  GameModeStats,
  RankedGameModeStats,
} from './pubg';

export type {
  ITeamFilter,
  ITeamForm,
  ITeamInfo,
  ITeamMessage,
  IPlayerStats,
  IUserPlatformNickNames,
} from './firebase';

export type RankModeType = 'All' | 'solo' | 'duo' | 'squad';
export type ModeType = RankModeType;

export type PlatformType = 'kakao' | 'steam';
export interface ISearchForm {
  platform: string;
  nickname: string;
  seasonID?: string;
}
