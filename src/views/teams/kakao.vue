<script setup lang="ts">
  import { ref } from 'vue';
  import type { Ref } from 'vue';
  import { ITeamForm } from '@/interfaces';

  // 팀 만들기 컴포넌트
  import kakaoTeamDialog from '@/components/dialog/CreateTeam.vue';

  // 팀 만들기
  const createTeam = (form: ITeamForm) => {
    console.log(form);
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
