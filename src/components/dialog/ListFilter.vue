<script setup lang="ts">
  import { PlatformType, ITeamFilter } from '@/types';

  interface Props {
    open: boolean;
    platform: PlatformType;
    filterData: ITeamFilter;
  }
  const props = withDefaults(defineProps<Props>(), {
    open: false,
  });

  const emit = defineEmits(['select-data', 'close']);

  // 선택한 데이터 보내기
  const sendData = (): void => {
    emit('select-data', props.filterData);
  };

  // 라벨 넓이
  const labelWidth: string = '140px';
</script>
<template>
  <el-dialog v-model="open" :show-close="false" title="팀 리스트 필터" center>
    <el-form :model="filterData">
      <el-form-item label="게임 유형" :label-width="labelWidth">
        <el-radio-group v-model="filterData.isRank">
          <el-radio :label="null">전체</el-radio>
          <el-radio :label="true">랭크 게임</el-radio>
          <el-radio :label="false">일반 게임</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="게임 모드" :label-width="labelWidth">
        <el-select v-model="filterData.mode">
          <el-option label="전체" value="all" />
          <el-option v-show="filterData.isRank === false" label="듀오" value="duo" />
          <el-option label="스쿼드" value="squad" />
          <!-- <el-option
            v-show="filterData.isRank === false && platform === 'steam'"
            label="1인칭 듀오"
            value="duo-fpp"
          />
          <el-option v-show="platform === 'steam'" label="1인칭 스쿼드" value="squad-fpp" /> -->
        </el-select>
      </el-form-item>
      <el-form-item label="순서" :label-width="labelWidth">
        <el-radio-group v-model="filterData.orderBy">
          <el-radio label="desc">내림차순</el-radio>
          <el-radio label="asc">오름차순</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="sendData"> 확인 </el-button>
        <el-button @click="emit('close')">닫기</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped></style>
