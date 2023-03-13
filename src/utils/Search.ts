import { useSearchStore } from '@/store';
import { ISearchForm } from '@/interfaces';

// 파이어베이스 저장소에서 검색
export const getPlayerStats = async (params: ISearchForm): Promise<number> => {
  const store = useSearchStore();
  try {
    const result = await store.getStats(params);
    if (result) {
      return 200;
    } else {
      return 404;
    }
  } catch (err) {
    return 503;
  }
};
