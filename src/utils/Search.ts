import { useSearchStore } from '@/store';
import { ISearchForm } from '@/interfaces';
import { errorCode } from '.';

const store = useSearchStore();
// 시즌
export const setSeason = async (params: ISearchForm): Promise<number> => {
  try {
    await store.setSeason(params.platform);
    return 200;
  } catch (err) {
    const code = errorCode(err);
    return code;
  }
};
// 유저
export const searchPlayer = async (params: ISearchForm): Promise<number> => {
  try {
    await store.searchPlayer(params);
    return 200;
  } catch (err) {
    const code = errorCode(err);
    return code;
  }
};
