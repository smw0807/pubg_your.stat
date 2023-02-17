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
import { GooleAuthAPI, UsersAPI } from '@/apis';
import { IUserPlatformNickNames } from '@/interfaces';
import { User } from 'firebase/auth';
const authAPI = new GooleAuthAPI();
const usersAPI = new UsersAPI();

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    //현재 유저 정보 유무
    hasUser: false,
    //현재 로그인 유저 정보
    user: null as User | null,
    //현재 로그인 유저의 플랫폼 별 닉네임
    nicknames: null as IUserPlatformNickNames | null,
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
        const { isNewUser, user } = await authAPI.signIn();
        this.user = user;
        this.hasUser = true;
        return isNewUser;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    //현재 로그인 중인 사용자 정보 가져오기(새로고침 시엔 이거 안먹힘...)
    async nowUser(): Promise<void> {
      try {
        const user = authAPI.nowUser;
        this.hasUser = user ? true : false;
        this.user = user;
        this.nicknames = await usersAPI.getMyPlatformNickname(user?.uid as string);
      } catch (error) {
        console.error(error);
      }
    },
    //로그인 유저 정보 가져오기(새로고침 시엔 이 함수 사용)
    async reloadUser(): Promise<void> {
      try {
        const user = await authAPI.reloadUser();
        this.hasUser = user ? true : false;
        this.user = user;
      } catch (err) {
        console.error(err);
      }
    },
    //로그아웃
    signout(): void {
      authAPI.signOut();
      this.hasUser = false;
    },
    //사용자 배그 닉네임 저장
    async savePlatformNickname(
      mode: 'ins' | 'upd',
      params: IUserPlatformNickNames
    ): Promise<boolean | string> {
      try {
        if (!this.user) {
          return '로그인 상태 확인 필요';
        }
        return await usersAPI.savePlatformNickname(
          mode,
          this.user,
          params['steam-nickname'],
          params['kakao-nickname']
        );
      } catch (err) {
        console.error(err);
        return '닉네임 저장 실패';
      }
    },
  },
});
