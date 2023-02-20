//팀 안에서 사용할...
import { collection, addDoc, query, getDocs, orderBy, where } from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import { FireStore, GooleAuthAPI } from '@/apis/firebase';
import { ITeamFilter, ITeamInfo, ModeType } from '@/interfaces';
import { nowDateFormat } from '@/utils';

export class TeamAPI extends GooleAuthAPI {
  private db = FireStore;
  private collection: string = 'teams';

  // 팀 리스트 가져오기
  async teamList(params: ITeamFilter): Promise<DocumentData> {
    return new Promise(async (resolve, reject) => {
      try {
        let list: DocumentData = [];
        // 기본 쿼리
        let q = query(
          collection(this.db, this.collection),
          where('platform', '==', params.platform),
          orderBy('createdAt', params.orderBy)
        );
        if (params.isRank !== null) q = query(q, where('isRank', '==', params.isRank));
        if (params.mode !== 'all') q = query(q, where('mode', '==', params.mode));

        const querySnapshot = await getDocs(q);
        list = querySnapshot.docs.map(v => {
          const rt = v.data();
          rt.id = v.id;
          return rt;
        });
        resolve(list);
      } catch (err) {
        reject(err);
      }
    });
  }
  // 팀 만들기
  createTeam(params: ITeamInfo): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const uid = this.nowUser?.uid as string;
        params.members = [uid];
        params.roomLeader = uid;
        params.createdAt = nowDateFormat('YYYY-MM-DD HH:mm:ss');
        params.maxCount = this.maxCount(params.mode);
        const docRef = await addDoc(collection(this.db, this.collection), params);
        resolve(docRef.id);
      } catch (err) {
        reject(err);
      }
    });
  }

  //모드에 따라 팀 최대 인원
  maxCount(mode: ModeType): number {
    let result = 0;
    switch (mode) {
      case 'duo':
      case 'duo-fpp':
        result = 2;
        break;
      case 'squad':
      case 'squad-fpp':
        result = 4;
        break;
    }
    return result;
  }
}
