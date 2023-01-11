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
  import { normalStat, rankStat, normalStatData, rankStatData, getPlayerStats } from '@/utils';
  import { useSearchStore } from '@/store';

  //컴포넌트
  import nickNameCard from '@/components/card/NickName.vue';
  import rankStatCard from '@/components/card/RankStat.vue';
  import statCard from '@/components/card/NormalStat.vue';

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

  // 스탯 데이터 다시 가져오기(PUBG API에 재요청)
  const reloadStats = async (): Promise<void> => {
    const loading = ElLoading.service({
      lock: true,
      text: '잠시만 기다려주세요...',
      background: 'rgba(0, 0, 0, 0.7)',
    });
    await store.reloadStats(params);
    getStatData();
    isReload.value = false;
    loading.close();
  };

  // store에서 데이터 가져오기
  const getStatData = (): void => {
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
  };

  onMounted(async () => {
    if (isReload.value === true) {
      const loading = ElLoading.service({
        lock: true,
        text: '잠시만 기다려주세요...',
        background: 'rgba(0, 0, 0, 0.7)',
      });

      await getPlayerStats(params);

      isReload.value = false;
      loading.close();
    }
    getStatData();
  });
</script>

<template>
  <div class="main">
    <el-tabs v-model="activeName" class="demo-tabs" type="border-card">
      <el-row>
        <el-col>
          <nick-name-card
            :platform="params.platform"
            :nickname="params.nickname"
            :updatedate="lastUpdateDate"
            @reload="reloadStats"
          />
        </el-col>
      </el-row>

      <!-- 3인칭 솔로, 스쿼드, 1인칭 솔로, 스쿼드 랭크 스탯 카드 -->
      <el-tab-pane label="랭크" name="rank">
        <el-row :gutter="24" align="middle" justify="space-evenly">
          <el-col :span="12" :xs="24" :sm="24" :md="12">
            <rank-stat-card mode="solo" :data="tppRankSolo" />
          </el-col>
          <el-col :span="12" :xs="24" :sm="24" :md="12">
            <rank-stat-card mode="squad" :data="tppRankSquad" />
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="1인칭 랭크" name="fpp-rank" v-if="hasFPP">
        <el-row :gutter="24" align="middle" justify="space-evenly">
          <el-col :span="12" :xs="24" :sm="24" :md="12">
            <rank-stat-card mode="solo-fpp" :data="fppRankSolo" />
          </el-col>
          <el-col :span="12" :xs="24" :sm="24" :md="12">
            <rank-stat-card mode="squad-fpp" :data="fppRankSquad" />
          </el-col>
        </el-row>
      </el-tab-pane>

      <!-- 3인칭 솔로, 듀오, 스쿼드, 1인칭 솔로, 듀오, 스쿼드 일반 스탯 카드 -->
      <el-tab-pane label="솔로" name="solo">
        <el-row :gutter="24">
          <el-col>
            <stat-card mode="solo" :data="tppSolo" />
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="듀오" name="duo">
        <el-row :gutter="24">
          <el-col>
            <stat-card mode="duo" :data="tppDuo" />
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="스쿼드" name="squad">
        <el-row :gutter="24">
          <el-col>
            <stat-card mode="squad" :data="tppSquad" />
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="1인칭 솔로" name="solo-fpp" v-if="hasFPP">
        <el-row :gutter="24">
          <el-col>
            <stat-card mode="squad" :data="fppSolo" />
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="1인칭 듀오" name="duo-fpp" v-if="hasFPP">
        <el-row :gutter="24">
          <el-col>
            <stat-card mode="squad" :data="fppDuo" />
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="1인칭 스쿼드" name="squad-fpp" v-if="hasFPP">
        <el-row :gutter="24">
          <el-col>
            <stat-card mode="squad" :data="fppSquad" />
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
