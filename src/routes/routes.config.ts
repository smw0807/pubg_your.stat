import type { RouteRecordRaw } from 'vue-router';
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '검색하기',
    component: () => import('@/views/index.vue'),
    meta: {
      transition: 'fade',
    },
  },
  {
    path: '/:platform/:nickname',
    name: '전적검색 결과',
    props: true,
    component: () => import('@/views/search/_nickname.vue'),
    meta: {
      transition: 'fade',
    },
  },
  {
    path: '/bookmark',
    name: '즐겨찾기',
    component: () => import('@/views/index.vue'),
    meta: {
      transition: 'fade',
    },
  },
  {
    path: '/map',
    name: '맵별 차량 고정젠',
    meta: {
      transition: 'fade',
    },
    children: [
      {
        path: '/map/erangel',
        name: '에란겔',
        component: () => import('@/views/map/erangel.vue'),
        meta: {
          transition: 'fade',
        },
      },
      {
        path: '/map/miramar',
        name: '미라마',
        component: () => import('@/views/map/miramar.vue'),
        meta: {
          transition: 'fade',
        },
      },
      // {
      //   path: '/map/taego',
      //   name: '태이고',
      //   component: () => import('@/views/map/taego.vue'),
      //   meta: {
      //     transition: 'fade',
      //   },
      // },
    ],
  },
];
