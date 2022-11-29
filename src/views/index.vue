<script setup lang="ts">
  import { ref } from 'vue';
  import type { Ref } from 'vue';
  import { useRouter } from 'vue-router';
  import type { ISearchForm } from '@/interfaces';
  import { ElLoading } from 'element-plus';
  import { errorCode } from '@/utils';

  import mainSearch from '@/components/search/Search.vue';
  import notExistPlayer from '@/components/dialog/NotExistPlayer.vue';

  import { useSearchStore } from '@/store/search';
  const store = useSearchStore();

  const route = useRouter();

  let notPlayer: Ref<boolean> = ref(false);

  // 시즌
  const setSeason = async (params: ISearchForm): Promise<number> => {
    try {
      await store.setSeason(params.platform);
      return 200;
    } catch (err) {
      const code = errorCode(err);
      console.log(code);
      return code;
    }
  };
  // 유저
  const searchPlayer = async (params: ISearchForm): Promise<number> => {
    try {
      await store.searchPlayer(params);
      return 200;
    } catch (err) {
      const code = errorCode(err);
      console.log(code);
      return code;
    }
  };

  //전적 검색
  const search = async (params: ISearchForm): Promise<void> => {
    const loading = ElLoading.service({
      lock: true,
      text: '잠시만 기다려주세요...',
      background: 'rgba(0, 0, 0, 0.7)',
    });

    const season = await setSeason(params);
    const player = await searchPlayer(params);

    loading.close();

    if (season === 200 && player === 200)
      route.push(`/profile/${params.platform}/${params.nickname}`);

    if (player === 404) notPlayer.value = true;
    else if (player === 429) console.log('kk');
  };

  // 사욪자 없음 다이얼로그 닫기
  const notPlayerClose = (): void => {
    notPlayer.value = false;
  };
</script>

<template>
  <div class="main">
    <el-row align="middle" justify="center">
      <el-col>
        <not-exist-player @on-close="notPlayerClose" :is-show="notPlayer" />
        <mainSearch @search-info="search" />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
