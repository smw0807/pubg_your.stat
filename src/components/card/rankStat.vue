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
  import { IGameRankStats } from '@/interfaces';
  import { useSearchStore } from '@/store/search';
  import { insertComma } from '@/utils';
  //icon
  import { Warning } from '@element-plus/icons-vue';

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
  console.log(props);

  // 데이터 존재 유무
  let hasNoData = computed(() => (props.data === undefined ? true : false));

  const modeName = (): string => {
    let result = '';
    if (props.tpp) {
      result += '3인칭 ';
    } else if (props.fpp) {
      result += '1인칭 ';
    }
    if (props.solo) {
      result += '솔로';
    } else if (props.squad) {
      result += '스쿼드';
    }
    return result;
  };
  const mode: Ref<string> = ref(modeName());

  // TIer
  const currentTier = computed(() => props.data?.currentTier || '-');
  const currentRankPoint = computed(() => props.data?.currentRankPoint || 0);
  const bestTier = computed(() => props.data?.bestTier || '-');
  const bestRankPoint = computed(() => props.data?.bestRankPoint || 0);

  //Game
  const roundsPlayed = computed(() => (props.data?.roundsPlayed || 0) + '회');
  const wins = computed(() => (props.data?.wins || 0) + '번');
  const winRatio = computed(
    () => (((props.data?.winRatio || 0) * 100).toFixed(1) || 0) + '%'
  );
  const top10Ratio = computed(
    () => (((props.data?.top10Ratio || 0) * 100).toFixed(1) || 0) + '%'
  );
  const avgRank = computed(() => (props.data?.avgRank || 0).toFixed(1) + '등');

  //Stat
  const kda = computed(() => (props.data?.kda || 0).toFixed(1));
  const kills = computed(() => props.data?.kills || 0);
  const assists = computed(() => props.data?.assists || 0);
  const deaths = computed(() => props.data?.deaths || 0);
  const dBNOs = computed(() => props.data?.dBNOs || 0);
  const damageDealt = computed(() => (props.data?.damageDealt || 0).toFixed(0));
</script>
<template>
  <el-card class="box-card">
    <el-divider>
      <span :style="`font-size: var(--el-font-size-extra-large)`">
        {{ mode }}
      </span>
    </el-divider>
    <div v-if="hasNoData">
      <el-empty :image-size="270" description="게임 기록이 없습니다." />
    </div>

    <div v-else>
      <el-divider content-position="left">
        <span :style="`font-size: var(--el-font-size-large)`"> 티어 </span>
      </el-divider>
      <el-descriptions :column="1" border>
        <el-descriptions-item
          label="현재"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
          width="30px"
        >
          {{ currentTier?.tier }}
          {{ currentTier?.subTier }} (RP:{{ currentRankPoint }})
        </el-descriptions-item>
        <el-descriptions-item
          label="최고"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
          width="30px"
        >
          {{ bestTier?.tier }}
          {{ bestTier?.subTier }} (RP:{{ bestRankPoint }})
        </el-descriptions-item>
      </el-descriptions>

      <el-divider content-position="left">
        <span :style="`font-size: var(--el-font-size-large)`"> 게임 </span>
      </el-divider>
      <el-descriptions :column="1" border>
        <el-descriptions-item
          label="총게임"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
          width="40px"
        >
          {{ roundsPlayed }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="2" border>
        <el-descriptions-item
          label="치킨"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
          width="60px"
        >
          {{ wins }}
        </el-descriptions-item>
        <el-descriptions-item
          label="승률"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ winRatio }}
        </el-descriptions-item>
        <el-descriptions-item
          label="탑10"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
          width="60px"
        >
          {{ top10Ratio }}
        </el-descriptions-item>
        <el-descriptions-item
          label="평균 등수"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
          width="60px"
        >
          {{ avgRank }}
        </el-descriptions-item>
      </el-descriptions>

      <el-divider content-position="left">
        <span :style="`font-size: var(--el-font-size-large)`"> 스탯 </span>
      </el-divider>
      <el-descriptions :column="1" border>
        <el-descriptions-item
          label="KDA"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
        >
          {{ kda }}
          ( K:{{ insertComma(kills) }} / D:{{ insertComma(deaths) }} / A:{{
            insertComma(assists)
          }})
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="2" border>
        <el-descriptions-item
          label="기절시킴"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
          width="45px"
        >
          {{ insertComma(dBNOs) }}
        </el-descriptions-item>
        <el-descriptions-item
          label="누적딜량"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
          width="40px"
        >
          {{ insertComma(damageDealt) }}
          <el-tooltip>
            <template #content>
              순수 적에게 가한 데미지만 포함된 수치입니다.<br />
              자기 자신한테 가한 피해는 제외합니다.<br />
              (예: 수류탄으로 인한 자해, 차량에서 뛰어내려 받은 딜 등)
            </template>
            <el-icon><Warning /></el-icon>
          </el-tooltip>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-card>
</template>
<style scope>
  .my-label {
    background: var(--el-color-success-light-9);
  }
  /* .my-content {
    background: var(--el-color-danger-light-9);
  } */
</style>
