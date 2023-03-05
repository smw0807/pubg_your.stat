<script setup lang="ts">
  /**
   * 이 컴포넌트 만들면서 참고한 사이트들
   * https://vuejs.org/guide/typescript/composition-api.html
   * https://element-plus.org/en-US/component/divider.html
   * https://element-plus.org/en-US/component/empty.html#basic-usage
   * https://element-plus.org/en-US/component/descriptions.html#descriptions-attributes
   */
  import { ref, computed } from 'vue';
  import type { Ref } from 'vue';
  import { IGameStats, ModeType } from '@/interfaces';
  import { insertComma, changeSeconds, meterToKm, gameModeName } from '@/utils';
  //icon
  import { Warning } from '@element-plus/icons-vue';

  //fpp 붙으면 1인칭
  interface Props {
    data: IGameStats;
    mode: ModeType;
  }
  const props = defineProps<Props>();

  // 데이터 존재 유무
  let hasNoData = computed(() => (props.data.roundsPlayed === 0 ? true : false));

  const mode: Ref<string> = ref(gameModeName(props.mode));

  //게임
  const wins = computed(() => props.data?.wins || 0);
  const losses = computed(() => props.data?.losses || 0);
  const top10s = computed(() => props.data?.top10s || 0);
  const roundsPlayed = computed(() => props.data?.roundsPlayed || 0);
  const winsRatio = computed(() => ((wins.value / roundsPlayed.value) * 100).toFixed(1));
  const top10Ratio = computed(() => ((top10s.value / roundsPlayed.value) * 100).toFixed(1));

  //스탯 & 킬
  const kda = 0;
  const kd = 0;
  const avgDamage = computed(() => {
    let avg = (props.data?.damageDealt || 0) / (props.data?.roundsPlayed || 0);
    if (isNaN(avg)) avg = 0;
    return avg.toFixed(0);
  });
  const kills = computed(() => props.data?.kills || 0);
  const deaths = 0;
  const assists = computed(() => props.data?.assists || 0);
  const headshotKills = computed(() => props.data?.headshotKills || 0);
  const headshotRatio = computed(() => {
    const headshot = props.data?.headshotKills || 0;
    const kill = props.data?.kills || 0;
    let ratio = (headshot / kill) * 100;
    if (isNaN(ratio)) ratio = 0;
    return ratio.toFixed(1);
  });
  const dBNOs = computed(() => props.data?.dBNOs || 0);
  const longestKill = computed(() => Number((props.data?.longestKill || 0).toFixed(1)));
  const maxKillStreaks = computed(() => props.data?.maxKillStreaks || 0);
  const roundMostKills = computed(() => props.data?.roundMostKills || 0);
  const damageDealt = computed(() => Number((props.data?.damageDealt || 0).toFixed(0)));

  const revives = computed(() => props.data?.revives || 0);
  const roadKills = computed(() => props.data?.roadKills || 0);
  const suicides = computed(() => props.data?.suicides || 0);
  const teamKills = computed(() => props.data?.teamKills || 0);

  //이동거리
  const walkDistance = computed(() => Number((props.data?.walkDistance || 0).toFixed(1)));
  const rideDistance = computed(() => Number((props.data?.rideDistance || 0).toFixed(1)));
  const swimDistance = computed(() => Number((props.data?.swimDistance || 0).toFixed(1)));

  //아이템
  const heals = computed(() => props.data?.heals || 0);
  const boosts = computed(() => props.data?.boosts || 0);
  const weaponsAcquired = computed(() => props.data?.weaponsAcquired || 0);

  //생존
  //가장 오래 생존한 시간
  const longestTimeSurvived = computed(() => props.data?.longestTimeSurvived || 0);
  //한 경기에서 오래 살아 남은 시간
  // const mostSurvivalTime = computed(
  //   () => (props.data?.mostSurvivalTime || 0) + '분'
  // );
  //총 생존 시간
  const timeSurvived = computed(() => props.data?.timeSurvived || 0);

  //! 데일리 위클리는 화면에 보여줄지 말지 고민해보기...
  //데일리
  const dailyKills = computed(() => props.data?.dailyKills || 0);
  const dailyWins = computed(() => props.data?.dailyWins || 0);
  //??? 뭔지 모르겠는 값, 공식문서에도 제대로된 설명이 작성되어 있지 않음...
  // const days = computed(() => props.data?.days || 0);

  //위클리
  const weeklyKills = computed(() => props.data?.weeklyKills || 0);
  const weeklyWins = computed(() => props.data?.weeklyWins || 0);

  //파괴
  const vehicleDestroys = computed(() => props.data?.vehicleDestroys || 0);
</script>
<template>
  <el-card class="box-card">
    <el-divider>
      <span :style="`font-size: var(--el-font-size-large)`">
        {{ mode }}
      </span>
    </el-divider>
    <div v-if="hasNoData">
      <el-empty :image-size="270" description="게임 기록이 없습니다." />
    </div>

    <div v-else>
      <el-divider content-position="left">
        <span :style="`font-size: var(--el-font-size-medium)`"> 게임 </span>
      </el-divider>
      <el-descriptions :column="3" border>
        <el-descriptions-item
          label="승"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ wins }}
        </el-descriptions-item>
        <el-descriptions-item
          label="패"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ losses }}
        </el-descriptions-item>
        <el-descriptions-item
          label="탑10"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ top10s }}
        </el-descriptions-item>
        <el-descriptions-item
          label="총플레이"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ roundsPlayed }}
        </el-descriptions-item>
        <el-descriptions-item
          label="승률"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ winsRatio }}%
        </el-descriptions-item>
        <el-descriptions-item
          label="탑10률"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ top10Ratio }}%
        </el-descriptions-item>
      </el-descriptions>

      <el-divider content-position="left">
        <span :style="`font-size: var(--el-font-size-medium)`"> 스탯 </span>
      </el-divider>
      <el-descriptions :column="3" border>
        <el-descriptions-item
          label="KDA"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ kda }}
        </el-descriptions-item>
        <el-descriptions-item
          label="KD"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ kd }}
        </el-descriptions-item>
        <el-descriptions-item
          label="평균딜량"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ avgDamage }}
        </el-descriptions-item>
        <el-descriptions-item
          label="킬"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ insertComma(kills) }}
        </el-descriptions-item>
        <el-descriptions-item
          label="데스"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ insertComma(deaths) }}
        </el-descriptions-item>
        <el-descriptions-item
          label="어시스트"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ insertComma(assists) }}
        </el-descriptions-item>
        <el-descriptions-item
          label="헤드샷킬"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ headshotKills }}
        </el-descriptions-item>
        <el-descriptions-item
          label="헤드샷비율"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ headshotRatio }}%
        </el-descriptions-item>
        <el-descriptions-item
          label="적기절"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ dBNOs }}
        </el-descriptions-item>
        <el-descriptions-item
          label="최장거리킬"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ meterToKm(longestKill) }}
        </el-descriptions-item>
        <el-descriptions-item
          label="최대연속킬"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ maxKillStreaks }}
        </el-descriptions-item>
        <el-descriptions-item
          label="최대킬"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ roundMostKills }}
        </el-descriptions-item>
        <el-descriptions-item
          label="누적딜량"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ insertComma(damageDealt) }}
        </el-descriptions-item>
      </el-descriptions>
      <br />
      <!-- <el-descriptions :column="3" border>
      </el-descriptions>
      <br /> -->
      <el-descriptions :column="4" border>
        <el-descriptions-item
          label="팀원살림"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ revives }}
        </el-descriptions-item>
        <el-descriptions-item
          label="로드킬"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ roadKills }}
        </el-descriptions-item>
        <el-descriptions-item
          label="자살"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ suicides }}
        </el-descriptions-item>
        <el-descriptions-item
          label="팀킬"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ teamKills }}
          <el-tooltip>
            <template #content> 고의 뿐만 아니라 실수로 인한 팀킬도 모두 포함입니다. </template>
            <el-icon><Warning /></el-icon>
          </el-tooltip>
        </el-descriptions-item>
      </el-descriptions>
      <el-divider content-position="left">
        <span :style="`font-size: var(--el-font-size-medium)`"> 생존 </span>
      </el-divider>
      <el-descriptions :column="2" border>
        <el-descriptions-item
          label="총 생존 시간"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ changeSeconds(timeSurvived) }}
        </el-descriptions-item>
        <el-descriptions-item
          label="가장 오래 생존한 시간"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ changeSeconds(longestTimeSurvived) }}
        </el-descriptions-item>
      </el-descriptions>

      <el-divider content-position="left">
        <span :style="`font-size: var(--el-font-size-medium)`"> 파괴 </span>
      </el-divider>
      <el-descriptions :column="1" border>
        <el-descriptions-item
          label="차량 파괴 수"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
          width="100px"
        >
          {{ insertComma(vehicleDestroys) }}
        </el-descriptions-item>
      </el-descriptions>

      <el-divider content-position="left">
        <span :style="`font-size: var(--el-font-size-medium)`"> 아이템 사용 </span>
      </el-divider>
      <el-descriptions :column="3" border>
        <el-descriptions-item
          label="치유"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ insertComma(heals) }}
        </el-descriptions-item>
        <el-descriptions-item
          label="부스트"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ insertComma(boosts) }}
        </el-descriptions-item>
        <el-descriptions-item
          label="습득 무기"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ insertComma(weaponsAcquired) }}
        </el-descriptions-item>
      </el-descriptions>

      <el-divider content-position="left">
        <span :style="`font-size: var(--el-font-size-medium)`"> 이동거리 </span>
      </el-divider>
      <el-descriptions :column="3" border>
        <el-descriptions-item
          label="걷기"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ meterToKm(walkDistance) }}
        </el-descriptions-item>
        <el-descriptions-item
          label="탈것"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ meterToKm(rideDistance) }}
        </el-descriptions-item>
        <el-descriptions-item
          label="수영"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ meterToKm(swimDistance) }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-card>
</template>
<style scope>
  .my-label {
    background: var(--el-color-success-light-9);
  }
  .title-in-tooltip {
    position: absolute;
    top: 1px;
    left: 70px;
  }
  /* .my-content {
    background: var(--el-color-danger-light-9);
  } */
</style>
