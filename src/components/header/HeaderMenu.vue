<script setup lang="ts">
  import { ref } from 'vue';
  import type { Ref } from 'vue';

  const titleName: Ref<string> = ref('PUBG Your Stat');
</script>
<template>
  <div>
    <el-menu class="el-menu-demo" mode="horizontal">
      <!-- @select="handleSelect" -->
      <div class="logo">{{ titleName }}</div>
      <!-- <el-menu-item index="1">Processing Center</el-menu-item> -->
      <div class="flex-grow" />
      <!-- <el-sub-menu index="2">
        <template #title>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu> -->
      <el-menu-item index="0">로그인</el-menu-item>
      <el-menu-item index="4">Orders</el-menu-item>
    </el-menu>
  </div>
</template>
<style scoped>
  .flex-grow {
    flex-grow: 1;
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
