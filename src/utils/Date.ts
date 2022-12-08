export const changeSeconds = (seconds: number): string => {
  if (seconds < 60) return `${seconds}초`;

  let m = Math.floor(seconds / 60);
  let s = Math.floor(seconds % 60);
  if (m < 60) {
    return `${m}분 ${s}초`;
  }

  let h = Math.floor(seconds / 3600);
  m = Math.floor((seconds % 3600) / 60);
  // const m = Math.floor(((seconds % 3600) % 3600) / 60);
  s = Math.floor(seconds % 60);
  // const s = Math.floor(((seconds % 3600) % 3600) % 60);
  if (h < 24) {
    return `${h}시간 ${m}분 ${s}초`;
  }
  const d = Math.floor(seconds / (3600 * 24));
  h = Math.floor((seconds % (3600 * 24)) / 3600);
  return `${d}일 ${h}시간 ${m}분 ${s}초`;
};
