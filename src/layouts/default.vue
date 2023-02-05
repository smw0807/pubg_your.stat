<script setup lang="ts">
  import SideMenu from '@/components/side/SideMenu.vue';
</script>

<template>
  <el-container>
    <el-aside width="200px">
      <SideMenu />
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>
