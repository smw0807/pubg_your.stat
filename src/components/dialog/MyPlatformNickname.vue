<script setup lang="ts">
  import { reactive } from 'vue';
  import { IUserPlatformNickNames } from '@/interfaces';
  const props = defineProps({
    isShow: {
      type: Boolean,
      default: false,
    },
  });
  const emit = defineEmits(['save', 'cancel']);
  const formLabelWidth = '140px';
  const form: IUserPlatformNickNames = reactive({
    'kakao-nickname': '',
    'steam-nickname': '',
  });
  const save = () => {
    emit('save', form);
  };
</script>
<template>
  <el-dialog v-model="isShow" title="플레이어 닉네임 등록" center :show-close="false">
    <el-form :model="form">
      <p>현재 플레이중인 플랫폼별 닉네임을 입력해주시기 바랍니다.</p>
      <p>입력하지 않으면 팀 구하기 기능을 이용하실 수 없습니다.</p>
      <el-form-item label="스팀 닉네임" :label-width="formLabelWidth">
        <el-input v-model="form['steam-nickname']" autocomplete="off" />
      </el-form-item>
      <el-form-item label="카카오 닉네임" :label-width="formLabelWidth">
        <el-input v-model="form['kakao-nickname']" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('cancel')">다음에 하기</el-button>
        <el-button type="primary" @click="save()"> 확인 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped></style>
