import { defineStore } from 'pinia';
import { GooleAuthAPI } from '@/apis';
const auth = new GooleAuthAPI();

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({}),
  getters: {},
  actions: {
    signin() {
      return new Promise(async (resolve, reject) => {
        try {
        } catch (err) {}
      });
    },
  },
});
