interface mode {
  All: number;
  solo: number;
  'solo-fpp': number;
  squad: number;
  'squad-fpp': number;
}

/**
 * normal : PUBG API에서 검색된 플레이어 일반 스탯정보 스트링으로 변환해서 담음
 * rank : PUBG API에서 검색된 플레이어 랭크 스탯정보 스트링으로 변환해서 담음
 * kda : 랭크만 모드별로 kda 정보 담음
 * avgDmg : 랭크만 모드별로 평균딜량 정보 담음
 * last-update-date : PUBG API로 스탯정보 받은 날짜
 * platform : 플랫폼
 */
export interface IPlayerStats {
  normal: string;
  rank: string;
  kda: mode;
  avgDmg: mode;
  'last-update-date': string;
  platform: string;
}
