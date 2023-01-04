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

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    hasUser: false,
    user: null as User | null,
  }),
  getters: {
    getUser(): User | null {
      return this.user;
    },
  },
  actions: {
    //로그인
    async signin(): Promise<void> {
      try {
        this.user = await auth.signIn();
        this.hasUser = true;
        //todo 로그인 후 파이어스토어에 플레이 닉네임 저장된 데이터 있는지 확인하는 로칙 추가 필요
      } catch (error) {
        console.error(error);
      }
    },
    //현재 로그인 중인 사용자 정보 가져오기(새로고침 시엔 이거 안먹힘...)
    nowUser(): void {
      try {
        const user = auth.nowUser;
        this.hasUser = user ? true : false;
        this.user = user;
      } catch (error) {
        console.error(error);
      }
    },
    //로그인 유저 정보 가져오기(새로고침 시엔 이 함수 사용)
    async reloadUser(): Promise<void> {
      try {
        const user = await auth.reloadUser();
        this.hasUser = user ? true : false;
        this.user = user;
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
