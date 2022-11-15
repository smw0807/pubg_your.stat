<script setup lang="ts">
  /**
   * 이 컴포넌트 만들면서 참고한 사이트들
   * https://vuejs.org/guide/typescript/composition-api.html
   * https://element-plus.org/en-US/component/divider.html
   */
  import { defineProps, ref, computed } from 'vue';
  import type { Ref } from 'vue';
  import { IGameRankStats } from '../../interfaces';
  import { useSearchStore } from '../../store/search';

  const store = useSearchStore();

  interface Props {
    data: IGameRankStats;
    mode?: string; //solo, duo, squad
    solo?: boolean;
    squad?: boolean;
    tpp?: boolean; //3인칭
    fpp?: boolean; //1인칭
  }
  const props = defineProps<Props>();
  // console.log(props);

  const mode: Ref<string> = ref('');

  // TIer
  const currentTier = computed(() => props.data?.currentTier || '-');
  const currentRankPoint = computed(() => props.data?.currentRankPoint || 0);
  const bestTier = computed(() => props.data?.bestTier || '-');
  const bestRankPoint = computed(() => props.data?.bestRankPoint || 0);

  //Game
  const roundsPlayed = computed(() => props.data?.roundsPlayed || 0);
  const wins = computed(() => props.data?.wins || 0);
  const winRatio = computed(
    () => ((props.data?.winRatio || 0) * 100).toFixed(1) || 0
  );
  const top10Ratio = computed(
    () => ((props.data?.top10Ratio || 0) * 100).toFixed(1) || 0
  );
  const avgRank = computed(() => (props.data?.avgRank || 0).toFixed(1));

  //Stat
  const kda = computed(() => (props.data?.kda || 0).toFixed(1));
  const kills = computed(() => props.data?.kills || 0);
  const assists = computed(() => props.data?.assists || 0);
  const deaths = computed(() => props.data?.deaths || 0);
  const dBNOs = computed(() => props.data?.dBNOs || 0);
  const damageDealt = computed(() => props.data?.damageDealt || 0);
</script>
<template>
  <el-card class="box-card">
    <el-divider> {{ mode }} </el-divider>
    <el-divider content-position="left">
      <el-tag type="success" effect="dark">티어</el-tag>
    </el-divider>
    <el-row :gutter="20">
      <el-col :span="5">현재</el-col>
      <el-col :span="15">
        {{ currentTier?.tier }}
        {{ currentTier?.subTier }} (RP:{{ currentRankPoint }})
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="5">최고</el-col>
      <el-col :span="15">
        {{ bestTier?.tier }}
        {{ bestTier?.subTier }} (RP:{{ bestRankPoint }})
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
</style>
