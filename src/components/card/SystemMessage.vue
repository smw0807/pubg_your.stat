<script setup lang="ts">
  import { withDefaults } from 'vue';

  interface Props {
    //메세지
    message: string;
    //메세지 시간
    time?: string;
    //글씨 정렬
    align?: 'start' | 'center' | 'end';
    //글씨 색
    textColor?: string;
    //컴포넌트 배경 색
    backgroundColor?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    message: '',
    time: '',
    align: 'start',
    textColor: ' #85ce61',
    backgroundColor: '#1c2518',
  });
  const cardStyles = {
    'text-align': props.align,
    color: props.textColor,
    'background-color': props.backgroundColor,
  };
</script>
<template>
  <el-card :body-style="cardStyles"> {{ message }} / {{ time }} </el-card>
</template>
<style scoped></style>
