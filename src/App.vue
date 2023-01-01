<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
  import { ref, computed, onMounted } from 'vue';
  import type { Ref } from 'vue';
  import { useUserStore } from '@/store';

  import HeaderMenu from '@/components/header/HeaderMenu.vue';
  import SideMenu from '@/components/side/SideMenu.vue';

  const store = useUserStore();

  const hasUser = computed(() => store.hasUser);
  const userInfo = computed(() => store.getUser);
  console.log(userInfo.value);

  //로그인
  const signin = async (): Promise<void> => {
    await store.signin();
  };
  //로그아웃
  const signout = () => {
    store.signout();
  };

  const user = async () => {
    await store.userInfo();
  };
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        {{ hasUser }}
        <HeaderMenu @signin="signin" @signout="signout" @user="user" :has-user="hasUser" />
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
