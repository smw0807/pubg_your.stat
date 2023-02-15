<script setup lang="ts">
  import { computed, nextTick, ref } from 'vue';
  import type { Ref } from 'vue';
  import { useUserStore } from '@/store';
  import { IUserPlatformNickNames } from '@/interfaces';
  import { notifSuccess, notifError } from '@/utils';

  import HeaderMenu from '@/components/header/HeaderMenu.vue';
  //사용자 플레이어 닉네임 입력 컴포넌트 (첫 로그인, 내정보 기능에서 사용 예정)
  import MyPlatformNickname from '@/components/dialog/MyPlatformNickname.vue';

  const store = useUserStore();

  //첫 로그인 여부
  let firstLogin: Ref<boolean> = ref(false);

  //스토어에 유저 정보가 있는지
  const cHasUser = computed(() => store.hasUser);
  //첫 로그인 여부
  const cFirstLogin = computed(() => firstLogin.value);

  //스토어에 저장된 유저 정보
  // const userInfo = computed(() => store.getUser);

  const reloadUser = async () => await store.reloadUser();
  nextTick(async () => {
    await reloadUser();
  });

  //로그인
  const signin = async (): Promise<void> => {
    const isNewUser = await store.signin();
    if (isNewUser) {
      firstLogin.value = isNewUser;
    }
  };
  //로그아웃
  const signout = (): void => {
    store.signout();
  };
  //현재 로그인 중인 사용자 정보 가져오기
  const nowUser = (): void => {
    store.nowUser();
  };

  //로그인 사용자의 배그 플랫폼별 닉네임 저장하기
  const saveNicnNames = async (form: IUserPlatformNickNames): Promise<void> => {
    const result = await store.savePlatformNickname(form);
    if (typeof result === 'string') {
      notifError('', result);
    } else {
      notifSuccess('', '등록완료');
      firstLogin.value = false;
    }
  };
  //닉네임 저장 취소
  const inputNickNamesCancel = (): void => {
    firstLogin.value = false;
  };
</script>

<template>
  <div class="common-layout">
    <el-container>
      <MyPlatformNickname
        :is-show="cFirstLogin"
        @cancel="inputNickNamesCancel"
        @save="saveNicnNames"
      >
        <template #title> 플레이어 닉네임 등록 </template>
        <template #comment>
          <div class="desc">
            <p>현재 플레이중인 플랫폼별 닉네임을 입력해주시기 바랍니다.</p>
            <p>입력하지 않으면 팀 구하기 기능을 이용하실 수 없습니다.</p>
          </div>
        </template>
      </MyPlatformNickname>
      <el-header>
        <HeaderMenu @signin="signin" @signout="signout" @user="nowUser" :has-user="cHasUser" />
      </el-header>
      <router-view />
    </el-container>
  </div>
</template>

<style scoped></style>
