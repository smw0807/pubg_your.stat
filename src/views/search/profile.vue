<script setup lang="ts">
  /**
   * root 페이지에서 검색 시 여기로 옴
   * url에 platform과 nickname이 들어 있음
   * platform으로 해당 시즌 정보 가져옴
   * nickname으로 아이이디 검색 후 아이디로 현재 시즌 스탯 정보를 가져옴
   */
  import { ref, onMounted } from 'vue';
  import type { Ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useSearchStore } from '../../store/search';
  import type {
    ISearchForm,
    IGameRankStats,
    IPlayerSeasonRank,
  } from '../../interfaces';

  //컴포넌트
  import rankStatCard from '../../components/card/rankStat.vue';

  //테스트 데이터
  import testData from '../../../test/rankStatSample.json';

  const store = useSearchStore();
  const route = useRoute();

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

  let rankStat: Ref<IGameRankStats | null> = ref(null);
  console.log(rankStat);
  //전적 검색
  async function search(params: ISearchForm) {
    await store.searchPlayer(params);
    rankStat.value = store.rankStat.data.attributes.rankedGameModeStats.squad;
    // console.log(store.rankStat.data);
    // console.log(store.stat.data.attributes.gameModeStats);
  }
  await setNowSeason();
  await search(params);
  onMounted(async () => {});
  console.log(rankStat);
</script>

<template>
  <div class="main">
    <!-- 3인칭 영역 -->
    <!-- 3인칭 랭크 솔로, 스쿼드 -->
    <el-row :gutter="20" align="middle" justify="center">
      <el-col :span="10"
        ><rank-stat-card mode="solo" isTPP :data="testData.squad" />
      </el-col>
      <el-col :span="10">
        <suspense>
          <rank-stat-card mode="squad" isTPP :data="rankStat" />
        </suspense>
      </el-col>
    </el-row>
    <!-- 3인칭 일반 솔로, 듀오, 스쿼드 -->

    <!-- 1인칭 영역 -->
    <!-- 1인칭 랭크 솔로, 스쿼드 -->
    <!-- 1인칭 일반 솔로, 듀오, 스쿼드 -->
  </div>
</template>

<style scoped></style>
