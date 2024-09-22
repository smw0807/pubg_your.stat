<script setup lang="ts">
  import { dateFormat } from '@/utils';

  interface Props {
    //메세지 타입
    type: 'mine' | 'other';
    nickname: string;
    //메세지 전송 시간
    time: string;
    message: string;
    //글씨 색
    textColor?: string;
    //컴포넌트 배경 색
    backgroundColor?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    type: 'mine',
    nickname: '',
    time: '',
    message: '',
    textColor: '#E5EAF3',
    backgroundColor: '#1D1E1F',
  });
</script>
<template>
  <div :class="props.type === 'mine' ? 'myChat' : 'otherChat'">
    <div class="chatBox">
      <div class="chatTime">{{ nickname }} <br />{{ dateFormat(props.time, 'HH:mm:ss') }}</div>
      <div>{{ props.message }}</div>
    </div>
  </div>
</template>
<style scoped>
  .chatBox {
    display: inline-block;
    position: relative;
    background-color: #8b66f1;
    border-radius: 20px;
    color: #fff;
    padding: 10px 15px;
    margin-bottom: 10px;
    max-width: 40%;
    word-wrap: break-word;
  }

  .myChat {
    margin-top: 10px;
    margin-right: 20px;
    text-align: right;
  }
  .myChat .chatTime {
    position: absolute;
    left: -100px;
    top: 0;
    color: #fbf7f7;
    font-size: 14px;
    word-wrap: 'break-word';
  }

  .otherChat {
    margin-top: 10px;
    margin-left: 20px;
    text-align: left;
  }
  .otherChat .chatTime {
    position: absolute;
    left: 60px;
    top: 0;
    color: #fbf7f7;
    font-size: 14px;
    word-wrap: 'break-word';
  }
</style>
