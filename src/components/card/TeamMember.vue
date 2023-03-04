<script setup lang="ts">
  import {} from 'vue';
  interface Props {
    //닉네임
    nickname: string;
    //본인인지 아닌지 여부
    isMine: boolean;
    //닉네임 카피 기능 활성화 여부
    copy?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    nickname: '',
    isMine: true,
    copy: false,
  });
  const emit = defineEmits([]);
</script>
<template>
  <el-card>
    <span> {{ nickname }}</span>
    <span v-if="isMine"> [나]</span>
  </el-card>
</template>
<style scoped></style>
