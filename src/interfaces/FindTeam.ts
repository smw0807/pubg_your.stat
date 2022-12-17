interface member {
  uid: string;
}
/**
 * 팀 찾기
 * roomLeader: 방장
 * platform: 플랫폼 [kakao | steam]
 * gameMode: 게임 모드 [solo | solo-fpp | duo | duo-fpp | squad |squad-fpp]
 * gameType: 게임 유형 [ normal | rank]
 * members: 팀 구성원들 uid
 * title: 팀 제목?
 * createdAt: 팀 생성일
 */
export interface IFindTeam {
  roomLeader: string;
  platform: string;
  gameMode: string;
  gameType: string;
  members: member[];
  title: string;
  createdAt?: string;
}

const exampleData1: IFindTeam = {
  roomLeader: 'sdfasdfasdfasdfasdfas',
  platform: 'kakao',
  gameMode: 'tpp',
  gameType: 'rank',
  members: [{ uid: 'sdfasdfasdfasdfasdfas' }, { uid: 'qweqweqweqweqweqweqwe' }],
  title: '골플 200++ ㄱㄱ 오더 있음',
  createdAt: '2022-12-10 17:40:32',
};
const exampleData2: IFindTeam = {
  roomLeader: 'szxcvzxcvzxcvzxcvzxcv',
  platform: 'kakao',
  gameMode: 'tpp',
  gameType: 'normal',
  members: [
    { uid: 'szxcvzxcvzxcvzxcvzxcv' },
    { uid: 'asdfasdfasdfasdf' },
    { uid: 'asdfviubufvdaibfv' },
  ],
  title: '태이고 즐겜 스쿼드 ㄱㄱ',
  createdAt: '2022-12-10 13:23:12',
};
