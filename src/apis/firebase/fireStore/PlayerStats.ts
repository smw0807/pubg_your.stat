import { FireStore } from '@/apis/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import type { ISearchForm, IPlayerSeason, IPlayerSeasonRank, IPlayerStats } from '@/types';
import { nowDateFormat, parseRankStat } from '@/utils';

/**
 * 플레이서 스탯 저장소 관련
 */
export class PlayerStatsAPI {
  private db = FireStore;
  private collection: string = 'player-stats';

  //저장소에 저장된 정보 가져오기
  async getStats(params: ISearchForm): Promise<DocumentData | null> {
    try {
      const docRef = doc(this.db, this.collection, `${params.platform}-${params.nickname}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null;
      }
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
      All: 0,
      solo: 0,
      'solo-fpp': 0,
      squad: 0,
      'squad-fpp': 0,
    };
    result.All = parseRankStat('All', rank)?.kda || 0;
    result.solo = parseRankStat('solo', rank)?.kda || 0;
    result['solo-fpp'] = parseRankStat('solo-fpp', rank)?.kda || 0;
    result.squad = parseRankStat('squad', rank)?.kda || 0;
    result['squad-fpp'] = parseRankStat('squad-fpp', rank)?.kda || 0;
    return result;
  }

  //스탯에서 모드별 평균딜량
  extractAVG(rank: IPlayerSeasonRank) {
    const result = {
      All: 0,
      solo: 0,
      'solo-fpp': 0,
      squad: 0,
      'squad-fpp': 0,
    };
    //3인칭 솔로
    const soloStat = parseRankStat('solo', rank);
    const solo = soloStat?.damageDealt || 0;
    result.All = Number((solo / soloStat.roundsPlayed).toFixed(0));
    if (solo === 0) result.solo = 0;
    else result.solo = Number((solo / soloStat.roundsPlayed).toFixed(0));

    //1인칭 솔로
    const soloFppStat = parseRankStat('solo-fpp', rank);
    const soloFpp = soloFppStat?.damageDealt || 0;
    result.All = Number((soloFpp / soloFppStat.roundsPlayed).toFixed(0));
    if (soloFpp === 0) result['solo-fpp'] = 0;
    else result['solo-fpp'] = Number((soloFpp / soloFppStat.roundsPlayed).toFixed(0));

    //3인칭 스쿼드
    const squadStat = parseRankStat('squad', rank);
    const squad = squadStat?.damageDealt || 0;
    result.All = Number((squad / squadStat.roundsPlayed).toFixed(0));
    if (squad === 0) result.squad = 0;
    else result.squad = Number((squad / squadStat.roundsPlayed).toFixed(0));

    //1인칭 스쿼드
    const squadFppStat = parseRankStat('squad-fpp', rank);
    const squadFpp = squadFppStat?.damageDealt || 0;
    result.All = Number((squadFpp / squadFppStat.roundsPlayed).toFixed(0));
    if (squadFpp === 0) result['squad-fpp'] = 0;
    else result['squad-fpp'] = Number((squadFpp / squadFppStat.roundsPlayed).toFixed(0));
    return result;
  }
}
