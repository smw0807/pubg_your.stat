import { App } from 'vue';
import VueZoomer from 'vue-zoomer';

export const setupZoomer = (app: App) => {
  app.use(VueZoomer);
};
