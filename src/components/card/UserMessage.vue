<script setup lang="ts">
  import { computed } from 'vue';
  import { useWindowSize } from '@vueuse/core';
  import { dateFormat } from '@/utils';
  const { width } = useWindowSize();

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

  //브라우저 width값에 따른 메세지 박스 넓이 값
  const cWidth = computed(() => {
    if (width.value > 900) {
      return '40%';
    } else if (width.value > 750) {
      return '50%';
    } else {
      return '100%';
    }
  });
  //카드 컴포넌트 스타일
  const cCardStyles = computed(() => {
    return {
      float: props.type === 'mine' ? 'right' : 'left',
      width: cWidth.value,
      'word-wrap': 'break-word',
    };
  });
  //카드 컴포넌트 바디 스타일
  const cardBodyStyles = {
    padding: '10px',
    color: props.textColor,
    'background-color': props.backgroundColor,
  };
</script>
<template>
  <el-card :body-style="cardBodyStyles" :style="cCardStyles">
    <el-row>
      <el-col :span="18" style="padding: 10px 0"> {{ nickname }} </el-col>
      <el-col :span="6" align="end">
        <span :style="`font-size: var(--el-font-size-extra-small)`">
          {{ dateFormat(time, 'YYYY-MM-DD') }}
        </span>
        <br />
        <span :style="`font-size: var(--el-font-size-small)`">
          {{ dateFormat(time, 'HH:mm:ss') }}
        </span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="message">
        {{ message }}
      </el-col>
    </el-row>
  </el-card>
</template>
<style scoped>
  .message {
    font-size: smaller;
  }
  .el-row {
    margin-bottom: 5px;
  }
</style>
