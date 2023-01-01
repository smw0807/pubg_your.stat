/**
 * 로그인
 * 로그아웃
 * 토큰 재발급?
 * 사용자 정보 가져오기
 * 사용자 정보 수정
 *  - 스팀 플레이 닉테임
 *  - 카카오 플레이 닉네임
 *
 * 공식문서 링크
 * 구글 로그인 관련
 * https://firebase.google.com/docs/auth/web/google-signin?hl=ko&authuser=0
 *
 * 사용자관리 관련
 * https://firebase.google.com/docs/auth/web/manage-users?authuser=0&hl=ko
 *
 */
import { defineStore } from 'pinia';
import { GooleAuthAPI } from '@/apis';
import { User } from 'firebase/auth';
const auth = new GooleAuthAPI();

type IUser = User | null;

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    hasUser: false,
    user: null as IUser,
  }),
  getters: {
    getUser(): IUser {
      return this.user;
    },
  },
  actions: {
    //로그인
    async signin(): Promise<void> {
      try {
        //todo 로그인 후 파이어스토어에 플레이 닉네임 저장된 데이터 있는지 확인하는 로칙 추가 필요
        console.group('signin');
        console.log(this.user);
        const rs = await auth.signIn();
        this.user = rs.user;
        console.log(this.user);
        console.groupEnd();
      } catch (error) {
        console.error(error);
      }
    },
    //로그인 유저 정보 가져오기
    async userInfo(): Promise<void> {
      try {
        console.log('userInfo');
        const rs = await auth.userInfo;
        console.log(rs);
        if (rs) {
          this.hasUser = true;
        }
        this.user = rs;
      } catch (err) {
        console.error(err);
      }
    },
    //로그아웃
    signout(): void {
      auth.signOut();
      this.hasUser = false;
    },
  },
});
