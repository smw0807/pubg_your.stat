<script setup lang="ts">
  /**
   * root 페이지에서 검색 시 여기로 옴
   * url에 platform과 nickname이 들어 있음
   * platform으로 해당 시즌 정보 가져옴
   * nickname으로 아이이디 검색 후 아이디로 현재 시즌 스탯 정보를 가져옴
   */
  import { ref, computed, reactive } from 'vue';
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

  const tppSquad = computed(() => {
    console.log('computed: ', store.rank);
    return store.rank;
  });

  //플랫폼 시즌 정보 세팅
  const setNowSeason = () => {
    store
      .setSeason(params.platform)
      .then(rs => {
        if (rs) {
          search();
        }
      })
      .catch(err => {
        console.error('setNowSeason Error : ', err);
        alert(err);
      });
  };
  //전적 검색
  const search = () => {
    console.log('search???');
    store
      .searchPlayer(params)
      .then(() => {
        // rankSquadStat = rs.rank.data.attributes.rankedGameModeStats.squad;
        // rankSquadStat = rs.rank.data.attributes.rankedGameModeStats.squad;
        // console.log('then : ', tppSquad);
      })
      .catch(err => {
        console.error('search Error : ', err);
        alert(err);
      });
  };
  setNowSeason();
</script>

<template>
  <div class="main">
    <!-- 3인칭 영역 -->
    <!-- 3인칭 랭크 솔로, 스쿼드 -->
    <el-row :gutter="20" align="middle" justify="center">
      <el-col :span="10">
        test
        <!-- <rank-stat-card mode="solo" tpp :data="testData.squad" /> -->
      </el-col>
      <el-col :span="10">
        <!-- <suspense timeout="0"> -->
        <rank-stat-card squad tpp :data="tppSquad" />
        <!-- <template #default>
          </template> -->
        <!-- <template #fallback> Getting Your Stat.... </template> -->
        <!-- </suspense> -->
      </el-col>
    </el-row>
    <!-- 3인칭 일반 솔로, 듀오, 스쿼드 -->

    <!-- 1인칭 영역 -->
    <!-- 1인칭 랭크 솔로, 스쿼드 -->
    <!-- 1인칭 일반 솔로, 듀오, 스쿼드 -->
  </div>
</template>

<style scoped></style>
