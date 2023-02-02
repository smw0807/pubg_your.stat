import { ModeType, PlatformType } from '.';
import dayjs from 'dayjs';

//팀 검색 필터
export interface ITeamFilter {
  orderBy: 'desc' | 'asc'; //정렬값
  platform: 'kakao' | 'steam'; //플랫폼
  mode: ModeType | null | 'all'; //게임 모드
  isRank: boolean | null; //null일 경우는 모든게임
}

//팀 만들기 폼
export interface ITeamForm {
  title: string; //제목
  platform: PlatformType; //플랫폼
  isRank: boolean; //랭크게임 여부
  mode: ModeType; //게임 모드
}
//팀 정보 [팀만들기 폼과 중복된는 속성이 있어서 extends함]
export interface ITeamInfo extends ITeamForm {
  id?: string; //팀 아이디(파이어베이스 아이디값)
  roomLeader?: string; //팀 방장
  members?: string[]; //참여인원 uid값으로 구성
  maxCount?: number; //게임모드에 따라 최대 인원 지정
  createdAt?: string | Date | dayjs.Dayjs; //팀 생성일
}
