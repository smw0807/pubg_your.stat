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
    user: null,
  }),
  getters: {},
  actions: {
    //로그인
    signin() {
      return new Promise(async (resolve, reject): Promise<void> => {
        try {
          //todo 로그인 후 파이어스토어에 플레이 닉네임 저장된 데이터 있는지 확인하는 로칙 추가 필요
          console.log('???');
          const rs = await auth.signIn();
          //todo 어떤 정보를 상태값에 저장시켜야할지 고민....
          console.log(rs);
          resolve(true);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });
    },
    //로그인 유저 정보 가져오기
    userInfo() {
      return new Promise(async (resolve, reject): Promise<void> => {
        try {
          const rs = auth.authInfo;
          resolve(rs);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });
    },
    //로그아웃
    signout() {
      return new Promise(async (resolve, reject): Promise<void> => {
        try {
          const rs = auth.signOut();
          resolve(rs);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });
    },
  },
});
