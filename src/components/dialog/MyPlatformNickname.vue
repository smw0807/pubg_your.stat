<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { IUserPlatformNickNames } from '@/interfaces';
  const props = defineProps({
    //다이얼로그 보여주기 여부
    isShow: {
      type: Boolean,
      default: false,
    },
  });
  const emit = defineEmits(['save', 'cancel']);

  const ruleFormRef = ref<FormInstance>();
  const formLabelWidth = '100px';
  const form: IUserPlatformNickNames = reactive({
    'kakao-nickname': '',
    'steam-nickname': '',
  });

  //확인 클릭시
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
      cb('닉테임은 영어 대소문자, 숫자, 특수문자 - _ 만 입력 가능합니다.');
    }
    cb();
  };

  //validation
  const rules = reactive<FormRules>({
    'steam-nickname': [{ validator: validateNickname, trigger: 'blur' }],
    'kakao-nickname': [{ validator: validateNickname, trigger: 'blur' }],
  });
</script>
<template>
  <el-dialog v-model="isShow" center :show-close="false">
    <template #header>
      <span :style="`font-size: 30px;`">
        <!-- 타이틀 슬롯 -->
        <slot name="title" />
      </span>
    </template>
    <!-- 다이얼로그 설명 코멘트 슬롯 -->
    <slot name="comment" />
    <el-form :model="form" ref="ruleFormRef" :rules="rules">
      <el-form-item label="스팀 닉네임" :label-width="formLabelWidth" prop="steam-nickname">
        <el-input v-model="form['steam-nickname']" autocomplete="off" />
      </el-form-item>
      <el-form-item label="카카오 닉네임" :label-width="formLabelWidth" prop="kakao-nickname">
        <el-input v-model="form['kakao-nickname']" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('cancel')">다음에 하기</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"> 확인 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped>
  .desc {
    text-align: center;
  }
</style>