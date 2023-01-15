<script setup lang="ts">
  import {} from 'vue';
  import { ITeamInfo } from '@/interfaces';

  interface Props {
    info: ITeamInfo;
  }
  const props = defineProps<Props>();
</script>
<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span :style="`font-size: var(--el-font-size-large)`"> {{ info.title }} </span>
      </div>
    </template>
    <div>게임 유형 : {{ info.isRank ? '랭크' : '일반' }}</div>
    <div>모드 : {{ info.mode }}</div>
    <div>참가인원 : {{ info.maxCount }}</div>
    <div>버튼</div>
    <!-- <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div> -->
  </el-card>
</template>
<style scoped>
  .el-card {
    width: 95%;
    border-radius: 10px;
    /* background-color: rgb(164, 36, 36); */
    margin-bottom: 5px;
  }
  .el-card:hover {
    border: 1px solid rgb(116, 139, 250);
  }
</style>
