/**
 * number 관련 유틸 함수들 모으는 곳
 */

/**
 * 숫자 3자리마다 콤마 넣기
 * @param v 변환할 숫자
 * @returns 콤마 넣은 값
 */
export const insertComma = (v: number): string => {
  return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
