<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import type { Ref } from 'vue';
  import { PlatformType, ITeamFilter } from '@/interfaces';

  const props = defineProps<{
    platform: PlatformType;
  }>();

  const emit = defineEmits(['init-data', 'select-data']);

  const open: Ref<boolean> = ref(false);

  // 필터 폼
  const form: ITeamFilter = reactive({
    isRank: null,
    platform: props.platform,
    mode: 'all',
    orderBy: 'desc',
  });

  // 선택한 데이터 보내기
  const sendData = (): void => {
    emit('select-data', form);
    open.value = false;
  };

  // 라벨 넓이
  const labelWidth: string = '140px';

  // 최초 실행 시 필터 데이터 한번 전달
  emit('init-data', form);
</script>
<template>
  <el-button @click="open = true"> 팀 리스트 필터 </el-button>

  <el-dialog v-model="open" :show-close="false" title="팀 리스트 필터" center>
    <el-form :model="form">
      <el-form-item label="게임 유형" :label-width="labelWidth">
        <el-radio-group v-model="form.isRank">
          <el-radio :label="null">전체</el-radio>
          <el-radio :label="true">랭크 게임</el-radio>
          <el-radio :label="false">일반 게임</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="게임 모드" :label-width="labelWidth">
        <el-select v-model="form.mode">
          <el-option label="전체" value="all" />
          <el-option v-show="form.isRank === false" label="듀오" value="duo" />
          <el-option label="스쿼드" value="squad" />
          <el-option
            v-show="form.isRank === false && platform === 'steam'"
            label="1인칭 듀오"
            value="duo-fpp"
          />
          <el-option v-show="platform === 'steam'" label="1인칭 스쿼드" value="squad-fpp" />
        </el-select>
      </el-form-item>
      <el-form-item label="순서" :label-width="labelWidth">
        <el-radio-group v-model="form.orderBy">
          <el-radio label="desc">내림차순</el-radio>
          <el-radio label="asc">오름차순</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="sendData"> 확인 </el-button>
        <el-button @click="open = false">닫기</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped></style>
