import { FireStore } from '@/apis/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import type { ISearchForm, IPlayerSeason, IPlayerSeasonRank, IPlayerStats } from '@/interfaces';
import { nowDateFormat } from '@/utils';

/**
 * 플레이서 스탯 저장소 관련
 */
export class PlayerStatsAPI {
  private db = FireStore;
  private collection: string = 'player-stats';

  //저장소에 저장된 정보 가져오기
  async getStats(params: ISearchForm): Promise<DocumentData> {
    try {
      const docRef = doc(this.db, this.collection, `${params.platform}-${params.nickname}`);
      const docSnap = await getDoc(docRef);
      return docSnap;
    } catch (err) {
      throw err;
    }
  }

  //저장소에 스탯 및 기타 정보들 저장
  async setStats(
    params: ISearchForm,
    rank: IPlayerSeasonRank,
    normal: IPlayerSeason
  ): Promise<void> {
    try {
      const id = `${params.platform}-${params.nickname}`;
      const data: IPlayerStats = {
        normal: JSON.stringify(normal),
        rank: JSON.stringify(rank),
        kda: this.extractKDA(rank),
        avgDmg: this.extractAVG(rank),
        'last-update-date': nowDateFormat('YYYY-MM-DD HH:mm:ss'),
        platform: params.platform,
      };
      await setDoc(doc(this.db, this.collection, id), data);
    } catch (err) {
      throw err;
    }
  }

  //스탯에서 모드별 KDA
  extractKDA(rank: IPlayerSeasonRank) {
    const result = {
      solo: 0,
      'solo-fpp': 0,
      squad: 0,
      'squad-fpp': 0,
    };
    result.solo = rank.data.attributes.rankedGameModeStats.solo?.kda || 0;
    result['solo-fpp'] = rank.data.attributes.rankedGameModeStats['solo-fpp']?.kda || 0;
    result.squad = rank.data.attributes.rankedGameModeStats?.squad?.kda || 0;
    result['squad-fpp'] = rank.data.attributes.rankedGameModeStats['squad-fpp']?.kda || 0;
    return result;
  }

  //스탯에서 모드별 평균딜량
  extractAVG(rank: IPlayerSeasonRank) {
    const result = {
      solo: 0,
      'solo-fpp': 0,
      squad: 0,
      'squad-fpp': 0,
    };
    //3인칭 솔로
    const solo = rank.data.attributes.rankedGameModeStats.solo?.damageDealt || 0;
    const soloPlays = rank.data.attributes.rankedGameModeStats.solo?.roundsPlayed || 0;
    if (solo === 0) result.solo = solo;
    else result.solo = Number((solo / soloPlays).toFixed(0));

    //1인칭 솔로
    const soloFpp = rank.data.attributes.rankedGameModeStats['solo-fpp']?.damageDealt || 0;
    const soloFppPlays = rank.data.attributes.rankedGameModeStats['solo-fpp']?.roundsPlayed || 0;
    if (soloFpp === 0) result['solo-fpp'] = soloFpp;
    else result['solo-fpp'] = Number((soloFpp / soloFppPlays).toFixed(0));

    //3인칭 스쿼드
    const squad = rank.data.attributes.rankedGameModeStats.squad?.damageDealt || 0;
    const squadPlays = rank.data.attributes.rankedGameModeStats.squad?.roundsPlayed || 0;
    if (squad === 0) result.squad = squad;
    else result.squad = Number((squad / squadPlays).toFixed(0));

    //1인칭 스쿼드
    const squadFpp = rank.data.attributes.rankedGameModeStats['squad-fpp']?.damageDealt || 0;
    const squadFppPlays = rank.data.attributes.rankedGameModeStats['squad-fpp']?.roundsPlayed || 0;
    if (squadFpp === 0) result['squad-fpp'] = squadFpp;
    else result['squad-fpp'] = Number((squadFpp / squadFppPlays).toFixed(0));

    return result;
  }
}
