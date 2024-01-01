<script setup lang="ts">
  import { reactive, ref, watchEffect } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { IUserPlatformNickNames } from '@/types';

  interface Props {
    open: boolean;
    //내정보 기능에서 input에 넣을 닉네임 값
    nicknames?: IUserPlatformNickNames | null;
    cancelText?: string; //닫기 버튼 텍스트
    saveText?: string; //저장 버튼 텍스트
  }

  const props = withDefaults(defineProps<Props>(), {
    open: false,
    cancelText: '다음에 하기',
    saveText: '저장',
  });

  const emit = defineEmits(['save', 'close']);

  const ruleFormRef = ref<FormInstance>();
  const formLabelWidth = '80px';
  const form: IUserPlatformNickNames = reactive({
    'kakao-nickname': '',
    'steam-nickname': '',
  });

  //확인 클릭 시
  const submitForm = (formEl: FormInstance | undefined) => {
    formEl?.validate(valid => {
      if (valid) emit('save', form);
    });
  };

  //닉네임 정규식
  const nicknameRegexp = /[^a-zA-Z0-9_-]/g;
  //닉네임 정규식 체크 콜백함수
  const validateNickname = (rule: any, value: any, cb: any) => {
    const reg = value.match(nicknameRegexp);
    if (reg) {
      cb('닉네임은 영어 대소문자, 숫자, 특수문자 - _ 만 입력 가능합니다.');
    }
    cb();
  };

  //validation
  const rules = reactive<FormRules>({
    'steam-nickname': [{ validator: validateNickname, trigger: 'blur' }],
    'kakao-nickname': [{ validator: validateNickname, trigger: 'blur' }],
  });

  //다이얼로그 닫을 시
  const close = (): void => {
    emit('close');
  };

  watchEffect(() => {
    if (props.nicknames) {
      form['kakao-nickname'] = props.nicknames['kakao-nickname'];
      form['steam-nickname'] = props.nicknames['steam-nickname'];
    } else {
      form['kakao-nickname'] = '';
      form['steam-nickname'] = '';
    }
  });
</script>
<template>
  <el-dialog v-model="open" center :show-close="false" width="30%" @close="close">
    <template #header>
      <span :style="`font-size: 30px;`">
        <!-- 타이틀 슬롯 -->
        <slot name="title" />
      </span>
    </template>
    <slot name="body" />
    <el-form :model="form" ref="ruleFormRef" :rules="rules">
      <el-form-item label="스팀" :label-width="formLabelWidth" prop="steam-nickname">
        <el-input v-model="form['steam-nickname']" autocomplete="off" />
      </el-form-item>
      <el-form-item label="카카오" :label-width="formLabelWidth" prop="kakao-nickname">
        <el-input v-model="form['kakao-nickname']" autocomplete="off" />
      </el-form-item>
    </el-form>
    <slot name="bottom" />
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm(ruleFormRef)"> {{ saveText }} </el-button>
        <el-button @click="close">{{ cancelText }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped></style>
