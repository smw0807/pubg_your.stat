// 티어 정보 타입
export interface TierInfo {
  tier: string;
  subTier: string;
}

// 게임 모드별 통계 타입
export interface GameModeStats {
  currentRankPoint: number;
  bestRankPoint: number;
  currentTier: TierInfo;
  bestTier: TierInfo;
  roundsPlayed: number;
  avgRank: number;
  avgSurvivalTime: number;
  top10Ratio: number;
  winRatio: number;
  assists: number;
  wins: number;
  kda: number;
  kdr: number;
  kills: number;
  deaths: number;
  roundMostKills: number;
  longestKill: number;
  headshotKills: number;
  headshotKillRatio: number;
  damageDealt: number;
  dBNOs: number;
  reviveRatio: number;
  revives: number;
  heals: number;
  boosts: number;
  weaponsAcquired: number;
  teamKills: number;
  playTime: number;
  killStreak: number;
}

// 랭크 게임 모드 통계 타입
export interface RankedGameModeStats {
  All: GameModeStats;
  duo: GameModeStats;
  squad: GameModeStats;
  'squad-fpp': GameModeStats;
}

// 랭크 통계 속성 타입
export interface RankStatsAttributes {
  rankedGameModeStats: RankedGameModeStats;
}

// 관계 데이터 타입
export interface RelationshipData {
  type: string;
  id: string;
}

// 랭크 통계 관계 타입
export interface RankStatsRelationships {
  player: {
    data: RelationshipData;
  };
  season: {
    data: RelationshipData;
  };
}

// 랭크 통계 데이터 아이템 타입
export interface RankStatsDataItem {
  type: string;
  attributes: RankStatsAttributes;
  relationships: RankStatsRelationships;
}

// 링크 타입
export interface RankStatsLinks {
  self: string;
}

// 메타 타입
export interface RankStatsMeta {
  [key: string]: unknown;
}

// 메인 RankStats 인터페이스
export interface RankStats {
  data: RankStatsDataItem;
  links: RankStatsLinks;
  meta: RankStatsMeta;
}
