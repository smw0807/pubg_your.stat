<script setup lang="ts">
  import { ref } from 'vue';
  import type { Ref } from 'vue';

  // 팀 만들기 컴포넌트
  import kakaoTeamDialog from '@/components/dialog/CreateTeam.vue';
</script>
<template>
  <div>
    <el-row>
      <el-col :span="6">
        <kakaoTeamDialog platform="steam" />
      </el-col>
    </el-row>
    <!-- 필터버튼, 방만들기 버튼 -->
    hihi
    <!-- 방 리스트 -->
  </div>
</template>
<style scoped></style>
