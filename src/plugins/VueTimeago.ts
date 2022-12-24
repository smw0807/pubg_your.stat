/**
 * https://mrdeerly.github.io/vue-timeago3/
 */
import { App } from 'vue';
import timeago from 'vue-timeago3';

export const setupTimeago = (app: App) => {
  app.use(timeago);
};
