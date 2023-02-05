import type { RouteRecordRaw } from 'vue-router';
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '검색하기',
    component: () => import('@/pages/index.vue'),
    meta: {
      transition: 'fade',
    },
  },
  {
    path: '/search/:platform/:nickname',
    name: '전적검색 결과',
    component: () => import('@/pages/search/[platform]/[nickname].vue'),
    meta: {
      transition: 'fade',
      hide: true,
    },
  },
  {
    path: '/team-chatting/:id',
    name: '팀 채팅방',
    component: () => import('@/pages/team-chatting/[id].vue'),
    meta: {
      transition: 'fade',
      hide: true,
    },
  },
  {
    path: '/map',
    name: '맵별 차량 위치',
    meta: {
      transition: 'fade',
    },
    children: [
      {
        path: '/erangel',
        name: '에란겔',
        component: () => import('@/pages/map/[name].vue'),
        meta: {
          transition: 'fade',
        },
      },
      {
        path: '/miramar',
        name: '미라마',
        component: () => import('@/pages/map/[name].vue'),
        meta: {
          transition: 'fade',
        },
      },
      {
        path: '/taego',
        name: '태이고',
        component: () => import('@/pages/map/[name].vue'),
        meta: {
          transition: 'fade',
        },
      },
    ],
  },
  {
    path: '/teams',
    name: '팀 구하기',
    meta: {
      transition: 'fade',
    },
    children: [
      {
        path: '/kakao',
        name: '카카오',
        component: () => import('@/pages/teams/[platform].vue'),
        meta: {
          transition: 'fade',
        },
      },
      {
        path: '/steam',
        name: '스팀',
        component: () => import('@/pages/teams/[platform].vue'),
        meta: {
          transition: 'fade',
        },
      },
    ],
  },
];
