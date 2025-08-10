<script setup lang="ts">
  /**
   * root 페이지에서 검색 시 여기로 옴
   * url에 platform과 nickname이 들어 있음
   * platform으로 해당 시즌 정보 가져옴
   * nickname으로 아이이디 검색 후 아이디로 현재 시즌 스탯 정보를 가져옴
   */
  import { ref, onMounted, computed } from 'vue';
  import type { Ref } from 'vue';
  import { ElLoading } from 'element-plus';
  import type { ISearchForm, IGameRankStats } from '@/types';
  import { rankStatData, player404, _429, notifError } from '@/utils';
  import { useSearchStore } from '@/store';

  //컴포넌트
  import nickNameCard from '@/components/card/NickName.vue';
  import rankStatCard from '@/components/card/RankStat.vue';
  // import statCard from '@/components/card/NormalStat.vue';

  const props = defineProps<{
    platform: string;
    nickname: string;
  }>();

  const store = useSearchStore();

  const params: ISearchForm = {
    platform: props.platform,
    nickname: props.nickname,
  };

  const activeName = ref('rank');

  // 파이어베이스 저장소에 마지막으로 업데이트한 날짜
  const lastUpdateDate = computed(() => store.getLastUpdateDate);

  // 랭크 스탯 데이터
  const duoData: Ref<IGameRankStats> = ref(rankStatData);
  const squadData: Ref<IGameRankStats> = ref(rankStatData);

  // 스탯 데이터 다시 가져오기(PUBG API에 재요청)
  const reloadStats = async (): Promise<void> => {
    const loading = ElLoading.service({
      lock: true,
      text: '잠시만 기다려주세요...',
      background: 'rgba(0, 0, 0, 0.7)',
    });
    try {
      await store.reloadStats(params);
      getStatData();
    } catch (err) {
      if (err === 404) player404();
      else if (err === 429) _429();
      else notifError('플레이어 조회 실패', err as string);
    }
    loading.close();
  };

  //스텟 데이터 가져오기
  const getStatData = async (): Promise<void> => {
    try {
      const result = await store.getStatsV2(params);
      if (result) {
        setStatData();
      }
    } catch (err) {
      if (err === 404) player404();
      else if (err === 429) _429();
      else notifError('플레이어 조회 실패', err as string);
    }
  };

  // 스탯 카드에 보여줄 데이터 세팅
  const setStatData = (): void => {
    duoData.value = store.duo;
    squadData.value = store.squad;
  };

  onMounted(async () => {
    await getStatData();
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

      <!--  랭크 스탯 카드 -->
      <el-tab-pane label="랭크" name="rank">
        <el-row :gutter="24" align="middle" justify="space-evenly">
          <el-col :span="12" :xs="24" :sm="24" :md="12">
            <rank-stat-card mode="duo" :data="duoData" />
          </el-col>
          <el-col :span="12" :xs="24" :sm="24" :md="12">
            <rank-stat-card mode="squad" :data="squadData" />
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
