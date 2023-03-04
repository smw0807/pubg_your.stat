export interface IUserPlatformNickNames {
  email?: string | null;
  'kakao-nickname': string; //카카오 플레이어 닉네임
  'steam-nickname': string; //스팀 플레이어 닉네임
  'created-date'?: string; //최초 등록일
  'updated-date'?: string; //수정일
}
