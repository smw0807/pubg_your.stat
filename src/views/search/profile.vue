<script setup lang="ts">
  /**
   * root 페이지에서 검색 시 여기로 옴
   * url에 platform과 nickname이 들어 있음
   * platform으로 해당 시즌 정보 가져옴
   * nickname으로 아이이디 검색 후 아이디로 현재 시즌 스탯 정보를 가져옴
   */
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useSearchStore } from '../../store/search';
  import type { ISearchForm } from '../../interfaces';

  //컴포넌트
  import rankStatCard from '../../components/card/rankStat.vue';

  const store = useSearchStore();
  const route = useRoute();

  console.log(route);

  const params: ISearchForm = {
    platform: route.params.platform as string,
    nickname: route.params.nickname as string,
  };

  // 1인칭 모드 유무
  const hasFPP: boolean = params.platform === 'kakao' ? false : true;

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
    // await setNowSeason();
    // await search(params);
  });
</script>

<template>
  <!-- 3인칭 랭크 솔로, 스쿼드 -->
  <!-- 3인칭 일반 솔로, 듀오, 스쿼드 -->
  <!-- 1인칭 랭크 솔로, 스쿼드 -->
  <!-- 1인칭 일반 솔로, 듀오, 스쿼드 -->
  <div class="main">
    <!-- 3인칭 영역 -->
    <el-row align="middle" justify="center">
      <el-col><rank-stat-card /> </el-col>
    </el-row>
    <!-- 1인칭 영역 -->
  </div>
</template>

<style scoped></style>
