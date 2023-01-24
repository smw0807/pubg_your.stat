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

import { ModeType, PlatformType } from '.';
import dayjs from 'dayjs';

//팀 검색 필터
export interface ITeamFilter {
  orderBy: 'desc' | 'asc';
  platform: 'kakao' | 'steam';
  mode: ModeType | null | 'all';
  isRank: boolean | null; //null일 경우는 모든게임
}

//팀 만들기 폼
export interface ITeamForm {
  title: string;
  platform: PlatformType;
  isRank: boolean;
  mode: ModeType;
}
//팀 정보 [팀만들기 폼과 중복된는 속성이 있어서 extends함]
export interface ITeamInfo extends ITeamForm {
  roomLeader?: string;
  members?: string[];
  maxCount?: number;
  createdAt?: string | Date | dayjs.Dayjs;
}
