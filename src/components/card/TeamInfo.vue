<script setup lang="ts">
  import {} from 'vue';
  import { ITeamInfo, ModeType } from '@/interfaces';
  import { gameModeName } from '@/utils';

  interface Props {
    info: ITeamInfo;
  }
  const props = defineProps<Props>();

  //모드별 태그 컬러
  const modeColor = (mode: ModeType): string => {
    let result = '';
    switch (mode) {
      case 'duo':
        result = '#9FC93C';
        break;
      case 'duo-fpp':
        result = '#47C83E';
        break;
      case 'squad':
        result = '#4374D9';
        break;
      case 'squad-fpp':
        result = '#3DB7CC';
        break;
    }
    return result;
  };
</script>
<template>
  <el-card class="box-card" :body-style="{ padding: '10px' }">
    <template #header>
      <div class="card-header">
        <span :style="`font-size: var(--el-font-size-small-title)`"> {{ info.title }} </span>
      </div>
    </template>
    <el-row>
      <el-col>
        <el-tag v-if="info.isRank === true" effect="dark" color="#CC3D3D">랭크</el-tag>
        <el-tag v-else effect="dark" color="info">일반</el-tag>

        <el-tag effect="dark" :color="modeColor(info.mode)">{{ gameModeName(info.mode) }}</el-tag>
      </el-col>
    </el-row>

    <el-row justify="space-between">
      <el-col :span="12">
        <el-tag effect="light" type="warning">
          참여인원 ({{ info.members?.length || 0 }} / {{ info.maxCount }})
        </el-tag>
      </el-col>
      <el-col :span="12" align="end">
        <el-button size="small">참가하기</el-button>
      </el-col>
    </el-row>
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
  .el-tag {
    border: 0px;
    margin-right: 5px;
  }
  .el-row {
    margin-bottom: 10px;
  }
</style>
