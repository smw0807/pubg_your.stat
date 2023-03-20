import { App } from 'vue';
import { createPinia } from 'pinia';

export const setupPinia = (app: App): void => {
    app.use(createPinia());
}