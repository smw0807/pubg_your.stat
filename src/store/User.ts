import { defineStore } from 'pinia';
import { GooleAuthAPI, UsersAPI } from '@/apis';
import { IUserPlatformNickNames } from '@/types';
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
    getNickname(): IUserPlatformNickNames | null {
      return this.nicknames;
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
      } catch (err) {
        throw err;
      }
    },
    //현재 로그인 중인 사용자 정보 가져오기(새로고침 시엔 이거 안먹힘...)
    async nowUser(): Promise<void> {
      try {
        const user = authAPI.nowUser;
        this.hasUser = user ? true : false;
        this.user = user;
        await this.setNickname();
      } catch (error) {
        console.error(error);
      }
    },
    //로그인 유저 정보 가져오기(새로고침 시엔 이 함수 사용)
    async reloadUser(): Promise<void> {
      try {
        authAPI.reloadUser(async user => {
          if (user) {
            this.hasUser = user ? true : false;
            this.user = user;
            await this.setNickname();
          }
        });
      } catch (err) {
        throw err;
      }
    },
    //저장된 닉네임 가져오기
    async setNickname(): Promise<void> {
      try {
        this.nicknames = await usersAPI.getPlatformNickname(this.user?.uid!);
      } catch (err) {
        throw err;
      }
    },
    //로그아웃
    signout(): void {
      authAPI.signOut();
      this.hasUser = false;
    },
    //내 정보 - 사용자 배그 닉네임 저장
    async savePlatformNickname(
      mode: 'ins' | 'upd',
      params: IUserPlatformNickNames
    ): Promise<boolean | string> {
      try {
        if (!this.user) {
          throw '로그인 상태 확인 필요';
        }

        const result = await usersAPI.savePlatformNickname(
          mode,
          this.user,
          params['steam-nickname'],
          params['kakao-nickname']
        );
        await this.setNickname();
        return result;
      } catch (err) {
        throw err;
      }
    },
  },
});
