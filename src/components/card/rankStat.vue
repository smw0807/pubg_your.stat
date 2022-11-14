<script setup lang="ts">
  /**
   * 이 컴포넌트 만들면서 참고한 사이트들
   * https://vuejs.org/guide/typescript/composition-api.html
   * https://element-plus.org/en-US/component/divider.html
   */
  import {
    defineProps,
    reactive,
    ref,
    computed,
    watch,
    watchEffect,
  } from 'vue';
  import type { Ref } from 'vue';
  import { IPlayerSeasonRank, IGameRankStats } from '../../interfaces';
  import { useSearchStore } from '../../store/search';

  const store = useSearchStore();

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
    data: IPlayerSeasonRank;
    mode?: string; //solo, duo, squad
    solo?: boolean;
    squad?: boolean;
    tpp?: boolean; //3인칭
    fpp?: boolean; //1인칭
  }
  const props = defineProps<Props>();
  console.log(props);

  const mode = Mode[props.mode]; //! 이거 해결 방법을 모르겠네

  // let stat = reactive({});
  let stat: Ref<IGameRankStats | undefined> = ref(undefined);
  watch(props.data, () => {});
  watchEffect(() => {
    console.log('watchEffect : ', props.data);
    stat = createdStat();
  });

  const createdStat = () => {
    // let result: Ref<IGameRankStats | null> = ref(null);
    if (props.solo) {
    } else if (props.squad) {
      return props.data.data?.attributes.rankedGameModeStats.squad;
    } else {
      alert('Need Game Mode Property\nsolo or duo or squad');
    }
  };

  // const stat = reactive(createdStat());
  console.log('stat : ', stat);
  // const stat: IGameRankStats = reactive(props.data);
  // const stat: Ref<IGameRankStats> = ref(
  //   store.stats.rank.data.attributes.rankedGameModeStats.squad
  // );
  // console.log('stat : ', stat.value);

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
  const winRatio = (stat?.winRatio || 0 * 100).toFixed(1);
  const top10Ratio = (stat?.top10Ratio || 0 * 1000).toFixed(1);
  const avgRank = (stat?.avgRank || 0).toFixed(1);
  const kda = (stat?.kda || 0).toFixed(1);
  const kills = stat?.kills;
  const assists = stat?.assists;
  const deaths = stat?.deaths;
  const dBNOs = stat?.dBNOs;
  const damageDealt = stat?.damageDealt;
</script>
<template>
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
      <el-col :span="15">
        {{ kda }} (K:{{ kills }} / D:{{ deaths }} / A:{{ assists }})
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="5">기절시킴</el-col>
      <el-col :span="5">{{ dBNOs }}</el-col>
      <el-col :span="5">누적딜량</el-col>
      <el-col :span="5">{{ damageDealt }}</el-col>
    </el-row>
  </el-card>
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
