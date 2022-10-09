/**
 * pinia
 * https://pinia.vuejs.org/
 * https://pinia.vuejs.org/introduction.html
 *
 */
import { App } from 'vue';
import { createPinia } from 'pinia';

export const setupPinia = (app: App) => {
  app.use(createPinia());
};
