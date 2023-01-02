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
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
  updateProfile,
} from 'firebase/auth';

export class GooleAuthAPI {
  private auth: Auth;
  private provider: GoogleAuthProvider;
  constructor() {
    this.auth = getAuth();
    this.provider = new GoogleAuthProvider();
    this.auth.languageCode = 'ko';
  }
  // get auth(): Auth{
  //   return getAuth();
  // }

  //현재 로그인 중인 유저 정보
  get nowUser(): User | null {
    return this.auth.currentUser;
  }
  //로그인
  signIn(): Promise<UserCredential> {
    return new Promise(async (resolve, reject) => {
      try {
        //로그인한 사용자 정보 반환
        resolve(await signInWithPopup(this.auth, this.provider));
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
}
