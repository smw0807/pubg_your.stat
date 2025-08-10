import type { RouteRecordRaw } from 'vue-router';
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/index.vue'),
    meta: {
      transition: 'fade',
    },
  },
  {
    path: '/search/:platform/:nickname',
    name: 'search',
    component: () => import('@/pages/search/[platform]/[nickname].vue'),
    meta: {
      transition: 'fade',
      hide: true,
    },
  },
  {
    path: '/team-room/:id',
    name: 'team-room',
    component: () => import('@/pages/team-room/[id].vue'),
    meta: {
      transition: 'fade',
      hide: true,
    },
  },
  {
    path: '/map',
    name: 'map',
    meta: {
      transition: 'fade',
    },
    children: [
      {
        path: '/erangel',
        name: 'erangel',
        component: () => import('@/pages/map/[name].vue'),
        meta: {
          transition: 'fade',
        },
      },
      {
        path: '/miramar',
        name: 'miramar',
        component: () => import('@/pages/map/[name].vue'),
        meta: {
          transition: 'fade',
        },
      },
      {
        path: '/taego',
        name: 'taego',
        component: () => import('@/pages/map/[name].vue'),
        meta: {
          transition: 'fade',
        },
      },
    ],
  },
  {
    path: '/teams',
    name: 'teams',
    meta: {
      transition: 'fade',
    },
    children: [
      {
        path: '/kakao',
        name: 'kakao',
        component: () => import('@/pages/teams/[platform].vue'),
        meta: {
          transition: 'fade',
        },
      },
      {
        path: '/steam',
        name: 'steam',
        component: () => import('@/pages/teams/[platform].vue'),
        meta: {
          transition: 'fade',
        },
      },
    ],
  },
];
