<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
  import { ref } from 'vue';
  import type { Ref } from 'vue';
  import { useUserStore } from '@/store';

  import HeaderMenu from '@/components/header/HeaderMenu.vue';
  import SideMenu from '@/components/side/SideMenu.vue';

  const store = useUserStore();

  //사용자 정보 유무(로그인 했으면 true, 안했으면 false)
  const hasUser: Ref<boolean> = ref(false);

  const login = async (): Promise<void> => {
    console.log('login');
    try {
      await store.signin();
    } catch (error) {
      console.error(error);
    }
  };
  const logout = () => {
    console.log('logout');
  };
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <HeaderMenu @login="login" @logout="logout" />
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
