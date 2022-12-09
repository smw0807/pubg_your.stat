import { app } from './FireBase';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { ISearchForm, IGameRankStats } from '@/interfaces';
export class FireStore {
  private db = getFirestore(app);

  async searchRankStat(form: ISearchForm) {
    const ref = doc(
      this.db,
      'player-rank-stat',
      `${form.platform}-${form.nickname}`
    );
    const result = await getDoc(ref);
    if (result.exists()) {
      return result.data();
    }
    return null;
  }
  async insertRankStat(form: ISearchForm, stat: IGameRankStats) {}
}

const test = new FireStore();
console.log(test);
