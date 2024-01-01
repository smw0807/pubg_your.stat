import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';

const routes = setupLayouts(generatedRoutes);

const router = createRouter({
  history: createWebHistory(
    process.env.NODE_ENV === 'production' ? import.meta.env.VITE_PROJECT_NAME : '/'
  ),
  routes,
  strict: true,
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
      behavior: 'smooth',
    };
  },
});

export const setupRouter = (app: App) => {
  app.use(router);
};
