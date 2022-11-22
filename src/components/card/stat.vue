<script setup lang="ts">
  /**
   * 이 컴포넌트 만들면서 참고한 사이트들
   * https://vuejs.org/guide/typescript/composition-api.html
   * https://element-plus.org/en-US/component/divider.html
   * https://element-plus.org/en-US/component/empty.html#basic-usage
   * https://element-plus.org/en-US/component/descriptions.html#descriptions-attributes
   */
  import { defineProps, ref, computed } from 'vue';
  import type { Ref } from 'vue';
  import { IGameStats } from '@/interfaces';
  import { useSearchStore } from '@/store/search';
  import { insertComma } from '@/utils';
  //icon
  import { Warning } from '@element-plus/icons-vue';

  const store = useSearchStore();

  interface Props {
    data: IGameStats;
    mode?: string; //solo, duo, squad
    solo?: boolean;
    duo?: boolean;
    squad?: boolean;
    tpp?: boolean; //3인칭
    fpp?: boolean; //1인칭
  }
  const props = defineProps<Props>();
  console.log(props);

  // 데이터 존재 유무
  let hasNoData = computed(() =>
    props.data.roundsPlayed === 0 ? true : false
  );

  const modeName = (): string => {
    let result = '';
    if (props.tpp) {
      result += '3인칭 ';
    } else if (props.fpp) {
      result += '1인칭 ';
    }
    if (props.solo) {
      result += '솔로';
    } else if (props.duo) {
      result += '듀오';
    } else if (props.squad) {
      result += '스쿼드';
    }
    return result;
  };
  const mode: Ref<string> = ref(modeName());

  //게임
  const wins = computed(() => props.data?.wins || 0);
  const losses = computed(() => props.data?.losses || 0);
  const top10s = computed(() => props.data?.top10s || 0);
  const roundsPlayed = computed(() => props.data?.roundsPlayed || 0);

  //스탯 & 킬
  const kills = computed(() => props.data?.kills || 0);
  const assists = computed(() => props.data?.assists || 0);
  const dBNOs = computed(() => props.data?.dBNOs || 0);
  const damageDealt = computed(() => (props.data?.damageDealt || 0).toFixed(0));

  const revives = computed(() => props.data?.revives || 0);
  const suicides = computed(() => props.data?.suicides || 0);
  const teamKills = computed(() => props.data?.teamKills || 0);

  const roadKills = computed(() => props.data?.roadKills || 0);
  const headshotKills = computed(() => props.data?.headshotKills || 0);
  const longestKill = computed(
    () => (props.data?.longestKill || 0).toFixed(1) + 'm'
  );
  const maxKillStreaks = computed(() => props.data?.maxKillStreaks || 0);
  const roundMostKills = computed(() => props.data?.roundMostKills || 0);

  //이동거리
  const walkDistance = computed(
    () => (props.data?.walkDistance || 0).toFixed(1) + 'm'
  );
  const rideDistance = computed(
    () => (props.data?.rideDistance || 0).toFixed(1) + 'm'
  );
  const swimDistance = computed(
    () => (props.data?.swimDistance || 0).toFixed(1) + 'm'
  );

  //아이템
  const heals = computed(() => props.data?.heals || 0);
  const boosts = computed(() => props.data?.boosts || 0);
  const weaponsAcquired = computed(() => props.data?.weaponsAcquired || 0);

  //생존
  //가장 오래 생존한 시간
  const longestTimeSurvived = computed(
    () => (props.data?.longestTimeSurvived || 0) + '분'
  );
  //한 경기에서 오래 살아 남은 시간
  // const mostSurvivalTime = computed(
  //   () => (props.data?.mostSurvivalTime || 0) + '분'
  // );
  //총 생존 시간
  const timeSurvived = computed(() => (props.data?.timeSurvived || 0) + '분');

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
          {{ ((wins / roundsPlayed) * 100).toFixed(1) }}%
        </el-descriptions-item>
        <el-descriptions-item
          label="탑10률"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ ((top10s / roundsPlayed) * 100).toFixed(1) }}%
        </el-descriptions-item>
      </el-descriptions>

      <!-- <el-divider content-position="left">
        <span :style="`font-size: var(--el-font-size-large)`">
          데일리
          <el-tooltip>
            <template #content>
              가장 최근 플레이한 날의 승리 수와 킬 수
            </template>
            <el-icon class="title-in-tooltip"><Warning /></el-icon>
          </el-tooltip>
        </span>
      </el-divider>
      <el-descriptions :column="2" border>
        <el-descriptions-item
          label="승"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ dailyWins }}
        </el-descriptions-item>
        <el-descriptions-item
          label="킬"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ dailyKills }}
        </el-descriptions-item>
      </el-descriptions> -->
      <!-- <el-divider content-position="left">
        <span :style="`font-size: var(--el-font-size-large)`">
          위클리
          <el-tooltip>
            <template #content>
              가장 최근 플레이한 주의 승리 수와 킬 수
            </template>
            <el-icon class="title-in-tooltip"><Warning /></el-icon>
          </el-tooltip>
        </span>
      </el-divider>
      <el-descriptions :column="2" border>
        <el-descriptions-item
          label="승"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ weeklyWins }}
        </el-descriptions-item>
        <el-descriptions-item
          label="킬"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ weeklyKills }}
        </el-descriptions-item>
      </el-descriptions> -->

      <el-divider content-position="left">
        <span :style="`font-size: var(--el-font-size-medium)`"> 스탯 </span>
      </el-divider>
      <el-descriptions :column="2" border>
        <el-descriptions-item
          label="킬"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ kills }}
        </el-descriptions-item>
        <el-descriptions-item
          label="어시"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ assists }}
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
      <el-descriptions :column="3" border>
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
            <template #content>
              고의 뿐만 아니라 실수로 인한 팀킬도 모두 포함입니다.
            </template>
            <el-icon><Warning /></el-icon>
          </el-tooltip>
        </el-descriptions-item>
      </el-descriptions>
      <br />
      <el-descriptions :column="2" border>
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
          label="헤드샷킬"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ headshotKills }}
        </el-descriptions-item>
        <el-descriptions-item
          label="최장거리킬"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ insertComma(longestKill) }}
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
      </el-descriptions>
      <el-divider content-position="left">
        <span :style="`font-size: var(--el-font-size-medium)`"> 생존 </span>
      </el-divider>
      <el-descriptions :column="1" border>
        <el-descriptions-item
          label="총 생존 시간"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ timeSurvived }}
        </el-descriptions-item>
        <el-descriptions-item
          label="가장 오래 생존한 시간"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ longestTimeSurvived }}
        </el-descriptions-item>
        <!-- <el-descriptions-item
          label="한 경기에서 오래 살아남은 시간"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ mostSurvivalTime }}
        </el-descriptions-item> -->
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
        >
          {{ insertComma(vehicleDestroys) }}
        </el-descriptions-item>
        <!-- <el-descriptions-item
          label="???"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ insertComma(days) }}
        </el-descriptions-item> -->
      </el-descriptions>

      <el-divider content-position="left">
        <span :style="`font-size: var(--el-font-size-medium)`">
          아이템 사용
        </span>
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
          {{ insertComma(walkDistance) }}
        </el-descriptions-item>
        <el-descriptions-item
          label="탈것"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ insertComma(rideDistance) }}
        </el-descriptions-item>
        <el-descriptions-item
          label="수영"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ insertComma(swimDistance) }}
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
