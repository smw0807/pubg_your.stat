/**
 * todo 로그인 한 사용자의 플랫폼 별 닉네임
 * 아직 미사용
 */
export interface IUserPlatformNickNames {
  email?: string | null;
  'kakao-nickname': string; //카카오 플레이어 닉네임
  'steam-nickname': string; //스팀 플레이어 닉네임
  'created-date'?: string;
  'updated-date'?: string;
}
