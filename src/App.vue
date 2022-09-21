<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HeaderMenu from '@/components/header/HeaderMenu.vue';
import SideMenu from '@/components/side/SideMenu.vue';
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <HeaderMenu />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <SideMenu />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
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
