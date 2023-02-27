<script setup lang="ts">
  import { withDefaults } from 'vue';
  import { ITeamMessage } from '@/interfaces';
  interface Props {
    type: 'mine' | 'other' | 'system' | undefined; //메세지 타입
    data: ITeamMessage | undefined;
  }
  const props = withDefaults(defineProps<Props>(), {});
</script>
<template></template>
<style scoped></style>
