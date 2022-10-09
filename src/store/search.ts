import { defineStore } from 'pinia';

export const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    test: 'hihihi',
  }),
  getters: {
    getTest(state) {
      return state.test;
    },
  },
  actions: {
    search() {
      return new Promise((resolve, reject) => {
        try {
          //todo 배그api 요청 로직 추가하기
          resolve(true);
        } catch (err) {
          console.error('search Error :', err);
          reject(err);
        }
      });
    },
  },
});
