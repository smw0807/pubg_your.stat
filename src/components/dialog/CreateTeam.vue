<script setup lang="ts">
  /**
   * 팀 만들기 다이얼로그
   * 입력할 정보
   * 1. 방제목 (input)
   * 2. 일반, 랭크 (radio)
   * 3. 모드 (radio)
   * ## 인원수는 모드에 맞춰 자동 설정
   */
  import { reactive, defineProps, defineEmits } from 'vue';
  import { ModeType } from '@/interfaces';

  type TeamParams = {
    title: string;
    isRank: boolean;
    mode: ModeType;
  };
  const params: TeamParams = reactive({
    title: '',
    isRank: false,
    mode: 'solo',
  });
</script>
<template></template>
<style scoped></style>
