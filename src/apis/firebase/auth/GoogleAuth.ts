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
  getRedirectResult,
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
  async signIn(): Promise<SignInType> {
    try {
      const result = await signInWithPopup(this.auth, this.provider);
      const isNewUser = this.isNewUser(result);
      return {
        isNewUser,
        user: result.user,
      };
    } catch (err) {
      console.error(err);
      throw '로그인에 실패하였습니다.';
    }
  }

  //로그인 유저 정보(웹페이지 새로고침시엔 이걸 써야 정보를 가져옴)
  reloadUser(): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(this.auth, user => {
        unsubscribe();
        resolve(user);
      });
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
