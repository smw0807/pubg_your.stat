/**
 * 공식 문서
 * https://firebase.google.com/docs/auth/web/google-signin?hl=ko&authuser=0#web-version-9
 *
 * todo
 * 1. 사이트 최초 로그인 시 플랫폼 별 닉네임 입력 시키는 기능
 * 2. 이미 있으면 패스..?
 */
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';

export class GooleAuthAPI {
  private auth: Auth;
  private provider: GoogleAuthProvider;
  constructor() {
    this.auth = getAuth();
    this.provider = new GoogleAuthProvider();
    this.auth.languageCode = 'ko';
  }

  //로그인 한 유저 정보 가져오기
  get userInfo(): User | null {
    return this.auth.currentUser;
  }
  //로그아웃
  signOut(): void {
    signOut(this.auth);
  }

  //로그인
  async signIn(): Promise<UserCredential> {
    return new Promise(async (resolve, reject) => {
      try {
        //팝업창으로 띄우기
        const result = await signInWithPopup(this.auth, this.provider);
        console.log(result);
        resolve(result);
      } catch (error: unknown) {
        reject(error);
      }
    });
  }
}
