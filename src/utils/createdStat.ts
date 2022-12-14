import { IGameStats, IGameRankStats, ModeType } from '@/interfaces';
import { normalStatData, rankStatData } from '.';
import { useSearchStore } from '@/store';

/**
 * store에 저장된 일반 스탯 리턴
 * @param mode 'solo' | 'solo-fpp' | 'duo' | 'duo-fpp' | 'squad' | 'squad-fpp'
 * @returns IGameStats | {}
 */
export const normalStat = (mode: ModeType): IGameStats => {
  const store = useSearchStore();
  let result: IGameStats = normalStatData;
  switch (mode) {
    case 'solo':
      result = store.normal.data?.attributes.gameModeStats.solo;
      break;
    case 'solo-fpp':
      result = store.normal.data?.attributes.gameModeStats['solo-fpp'];
      break;
    case 'duo':
      result = store.normal.data?.attributes.gameModeStats.duo;
      break;
    case 'duo-fpp':
      result = store.normal.data?.attributes.gameModeStats['duo-fpp'];
      break;
    case 'squad':
      result = store.normal.data?.attributes.gameModeStats.squad;
      break;
    case 'squad-fpp':
      result = store.normal.data?.attributes.gameModeStats['squad-fpp'];
      break;
    default:
      console.warn(`'solo' | 'solo-fpp' | 'duo' | 'duo-fpp' | 'squad' | 'squad-fpp' 중 하나 필요`);
      break;
  }
  return result;
};

/**
 * store에 저장된 랭크 스탯 리턴
 * @param mode 'solo' | 'solo-fpp' | 'squad' | 'squad-fpp'
 * @returns IGameRankStats | {}
 */
export const rankStat = (mode: ModeType): IGameRankStats => {
  const store = useSearchStore();
  let result: IGameRankStats = rankStatData;
  switch (mode) {
    case 'solo':
      result = store.rank.data?.attributes.rankedGameModeStats.solo;
      break;
    case 'solo-fpp':
      result = store.rank.data?.attributes.rankedGameModeStats['solo-fpp'];
      break;
    case 'squad':
      result = store.rank.data?.attributes.rankedGameModeStats.squad;
      break;
    case 'squad-fpp':
      result = store.rank.data?.attributes.rankedGameModeStats['squad-fpp'];
      break;
    default:
      console.warn(`'solo' | 'solo-fpp' | 'squad' | 'squad-fpp' 중 하나 필요`);
      break;
  }
  return result;
};
