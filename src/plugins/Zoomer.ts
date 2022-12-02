/**
 * 깃허브 주소
 * https://github.com/jarvisniu/vue-zoomer/tree/next
 */
import { App } from 'vue';
import VueZoomer from 'vue-zoomer';

export const setupZoomer = (app: App) => {
  app.use(VueZoomer);
};
