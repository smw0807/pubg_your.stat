interface mode {
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
 * todo last-update-date에 Date 지워도되는지 확인 필요 vue-timeago3 떄문에 string 처리 했었음
 */
export interface IPlayerStats {
  normal: string;
  rank: string;
  kda: mode;
  avgDmg: mode;
  'last-update-date': Date | string;
  platform: string;
}
