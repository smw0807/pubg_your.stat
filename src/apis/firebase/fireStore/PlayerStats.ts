import { FireStore } from '@/apis/firebase';
import { doc, getDoc } from 'firebase/firestore';

export class PlayerStatsAPI {
  private db = FireStore;
  private rankCollection: string = 'player-rank-stats';
  private normalCollection: string = 'player-normal-stats';

  getStat(isRank: boolean, flatform: string, nickName: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const collection = isRank ? this.rankCollection : this.normalCollection;
        const docRef = doc(this.db, collection, `${flatform}-${nickName}`);
        const docSnap = await getDoc(docRef);
        resolve(docSnap);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }
}
