<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import mainSearch from '@/components/search/search.vue';
  import type { ISearchForm } from '@/interfaces';
  import { errorCode } from '@/utils';

  import { useSearchStore } from '@/store/search';
  const store = useSearchStore();

  const route = useRouter();

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
    const season = await setSeason(params);
    const player = await searchPlayer(params);
    if (season === 200 && player === 200) {
      route.push(`/profile/${params.platform}/${params.nickname}`);
    }
  };
</script>

<template>
  <div class="main">
    <el-row align="middle" justify="center">
      <el-col>
        <mainSearch @search-info="search" />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
