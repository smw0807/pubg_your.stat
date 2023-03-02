<script setup lang="ts">
  import { dateFormat } from '@/utils';
  interface Props {
    type: 'mine' | 'other' | undefined; //메세지 타입
    nickname: string;
    time: string;
    message: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    type: 'mine',
    nickname: '',
    time: '',
    message: '',
  });
  const cardStyles = {
    float: props.type === 'mine' ? 'right' : 'left',
    width: '40%', //todo 브라우저 크리에 맞게 유동적으로 값이 변하도록 바꾸기
    'word-wrap': 'break-word',
  };
  const cardBodyStyles = {
    padding: '10px',
  };
</script>
<template>
  <el-card :body-style="cardBodyStyles" :style="cardStyles">
    <el-row>
      <el-col :span="18" style="padding: 10px 0">
        {{ nickname }}
      </el-col>
      <el-col :span="6" align="end">
        <span :style="`font-size: var(--el-font-size-extra-small)`">
          {{ dateFormat(time, 'YYYY-MM-DD') }}
        </span>
        <br />
        <span :style="`font-size: var(--el-font-size-small)`">
          {{ dateFormat(time, 'HH:mm:ss') }}</span
        >
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
