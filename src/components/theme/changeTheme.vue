<script setup lang="ts">
  import { useDark, useToggle } from '@vueuse/core';
  import { Sunny, Moon } from '@element-plus/icons-vue';
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
</script>

<template>
  <button @click="toggleDark()" text>
    <el-icon v-if="isDark"><Moon /></el-icon>
    <el-icon v-else><Sunny /></el-icon>
  </button>
</template>

<style></style>
