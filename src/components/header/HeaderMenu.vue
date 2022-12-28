<script setup lang="ts">
  import { ref, defineEmits, defineProps } from 'vue';
  import type { Ref } from 'vue';

  const titleName: Ref<string> = ref('PUBG Your Stat');

  const emit = defineEmits(['login', 'logout']);
  const props = defineProps({
    hasUser: {
      type: Boolean,
      default: false,
    },
  });
</script>
<template>
  <div>
    <el-row align="middle" justify="space-between">
      <el-col :span="21">
        <div class="logo">{{ titleName }}</div>
      </el-col>
      <el-col :span="3" align="end">
        <el-button size="large" link v-if="hasUser" @click="emit('logout')">로그아웃</el-button>
        <el-button size="large" link v-else @click="emit('login')">로그인</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
  .el-row {
    border-bottom: 1px solid rgb(180, 180, 180);
  }
  .logo {
    padding: 0.6em;
    will-change: filter;
    font-weight: bold;
    font-size: 1.3em;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>
