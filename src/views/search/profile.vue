<script setup lang="ts">
  /**
   * root 페이지에서 검색 시 여기로 옴
   * url에 platform과 nickname이 들어 있음
   * platform으로 해당 시즌 정보 가져옴
   * nickname으로 아이이디 검색 후 아이디로 현재 시즌 스탯 정보를 가져옴
   */
  import { ref, onMounted, computed } from 'vue';
  import type { Ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { ElLoading } from 'element-plus';
  import type { ISearchForm, IGameRankStats, IGameStats } from '@/interfaces';
  import { normalStat, rankStat, normalStatData, rankStatData, getStats } from '@/utils';
  import { useSearchStore } from '@/store';

  //컴포넌트
  import rankStatCard from '@/components/card/RankStat.vue';
  import statCard from '@/components/card/Stat.vue';

  const route = useRoute();
  const store = useSearchStore();

  let isReload: Ref<boolean> = ref(false);

  if (Object.keys(store.rank).length === 0 && Object.keys(store.normal).length === 0) {
    isReload.value = true;
  }

  const params: ISearchForm = {
    platform: route.params.platform as string,
    nickname: route.params.nickname as string,
  };

  const activeName = ref('rank');

  // 파이어베이스 저장소에 마지막으로 업데이트한 날짜
  const lastUpdateDate = computed(() => store.lastUpdateDate);

  // 1인칭 모드 유무
  const hasFPP: boolean = params.platform === 'kakao' ? false : true;

  // 3인칭 랭크 데이터
  let tppRankSolo: Ref<IGameRankStats> = ref(rankStatData);
  let tppRankSquad: Ref<IGameRankStats> = ref(rankStatData);
  // 1인칭 랭크 데이터
  let fppRankSolo: Ref<IGameRankStats> = ref(rankStatData);
  let fppRankSquad: Ref<IGameRankStats> = ref(rankStatData);
  // 3인칭 일반 데이터
  let tppSolo: Ref<IGameStats> = ref(normalStatData);
  let tppDuo: Ref<IGameStats> = ref(normalStatData);
  let tppSquad: Ref<IGameStats> = ref(normalStatData);
  // 1인칭 일반 데이터
  let fppSolo: Ref<IGameStats> = ref(normalStatData);
  let fppDuo: Ref<IGameStats> = ref(normalStatData);
  let fppSquad: Ref<IGameStats> = ref(normalStatData);

  const reloadStats = async (): Promise<void> => {
    console.log('hi');
    const loading = ElLoading.service({
      lock: true,
      text: '잠시만 기다려주세요...',
      background: 'rgba(0, 0, 0, 0.7)',
    });
    await store.reloadStats(params);
    isReload.value = false;
    loading.close();
  };

  onMounted(async () => {
    if (isReload.value === true) {
      const loading = ElLoading.service({
        lock: true,
        text: '잠시만 기다려주세요...',
        background: 'rgba(0, 0, 0, 0.7)',
      });

      await getStats(params);

      isReload.value = false;
      loading.close();
    }

    tppRankSolo.value = rankStat('solo');
    tppRankSquad.value = rankStat('squad');

    tppSolo.value = normalStat('solo');
    tppDuo.value = normalStat('duo');
    tppSquad.value = normalStat('squad');

    if (hasFPP) {
      fppRankSolo.value = rankStat('solo-fpp');
      fppRankSquad.value = rankStat('squad-fpp');

      fppSolo.value = normalStat('solo-fpp');
      fppDuo.value = normalStat('duo-fpp');
      fppSquad.value = normalStat('squad-fpp');
    }
  });
</script>

<template>
  <div class="main">
    <el-row>
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px">
            <span>{{ params.nickname }}</span>
            <div class="bottom">
              <time class="time">최근 업데이트 : {{ lastUpdateDate }}</time>
              <el-button class="button" @click="reloadStats">갱신하기</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" class="demo-tabs">
      <!-- 3인칭 솔로, 스쿼드, 1인칭 솔로, 스쿼드 랭크 스탯 카드 -->
      <el-tab-pane label="랭크" name="rank">
        <el-row :gutter="24" align="middle" justify="space-evenly">
          <el-col :span="12" :sm="24" :md="12">
            <rank-stat-card solo tpp :data="tppRankSolo" />
            <!-- <rank-stat-card solo tpp :data="testData.squad" /> -->
          </el-col>
          <el-col :span="12" :sm="24" :md="12">
            <rank-stat-card squad tpp :data="tppRankSquad" />
            <!-- <rank-stat-card squad tpp :data="testData.squad" /> -->
          </el-col>
        </el-row>

        <el-row v-if="hasFPP" :gutter="24" align="middle" justify="space-evenly">
          <el-col :span="12" :sm="24" :md="12">
            <rank-stat-card solo fpp :data="fppRankSolo" />
          </el-col>
          <el-col :span="12" :sm="24" :md="12">
            <rank-stat-card squad fpp :data="fppRankSquad" />
          </el-col>
        </el-row>
      </el-tab-pane>

      <!-- 3인칭 솔로, 듀오, 스쿼드, 1인칭 솔로, 듀오, 스쿼드 일반 스탯 카드 -->
      <el-tab-pane label="일반" name="normal">
        <el-row :gutter="24" justify="space-between">
          <el-col :span="24">
            <stat-card solo tpp :data="tppSolo" />
          </el-col>
          <el-col :span="24">
            <stat-card duo tpp :data="tppDuo" />
          </el-col>
          <el-col :span="24">
            <stat-card squad tpp :data="tppSquad" />
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
  .el-row {
    margin-bottom: 10px;
  }
  .el-col {
    margin-bottom: 10px;
  }
  .time {
    font-size: 12px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .button {
    padding: 0;
    min-height: auto;
  }
</style>
