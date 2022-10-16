import { defineStore } from 'pinia';
import { PlayersAPI } from '../apis/Players';
import player from '../interfaces/Players';

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
    async search(params: player) {
      const searchAPI = new PlayersAPI(params.platform, params.nickname);
      const player = await searchAPI.getPlayer();
      console.log(player);
    },
  },
});
