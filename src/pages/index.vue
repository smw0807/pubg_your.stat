<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import type { ISearchForm } from '@/interfaces';
  import { ElLoading } from 'element-plus';
  import { getPlayerStats } from '@/utils';

  import mainSearch from '@/components/search/Search.vue';

  const route = useRouter();

  //전적 검색
  const search = async (params: ISearchForm): Promise<void> => {
    const loading = ElLoading.service({
      lock: true,
      text: '잠시만 기다려주세요...',
      background: 'rgba(0, 0, 0, 0.7)',
    });

    const getStat = await getPlayerStats(params);

    loading.close();

    // if (getStat === 200) route.push(`/search/${params.platform}`);
    if (getStat === 200) route.push(`/search/${params.platform}/${params.nickname}`);
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
