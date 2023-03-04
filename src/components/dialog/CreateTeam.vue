<script setup lang="ts">
  import { reactive, computed, watch, ref } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { PlatformType, ITeamForm } from '@/interfaces';

  interface Props {
    open: boolean;
    platform: PlatformType;
    disabled: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    open: false,
    disabled: true,
  });

  const emit = defineEmits(['input-data', 'button-event']);

  const cPlatform = computed(() => props.platform);
  const cOpen = computed(() => props.open);

  // 데이터 폼 ref
  const formRef = ref<FormInstance>();
  // 데이터 폼
  const form: ITeamForm = reactive({
    title: '',
    isRank: true,
    platform: 'kakao',
    mode: 'squad',
  });
  //데이터 검증 규칙
  const rules = reactive<FormRules>({
    title: [{ required: true, message: '팀 이름을 입력해주세요.', trigger: 'blur' }],
  });

  //입력한 데이터 보내기
  const sendData = (formEl: FormInstance | undefined): void => {
    if (!formEl) return;
    formEl.validate(valid => {
      if (valid) {
        emit('input-data', form);
      }
    });
  };

  // 라벨 넓이
  const labelWidth: string = '140px';

  watch(cPlatform, () => {
    form.platform = cPlatform.value;
  });
  watch(cOpen, v => {
    if (!v) {
      //컴포넌트 닫히면 리셋
      formRef.value?.resetFields();
      form.isRank = true;
      form.mode = 'squad';
    }
  });
</script>
<template>
  <el-button :disabled="disabled" @click="emit('button-event', 'open')"> 팀 만들기 </el-button>

  <el-dialog v-model="open" :show-close="false" title="팀 만들기" center>
    <el-form :model="form" ref="formRef" :rules="rules">
      <el-form-item label="팀 이름" :label-width="labelWidth" prop="title">
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
        <el-button type="primary" @click="sendData(formRef)"> 만들기 </el-button>
        <el-button @click="emit('button-event', 'close')">닫기</el-button>
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
