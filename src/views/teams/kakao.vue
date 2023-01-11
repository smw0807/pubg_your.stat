<script setup lang="ts">
  import { ref } from 'vue';
  import type { Ref } from 'vue';
  import { ITeamForm } from '@/interfaces';
  import { useTeamStore } from '@/store';

  //todo 열리고 닫히는거 프롭스로 바꾸기

  // 팀 만들기 컴포넌트
  import kakaoTeamDialog from '@/components/dialog/CreateTeam.vue';

  const store = useTeamStore();

  // 팀 만들기
  const createTeam = async (form: ITeamForm): Promise<void> => {
    await store.createTeam(form);
    //todo 결과 받아서 다이얼로그 닫게 하기?
  };
</script>
<template>
  <div>
    <!-- 필터버튼, 방만들기 버튼 -->
    <el-row justify="end">
      <el-col align="end" :span="6">
        <kakaoTeamDialog platform="kakao" @input-data="createTeam" />
      </el-col>
    </el-row>
    <!-- 방 리스트 -->
  </div>
</template>
<style scoped></style>
