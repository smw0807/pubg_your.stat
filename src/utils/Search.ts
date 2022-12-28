import { useSearchStore } from '@/store';
import { ISearchForm } from '@/interfaces';

// 파이어베이스 저장소에서 검색
export const getStats = async (params: ISearchForm): Promise<number> => {
  const store = useSearchStore();
  try {
    await store.getStats(params);
    return 200;
  } catch (err) {
    return 503;
  }
};
