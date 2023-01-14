/**
 * 날짜, 시간 관련 함수들
 *
 * dayjs
 * https://day.js.org/en/
 * dayjs github
 * https://github.com/iamkun/dayjs/blob/dev/docs/ko/README-ko.md
 *
 * string +format
 * https://day.js.org/docs/en/parse/string-format
 *
 * type
 * dayjs()만 쓰면 타입은 dayjs.Dayjs
 * format(template?: string): string
 */
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

//초 데이터 일,시간,분,초로 변환
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

//현재시간 포맷 형식으로 반환
export const nowDateFormat = (format: string): string => {
  return dayjs().format(format);
};
