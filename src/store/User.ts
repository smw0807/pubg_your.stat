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
const auth = new GooleAuthAPI();

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({}),
  getters: {},
  actions: {
    signin() {
      return new Promise(async (resolve, reject): Promise<void> => {
        try {
          //todo 로그인 후 파이어스토어에 플레이 닉네임 저장된 데이터 있는지 확인하는 로칙 추가 필요
          console.log('???');
          await auth.signIn();
          resolve(true);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });
    },
  },
});
