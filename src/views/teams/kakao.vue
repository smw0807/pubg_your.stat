<script setup lang="ts">
  import { computed, reactive } from 'vue';
  import { ITeamForm, ITeamFilter } from '@/interfaces';
  import { useTeamStore, useUserStore } from '@/store';
  // import { TeamAPI } from '@/apis';
  // import type { DocumentData } from 'firebase/firestore';

  //todo 열리고 닫히는거 프롭스로 바꾸기

  // 팀 만들기 컴포넌트
  import kakaoTeamDialog from '@/components/dialog/CreateTeam.vue';
  // 팀 리스트 카드
  import teamCard from '@/components/card/TeamInfo.vue';

  const teamStore = useTeamStore();
  const userStore = useUserStore();
  // const teamApi = new TeamAPI();

  //todo 필터 컾포넌트에서 넘기게 하기
  const filter: ITeamFilter = reactive({
    createdAt: 'desc',
    platform: 'kakao',
    mode: null,
    isRank: null,
  });

  // let teamList: DocumentData = [];

  (async () => {
    await teamStore.teamList(filter);
  })();

  // 현재 로그인 유저 정보 유무
  const hasUser = computed(() => userStore.hasUser);
  // 팀 만들기
  const createTeam = async (form: ITeamForm): Promise<void> => {
    const result = await teamStore.createTeam(form);
    //todo 결과 받은걸로 대화방 url로 이동시키기
  };

  //팀 리스트
  const list = computed(() => teamStore.getList);
</script>
<template>
  <div>
    <!-- 필터버튼, 방만들기 버튼 -->
    <el-row justify="end">
      <el-col align="end" :span="6">
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
