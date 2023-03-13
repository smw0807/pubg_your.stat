<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import type { ISearchForm } from '@/interfaces';
  import { ElLoading } from 'element-plus';
  import { player404, _429, notifError } from '@/utils';
  import { useSearchStore } from '@/store';

  import mainSearch from '@/components/search/Search.vue';

  const route = useRouter();
  const store = useSearchStore();

  //전적 검색
  const search = async (params: ISearchForm): Promise<void> => {
    const loading = ElLoading.service({
      lock: true,
      text: '잠시만 기다려주세요...',
      background: 'rgba(0, 0, 0, 0.7)',
    });
    try {
      const getStat = await store.getStats(params);
      if (getStat) {
        route.push(`/search/${params.platform}/${params.nickname}`);
      }
    } catch (err) {
      if (err === 404) player404();
      else if (err === 429) _429();
      else notifError('플레이어 조회 실패', err as string);
    }
    loading.close();
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
