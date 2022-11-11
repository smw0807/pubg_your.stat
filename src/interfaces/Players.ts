import { IAPIObject, ISimpleAPIObject } from './common';

export interface IPlayerAttributes {
  name: string;
  shardId: string;
  stats: null;
  createdAt: string;
  patchVersion: string;
  titleId: string;
  updatedAt: string;
}

export interface IPlayerRelationships {
  assets: {};
  matches: {
    data: ISimpleAPIObject[];
  };
}

export interface IPlayerObject
  extends IAPIObject<IPlayerAttributes, IPlayerRelationships> {
  links: {
    schema: string;
    self: string;
  };
}

interface ITier {
  tier: string; //티어 이름
  subTier: string; //티어 숫자
}

//랭크 스탯
export interface IGameRankStats {
  currentRankPoint: number;
  bestRankPoint: number;
  currentTier: ITier;
  bestTier: ITier;
  roundsPlayed: number;
  avgRank: number;
  top10Ratio: number;
  winRatio: number;
  assists: number;
  wins: number;
  kda: number;
  kills: number;
  deaths: number;
  damageDealt: number; //총 딜량
  dBNOs: number; //총 기절 수
}

// 일반 스탯
export interface IGameStats {
  assists: number;
  boosts: number;
  dBNOs: number;
  dailyKills: number;
  damageDealt: number;
  days: number;
  dailyWins: number;
  headshotKills: number;
  heals: number;
  kills: number;
  longestKill: number;
  longestTimeSurvived: number;
  losses: number;
  maxKillStreaks: number;
  mostSurvivalTime: number;
  revives: number;
  rideDistance: number;
  roadKills: number;
  roundMostKills: number;
  roundsPlayed: number;
  suicides: number;
  swimDistance: number;
  teamKills: number;
  timeSurvived: number;
  top10s: number;
  vehicleDestroys: number;
  walkDistance: number;
  weaponsAcquired: number;
  weeklyKills: number;
  weeklyWins: number;
  wins: number;
}

export interface IPlayerSeasonRank {
  data: {
    type: 'rankedplayerstats';
    attributes: {
      rankedGameModeStats: {
        solo: IGameRankStats;
        squad: IGameRankStats;
      };
    };
    relationships: {
      player: {
        data: {
          type: 'player';
          id: string;
        };
      };
      season: {
        data: {
          type: 'season';
          id: string;
        };
      };
    };
  };
}

export interface IPlayerSeason {
  data: {
    type: 'playerSeason';
    attributes: {
      gameModeStats: {
        duo: IGameStats;
        'duo-fpp': IGameStats;
        solo: IGameStats;
        'solo-fpp': IGameStats;
        squad: IGameStats;
        'squad-fpp': IGameStats;
      };
    };
    relationships: {
      // these are Match IDs
      matchesDuo: {
        data: { type: 'match'; id: string }[];
      };
      matchesDuoFPP: {
        data: { type: 'match'; id: string }[];
      };
      matchesSolo: {
        data: { type: 'match'; id: string }[];
      };
      matchesSoloFPP: {
        data: { type: 'match'; id: string }[];
      };
      matchesSquad: {
        data: { type: 'match'; id: string }[];
      };
      matchesSquadFPP: {
        data: { type: 'match'; id: string }[];
      };
      player: {
        data: {
          type: 'player';
          id: string;
        };
      };
      season: {
        data: {
          type: 'season';
          id: string;
        };
      };
    };
  };
  links: {
    self: string;
  };
  meta: {};
}

/**
 * Player objects contain aggregated lifetime information about each player.
 */
export interface IPlayer {
  data: IPlayerObject;
  links: {
    self: string;
  };
  meta: {};
}

/**
 * Player objects contain aggregated lifetime information about each player.
 */
export interface IPlayerList {
  data: IPlayerObject[];
  links: {
    self: string;
  };
  meta: {};
}
