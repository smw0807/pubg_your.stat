<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
  import { computed, nextTick } from 'vue';
  import { useUserStore } from '@/store';

  import HeaderMenu from '@/components/header/HeaderMenu.vue';
  import SideMenu from '@/components/side/SideMenu.vue';

  const store = useUserStore();

  //스토어에 유저 정보가 있는지
  const hasUser = computed(() => store.hasUser);
  //스토어에 저장된 유저 정보
  // const userInfo = computed(() => store.getUser);

  const reloadUser = async () => await store.reloadUser();
  nextTick(async () => {
    await reloadUser();
  });

  //로그인
  const signin = async (): Promise<void> => {
    await store.signin();
  };
  //로그아웃
  const signout = (): void => {
    store.signout();
  };
  //현재 로그인 중인 사용자 정보 가져오기
  const nowUser = (): void => {
    store.nowUser();
  };
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <HeaderMenu @signin="signin" @signout="signout" @user="nowUser" :has-user="hasUser" />
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
