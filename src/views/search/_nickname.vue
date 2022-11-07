<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSearchStore } from '@/store/search';
import type { ISearchForm } from '@/interfaces';

const store = useSearchStore();
const route = useRoute();

const params: ISearchForm = {
  platform: route.params.platform,
  nickname: route.params.nickname,
};

//플랫폼 시즌 정보 세팅
async function setNowSeason() {
  await store.setSeason(params.platform);
}

//전적 검색
async function search(params: ISearchForm) {
  const rs = await store.searchPlayer(params);
  console.log(rs);
}
onMounted(async () => {
  await setNowSeason();
  await search(params);
});
</script>

<template>
  <div class="main">
    <el-row align="middle" justify="center">
      <el-col>gdgd </el-col>
    </el-row>
  </div>
</template>

<style scoped>
</style>