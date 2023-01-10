<script setup lang="ts">
  /**
   * 팀 만들기 다이얼로그
   * 입력할 정보
   * 1. 방제목 (input)
   * 2. 일반, 랭크 (radio)
   * 3. 모드 (radio)
   * ## 인원수는 모드에 맞춰 자동 설정
   * todo 데이터 검증
   */
  import { ref, reactive, defineProps, defineEmits } from 'vue';
  import type { Ref } from 'vue';
  import { PlatformType, ITeamForm } from '@/interfaces';

  type Props = {
    platform: PlatformType;
  };

  const props = defineProps<Props>();
  const emit = defineEmits(['input-data']);

  const open: Ref<boolean> = ref(false);

  // 데이터 폼
  const form: ITeamForm = reactive({
    title: '',
    isRank: true,
    mode: 'squad',
  });

  //데이터 보내기
  const sendData = () => {
    console.log(form);
    emit('input-data', form);
  };

  // 라벨 넓이
  const labelWidth: string = '140px';
</script>
<template>
  <el-button @click="open = true"> 팀 만들기 </el-button>

  <el-dialog v-model="open" :show-close="false" title="팀 만들기" center>
    <el-form :model="form">
      <el-form-item label="팀 이름" :label-width="labelWidth">
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="게임 유형" :label-width="labelWidth">
        <el-radio-group v-model="form.isRank">
          <el-radio :label="true">랭크 게임</el-radio>
          <el-radio :label="false">일반 게임</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="게임 모드" :label-width="labelWidth">
        <el-select v-model="form.mode">
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
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="sendData"> 만들기 </el-button>
        <el-button @click="open = false">닫기</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped>
  .my-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
