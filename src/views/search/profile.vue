<script setup lang="ts">
  /**
   * root 페이지에서 검색 시 여기로 옴
   * url에 platform과 nickname이 들어 있음
   * platform으로 해당 시즌 정보 가져옴
   * nickname으로 아이이디 검색 후 아이디로 현재 시즌 스탯 정보를 가져옴
   */
  import { ref, computed, reactive, onMounted, nextTick } from 'vue';
  import type { Ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useSearchStore } from '@/store/search';
  import type {
    ISearchForm,
    IGameRankStats,
    IGameStats,
    IPlayerSeasonRank,
  } from '@/interfaces';

  //컴포넌트
  import rankStatCard from '@/components/card/rankStat.vue';

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

  // 3인칭 랭크 데이터
  let tppRankSolo: Ref<IGameRankStats | object> = ref({});
  let tppRankSquad: Ref<IGameRankStats | object> = ref({});
  // 1인칭 랭크 데이터
  let fppRankSolo: Ref<IGameRankStats | object> = ref({});
  let fppRankSquad: Ref<IGameRankStats | object> = ref({});
  // 3인칭 일반 데이터
  let tppSolo: Ref<IGameStats | object> = ref({});
  let tppDuo: Ref<IGameStats | object> = ref({});
  let tppSquad: Ref<IGameStats | object> = ref({});
  // 1인칭 일반 데이터
  let fppSolo: Ref<IGameStats | object> = ref({});
  let fppDuo: Ref<IGameStats | object> = ref({});
  let fppSquad: Ref<IGameStats | object> = ref({});

  // 플랫폼 시즌 정보 세팅
  const setSeason = async () => {
    await store.setSeason(params.platform);
  };
  // 전적 검색
  const searchPlayer = async () => {
    await store.searchPlayer(params);
  };

  // 스탯 데이터
  const createdRankStat = (mode: string): IGameRankStats | object => {
    let result: IGameRankStats | object = {};
    switch (mode) {
      case 'solo':
        result = store.rank.data?.attributes.rankedGameModeStats.solo;
        break;
      case 'solo-fpp':
        result = store.rank.data?.attributes.rankedGameModeStats['solo-fpp'];
        break;
      case 'squad':
        result = store.rank.data?.attributes.rankedGameModeStats.squad;
        break;
      case 'squad-fpp':
        result = store.rank.data?.attributes.rankedGameModeStats['squad-fpp'];
        break;
      default:
        result = {};
        break;
    }
    return result;
  };
  const createdStat = (mode: string): IGameStats | object => {
    let result: IGameStats | object = {};
    switch (mode) {
      case 'solo':
        result = store.normal.data?.attributes.gameModeStats.solo;
        break;
      case 'solo-fpp':
        result = store.normal.data?.attributes.gameModeStats['solo-fpp'];
        break;
      case 'duo':
        result = store.normal.data?.attributes.gameModeStats.duo;
        break;
      case 'duo-fpp':
        result = store.normal.data?.attributes.gameModeStats['duo-fpp'];
        break;
      case 'squad':
        result = store.normal.data?.attributes.gameModeStats.squad;
        break;
      case 'squad-fpp':
        result = store.normal.data?.attributes.gameModeStats['squad-fpp'];
        break;
      default:
        result = {};
        break;
    }
    return result;
  };

  onMounted(async () => {
    await setSeason();
    await searchPlayer();
    tppRankSolo.value = createdRankStat('solo');
    tppRankSquad.value = createdRankStat('squad');

    tppSolo.value = createdStat('solo');
    tppDuo.value = createdStat('tppDuo');
    tppSquad.value = createdStat('tppSquad');

    if (hasFPP) {
      fppRankSolo.value = createdRankStat('solo-fpp');
      fppRankSquad.value = createdRankStat('squad-fpp');

      fppSolo.value = createdStat('solo-fpp');
      fppDuo.value = createdStat('duo-fpp');
      fppSquad.value = createdStat('squad-fpp');
    }
  });
</script>

<template>
  <div class="main">
    <!-- 3인칭 영역 -->
    <!-- 3인칭 랭크 솔로, 스쿼드 -->
    <el-row :gutter="20" align="middle" justify="center">
      <el-col :span="10">
        <rank-stat-card solo tpp :data="tppRankSolo" />
      </el-col>
      <el-col :span="10">
        <rank-stat-card squad tpp :data="tppRankSquad" />
        <!-- <rank-stat-card squad tpp :data="testData.squad" /> -->
      </el-col>
    </el-row>
    <!-- 3인칭 일반 솔로, 듀오, 스쿼드 -->

    <!-- 1인칭 영역 -->
    <el-row v-if="hasFPP" :gutter="20" align="middle" justify="center">
      <el-col :span="10">
        <rank-stat-card solo fpp :data="fppRankSolo" />
      </el-col>
      <el-col :span="10">
        <rank-stat-card squad fpp :data="fppRankSquad" />
      </el-col>
    </el-row>
    <!-- 1인칭 랭크 솔로, 스쿼드 -->
    <!-- 1인칭 일반 솔로, 듀오, 스쿼드 -->
  </div>
</template>

<style scoped>
  .el-row {
    margin-bottom: 10px;
  }
</style>
