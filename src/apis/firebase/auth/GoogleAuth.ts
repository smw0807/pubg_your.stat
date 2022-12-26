/**
 * 공식 문서
 * https://firebase.google.com/docs/auth/web/google-signin?hl=ko&authuser=0#web-version-9
 *
 * todo
 * 1. 사이트 최초 로그인 시 플랫폼 별 닉네임 입력 시키는 기능
 * 2. 이미 있으면 패스..?
 */
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
export class GooleAuthAPI {
  private auth: Auth;
  private provider: GoogleAuthProvider;
  constructor() {
    this.auth = getAuth();
    this.provider = new GoogleAuthProvider();
    this.auth.languageCode = 'ko';
  }

  async signIn() {
    try {
      console.group('signIn');
      //팝업창으로 띄우기
      const result = await signInWithPopup(this.auth, this.provider);
      console.log(result);
      //구글 액세스 토큰이 제공된다. 구글 API에 액세스하는데 사용할 수 있다.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log(credential);
      //필드 oauthAccessToken
      const token = credential?.accessToken;
      console.log(token);
      const user = result.user;
      console.log(user);
      console.groupEnd();
    } catch (error: unknown) {
      console.log('error!!');
      console.log(error);
    }
  }
}
