<script setup lang="ts">
  import { computed } from 'vue';
  import { ITeamForm } from '@/interfaces';
  import { useTeamStore, useUserStore } from '@/store';

  //todo 열리고 닫히는거 프롭스로 바꾸기

  // 팀 만들기 컴포넌트
  import kakaoTeamDialog from '@/components/dialog/CreateTeam.vue';

  const teamStore = useTeamStore();
  const userStore = useUserStore();

  const hasUser = computed(() => userStore.hasUser);
  // 팀 만들기
  const createTeam = async (form: ITeamForm): Promise<void> => {
    const result = await teamStore.createTeam(form);
    console.log(result);
    //todo 결과 받은걸로 대화방 url로 이동시키기
  };
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
  </div>
</template>
<style scoped></style>
