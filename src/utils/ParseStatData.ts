import {
  IPlayerSeason,
  IPlayerSeasonRank,
  IGameStats,
  IGameRankStats,
  ModeType,
  RankModeType,
} from '@/types';

export const parseNormalStat = (mode: ModeType, stat: IPlayerSeason): IGameStats => {
  return stat.data.attributes.gameModeStats[mode];
};

export const parseRankStat = (mode: RankModeType, stat: IPlayerSeasonRank): IGameRankStats => {
  return stat.data.attributes.rankedGameModeStats[mode];
};
