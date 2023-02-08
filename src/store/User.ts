/**
 * 로그인
 * 로그아웃
 * 토큰 재발급?
 * 사용자 정보 가져오기
 * 사용자 정보 수정
 *  - 스팀 플레이 닉테임
 *  - 카카오 플레이 닉네임
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
    //로그인 - 최초 로그인시 true 리턴함
    async signin(): Promise<boolean | null> {
      try {
        const { isNewUser, user } = await auth.signIn();
        this.user = user;
        this.hasUser = true;
        return isNewUser;
      } catch (error) {
        console.error(error);
        return null;
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
    //사용자 배그 닉네임 저장
  },
});
