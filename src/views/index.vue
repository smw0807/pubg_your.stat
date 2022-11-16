<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import mainSearch from '@/components/search/search.vue';
  import type { ISearchForm } from '@/interfaces';

  const route = useRouter();

  //전적 검색
  async function search(params: ISearchForm) {
    route.push(`/profile/${params.platform}/${params.nickname}`);
  }
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
