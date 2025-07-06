import { ModeType } from '@/types';
/**
 * 맵핑 관련
 */

// 게임모드 한글 맵핑
export const gameModeName = (mode: ModeType): string => {
  let result = '';
  switch (mode) {
    case 'All':
      result = '랭크';
      break;
    case 'solo':
      result = '3인칭 솔로';
      break;
    case 'solo-fpp':
      result = '1인칭 솔로';
      break;
    case 'duo':
      result = '3인칭 듀오';
      break;
    case 'duo-fpp':
      result = '1인칭 듀오';
      break;
    case 'squad':
      result = '3인칭 스쿼드';
      break;
    case 'squad-fpp':
      result = '1인칭 스쿼드';
      break;
    default:
      console.warn('please check mode props');
      break;
  }
  return result;
};
