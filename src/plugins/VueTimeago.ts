/**
 * https://mrdeerly.github.io/vue-timeago3/
 * 옵션
 * addSuffix: true, // true로 하면 뒤에 "전" 붙음
 * useStrict: true, // true로 하면 앞에 "약" 빠짐
 */
import { App } from 'vue';
import timeago from 'vue-timeago3';

export const setupTimeago = (app: App) => {
  app.use(timeago);
};
