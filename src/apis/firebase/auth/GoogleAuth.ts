/**
 * todo
 * 1. 사이트 최초 로그인 시 플랫폼 별 닉네임 입력 시키는 기능
 * 2. 이미 있으면 패스..?
 */
import { app } from '@/apis/firebase';
import {
  Auth,
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
  getAdditionalUserInfo,
  AdditionalUserInfo,
} from 'firebase/auth';

type SignInType = {
  isNewUser: boolean | null;
  user: User;
};
export class GooleAuthAPI {
  private auth: Auth;
  private provider: GoogleAuthProvider;
  constructor() {
    this.auth = getAuth(app);
    this.provider = new GoogleAuthProvider();
    this.auth.languageCode = 'ko';
  }

  //현재 로그인 중인 유저 정보
  get nowUser(): User | null {
    return this.auth.currentUser;
  }
  //로그인
  signIn(): Promise<SignInType> {
    return new Promise(async (resolve, reject) => {
      try {
        //로그인한 사용자 정보
        const result = await signInWithPopup(this.auth, this.provider);
        //최초 로그인 여부
        const isNewUser = this.isNewUser(result);

        resolve({
          isNewUser: isNewUser,
          user: result.user,
        });
      } catch (error: unknown) {
        reject(error);
      }
    });
  }
  //로그인 유저 정보(웹페이지 새로고침시엔 이걸 써야 정보를 가져옴)
  reloadUser(): Promise<User | null> {
    return new Promise(async (resolve, reject) => {
      try {
        //async/await 방식으로 사용하는 방법을 못찾겠음.
        onAuthStateChanged(this.auth, user => {
          resolve(user);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  //로그아웃
  signOut(): void {
    signOut(this.auth);
  }

  //최초 로그인 체크
  isNewUser(user: UserCredential): boolean | null {
    const result = getAdditionalUserInfo(user);
    return result?.isNewUser || null;
  }
}
