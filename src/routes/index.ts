import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';

export const routes = setupLayouts(generatedRoutes);

const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
      behavior: 'smooth',
    };
  },
});

// router.beforeEach((to, from) => {
//   console.group('router guard');
//   console.log(to);
//   console.log(from);
//   console.groupEnd();
// });

export const setupRouter = (app: App) => {
  app.use(router);
};
