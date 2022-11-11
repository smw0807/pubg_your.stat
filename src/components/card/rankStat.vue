<script setup lang="ts">
  /**
   * 이 컴포넌트 만들면서 참고한 사이트들
   * https://vuejs.org/guide/typescript/composition-api.html
   * https://element-plus.org/en-US/component/divider.html
   * https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking/
   */
  import { defineProps } from 'vue';
  import { IGameRankStats } from '../../interfaces';

  const Mode = {
    solo: '솔로',
    duo: '듀오',
    squad: '스쿼드',
  };
  const Tier = {
    Bronze: '브론즈',
    Silver: '실버',
    Gold: '골드',
    Platinum: '플래티넘',
    Diamond: '다이아몬드',
    Master: '마스터',
  };
  interface Props {
    data: IGameRankStats;
    mode: string; //solo, duo, squad
    isTPP?: boolean; //3인칭
    isFPP?: boolean; //1인칭
  }
  const props = defineProps<Props>();
  console.log(props);

  const stat: IGameRankStats = props.data;

  const mode = Mode[props.mode]; //! 이거 해결 방법을 모르겠네

  //Tier
  const currentTier = stat?.currentTier;
  const cTier = currentTier?.tier;
  const cSubTier = currentTier?.subTier;
  const currentRankPoint = stat?.currentRankPoint;
  const bestTier = stat?.bestTier;
  const bTier = bestTier?.tier;
  const bSubTier = bestTier?.subTier;
  const bestRankPoint = stat?.bestRankPoint;

  //Game
  const roundsPlayed = stat?.roundsPlayed;
  const wins = stat?.wins;
  const winRatio = (stat?.winRatio * 100 || 0).toFixed(1);
  const top10Ratio = (stat?.top10Ratio * 100 || 0).toFixed(1);
  const avgRank = stat?.avgRank.toFixed(1) || 0;
  const kda = stat?.kda;
  const kills = stat?.kills;
  const assists = stat?.assists;
  const deaths = stat?.deaths;
  const dBNOs = stat?.dBNOs;
  const damageDealt = stat?.damageDealt;
</script>
<template>
  <suspense>
    <template #default>
      <el-card class="box-card">
        <el-divider> {{ mode }} </el-divider>
        <el-divider content-position="left"> 티어 </el-divider>
        <el-row :gutter="20">
          <el-col :span="5">현재</el-col>
          <el-col :span="15">
            {{ cTier }}
            {{ cSubTier }} (RP:{{ currentRankPoint }})
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5">최고</el-col>
          <el-col :span="15">
            {{ bTier }}
            {{ bSubTier }} (RP:{{ bestRankPoint }})
          </el-col>
        </el-row>

        <el-divider content-position="left"> 게임 </el-divider>
        <el-row :gutter="20">
          <el-col :span="5">총게임 </el-col>
          <el-col :span="5">{{ roundsPlayed }} 회</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5">치킨</el-col>
          <el-col :span="5">{{ wins }} 승</el-col>
          <el-col :span="5">승률</el-col>
          <el-col :span="5">{{ winRatio }}%</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5">탑10</el-col>
          <el-col :span="5">{{ top10Ratio }} %</el-col>
          <el-col :span="5">평균 등수</el-col>
          <el-col :span="5">{{ avgRank }} 등</el-col>
        </el-row>

        <el-divider content-position="left"> 스탯 </el-divider>
        <el-row :gutter="20">
          <el-col :span="5">KAD</el-col>
          <el-col :span="5"> {{ kda }} </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3">킬</el-col>
          <el-col :span="5">{{ kills }} </el-col>
          <el-col :span="3">어시</el-col>
          <el-col :span="5">{{ assists }} </el-col>
          <el-col :span="3">데스</el-col>
          <el-col :span="5">{{ deaths }} </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5">기절시킴</el-col>
          <el-col :span="5">{{ dBNOs }}</el-col>
          <el-col :span="5">누적딜량</el-col>
          <el-col :span="5">{{ damageDealt }}</el-col>
        </el-row>
      </el-card>
    </template>
    <template #fallback>
      <span>loading...</span>
    </template>
  </suspense>
</template>
<style scope>
  .el-row {
    margin-bottom: 10px;
  }
  /* .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width: 480px;
  } */
</style>
