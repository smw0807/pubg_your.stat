import { customRouteRecordRaw } from '@/interfaces';
export const routes: Array<customRouteRecordRaw> = [
  {
    path: '/',
    name: '검색하기',
    component: () => import('@/views/index.vue'),
    meta: {
      transition: 'fade',
    },
  },
  {
    path: '/profile/:platform/:nickname',
    name: '전적검색 결과',
    hide: true,
    component: () => import('@/views/search/index.vue'),
    meta: {
      transition: 'fade',
    },
  },
  {
    path: '/team-chatting/:uid',
    name: '팀 채팅방',
    hide: true,
    component: () => import('@/views/chat/index.vue'),
    meta: {
      transition: 'fade',
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
      {
        path: '/map/taego',
        name: '태이고',
        component: () => import('@/views/map/taego.vue'),
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
        path: '/teams/kakao',
        name: '카카오',
        component: () => import('@/views/teams/kakao.vue'),
        meta: {
          transition: 'fade',
        },
      },
      {
        path: '/teams/steam',
        name: '스팀',
        component: () => import('@/views/teams/steam.vue'),
        meta: {
          transition: 'fade',
        },
      },
    ],
  },
];
