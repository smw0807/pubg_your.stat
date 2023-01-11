/**
 * 팀 관련 인터페이스, 타입들
 * 팀 찾기
 * roomLeader: 방장
 * platform: 플랫폼 [kakao | steam]
 * mode: 게임 모드 [solo | solo-fpp | duo | duo-fpp | squad |squad-fpp]
 * isRank: 게임 유형 [ boolean]
 * members: 팀 구성원들 uid
 * title: 팀 제목?
 * createdAt: 팀 생성일
 */

import { ModeType } from '.';

interface member {
  uid: string;
}
export interface ITeamFilter {
  createdAt: string;
  platform: string;
  gameMode: string;
  gameType: string;
}

//팀 만들기 폼
export interface ITeamForm {
  title: string;
  isRank: boolean;
  mode: ModeType;
}
//팀 정보
export interface ITeamInfo {
  roomLeader: string;
  platform: string;
  mode: ModeType;
  isRank: boolean;
  members: member[];
  title: string;
  createdAt?: string;
}

const exampleData1: ITeamInfo = {
  roomLeader: 'sdfasdfasdfasdfasdfas',
  platform: 'kakao',
  mode: 'squad',
  isRank: true,
  members: [{ uid: 'sdfasdfasdfasdfasdfas' }, { uid: 'qweqweqweqweqweqweqwe' }],
  title: '골플 200++ ㄱㄱ 오더 있음',
  createdAt: '2022-12-10 17:40:32',
};
const exampleData2: ITeamInfo = {
  roomLeader: 'szxcvzxcvzxcvzxcvzxcv',
  platform: 'kakao',
  mode: 'squad',
  isRank: false,
  members: [
    { uid: 'szxcvzxcvzxcvzxcvzxcv' },
    { uid: 'asdfasdfasdfasdf' },
    { uid: 'asdfviubufvdaibfv' },
  ],
  title: '태이고 즐겜 스쿼드 ㄱㄱ',
  createdAt: '2022-12-10 13:23:12',
};
