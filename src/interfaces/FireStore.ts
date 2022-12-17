interface mode {
  solo: number;
  'solo-fpp': number;
  squad: number;
  'squad-fpp': number;
}

export interface IPlayerStats {
  normal: string;
  rank: string;
  kda: mode;
  avgDmg: mode;
  'last-update-date': Date;
  platform: string;
}
