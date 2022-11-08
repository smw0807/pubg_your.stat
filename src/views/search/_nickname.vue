<script setup lang="ts">
/**
 * root 페이지에서 검색 시 여기로 옴
 * url에 platform과 nickname이 들어 있음
 * platform으로 해당 시즌 정보 가져옴
 * nickname으로 아이이디 검색 후 아이디로 현재 시즌 스탯 정보를 가져옴
 */
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSearchStore } from '../../store/search';
import type { ISearchForm } from '../../interfaces';

const store = useSearchStore();
const route = useRoute();

const params: ISearchForm = {
  platform: route.params.platform as string,
  nickname: route.params.nickname as string,
};

//플랫폼 시즌 정보 세팅
async function setNowSeason() {
  await store.setSeason(params.platform);
}

//전적 검색
async function search(params: ISearchForm) {
  await store.searchPlayer(params);
  console.log(store.rankStat.data.attributes.rankedGameModeStats);
  console.log(store.stat.data.attributes.gameModeStats);
}
onMounted(async () => {
  await setNowSeason();
  await search(params);
});
</script>

<template>
  <!-- 랭크 스탯, 일반 솔로, 듀오, 스쿼드 스탯 컴포넌트 필요 -->
  <!-- 매치 히스토리 컴포넌트 필요 -->
  <div class="main">
    <el-row align="middle" justify="center">
      <el-col>gdgd </el-col>
    </el-row>
  </div>
</template>

<style scoped>
</style>