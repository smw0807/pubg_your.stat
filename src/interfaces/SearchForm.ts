/**
 * 전적 검색 시 기본적으로 필요한 거
 * 플랫폼: 카카오냐 스팀이냐
 * 닉네임: 플레이어 닉네임
 */
export interface ISearchForm {
  platform: string;
  nickname: string;
  seasonID?: string;
}
