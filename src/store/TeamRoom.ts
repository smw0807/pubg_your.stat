import { defineStore } from 'pinia';
import { TeamRoomAPI } from '@/apis';

export const useTeamRoomStore = defineStore({
  id: 'teamRoom',
  state: () => ({
    api: new TeamRoomAPI(),
    teamInfo: null,
    // team
    // teamroomAPI: new TeamRoomAPI()
  }),
  getters: {},
  actions: {},
});
