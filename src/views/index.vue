<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import type { ISearchForm } from '@/interfaces';
  import { ElLoading } from 'element-plus';
  import { _429, player404, setSeason, searchPlayer } from '@/utils';

  import mainSearch from '@/components/search/Search.vue';

  const route = useRouter();

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

    if (player === 404) player404();
    if (season === 429 || player === 429) _429();
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
