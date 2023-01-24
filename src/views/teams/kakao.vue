<script setup lang="ts">
  import { computed, reactive } from 'vue';
  import { Refresh } from '@element-plus/icons-vue';
  import { ITeamForm, ITeamFilter } from '@/interfaces';
  import { useTeamStore, useUserStore } from '@/store';

  // 팀 리스트 필터 컴포넌트
  import teamFilter from '@/components/dialog/ListFilter.vue';
  // 팀 만들기 컴포넌트
  import kakaoTeamDialog from '@/components/dialog/CreateTeam.vue';
  // 팀 리스트 카드 컴포넌트
  import teamCard from '@/components/card/TeamInfo.vue';

  const teamStore = useTeamStore();
  const userStore = useUserStore();

  //todo 필터 컾포넌트에서 넘기게 하기
  const filter: ITeamFilter = reactive({
    orderBy: 'desc',
    platform: 'kakao',
    mode: null,
    isRank: null,
  });

  (async () => {
    // 팀 리스트 가져오기
    await teamStore.teamList(filter);
  })();
  // 팀 리스트
  const list = computed(() => teamStore.getList);

  // 현재 로그인 유저 정보 유무
  const hasUser = computed(() => userStore.hasUser);

  // 팀 만들기
  const createTeam = async (form: ITeamForm): Promise<void> => {
    const result = await teamStore.createTeam(form);
    //todo 결과 받은걸로 대화방 url로 이동시키기
    await teamStore.teamList(filter);
  };

  // 필터값으로 팀 리스트 다시 부르기
  const filterTeam = (data: ITeamFilter) => {
    //todo 필터 처리 로직 만들고 리스트 불러오게 하기
    console.log(data);
  };

  // 팀 리스트 다시 불러오기
  const refresh = async (): Promise<void> => {
    await teamStore.teamList(filter);
  };
</script>
<template>
  <div>
    <!-- 필터버튼, 방만들기 버튼 -->
    <el-row justify="end">
      <el-col align="end" :span="6">
        <el-button @click="refresh">
          <el-icon><Refresh /></el-icon>
        </el-button>
        <teamFilter platform="kakao" @select-data="filterTeam" />
        <kakaoTeamDialog :disabled="!hasUser" platform="kakao" @input-data="createTeam" />
      </el-col>
    </el-row>
    <!-- 방 리스트 -->
    <el-row>
      <el-col :xl="3" :lg="6" :md="8" :sm="12" v-for="info in list">
        <teamCard :info="info" />
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
  .el-row {
    margin-bottom: 10px;
  }
  .el-col {
    margin-bottom: 10px;
    /* margin: 5px; */
  }
</style>
