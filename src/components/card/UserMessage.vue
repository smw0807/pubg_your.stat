<script setup lang="ts">
  import { withDefaults } from 'vue';
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
  };
  const cardBodyStyles = {
    padding: '10px',
  };
</script>
<template>
  <el-card :body-style="cardBodyStyles" :style="cardStyles">
    <el-row>
      <el-col :span="18">
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
      <el-col :span="24">
        {{ message }}
      </el-col>
    </el-row>
  </el-card>
</template>
<style scoped>
  .el-card {
    width: 30%;
  }
</style>
