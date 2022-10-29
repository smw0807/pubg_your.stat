export interface IPlayer {
  platform: string; //카카오, 스팀
  nickname: string; //게임 닉네임
  getPlayer(): void; //1명 조회
  getPlayers(): void; //여러명 조회
}
