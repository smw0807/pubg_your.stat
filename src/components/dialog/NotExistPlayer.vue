<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { Ref } from 'vue';
  import { WarningFilled } from '@element-plus/icons-vue';

  const props = defineProps({
    isShow: {
      type: Boolean,
      default: false,
    },
  });
  const emit = defineEmits(['onClose']);

  const close = () => {
    emit('onClose');
  };
</script>

<template>
  <el-dialog
    v-model="isShow"
    title="검색 실패"
    width="30%"
    center
    :show-close="false"
  >
    <template #header>
      <el-icon><WarningFilled /></el-icon>
      검색 실패
    </template>
    <p>존재하지 않는 플레이어입니다.</p>
    <p>플랫폼 또는 닉네임 대소문자를 확인해주시기 바랍니다.</p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">확인</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
