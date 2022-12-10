import app from '../InitApp';
import { getFirestore } from 'firebase/firestore';
export class FireStore {
  public db = getFirestore(app);
}

export { FindTeamAPI } from './FindTeam';
export { TeamAPI } from './Team';
