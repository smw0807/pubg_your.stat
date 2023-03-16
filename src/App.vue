<script setup lang="ts">
  import { computed, ref } from 'vue';
  import type { Ref } from 'vue';
  import { useUserStore } from '@/store';
  import { IUserPlatformNickNames } from '@/interfaces';
  import { notifSuccess, notifError, dateFormat } from '@/utils';
  import { ElMessageBox } from 'element-plus';
  import { useRoute } from 'vue-router';

  import HeaderMenu from '@/components/header/HeaderMenu.vue';
  import MyPlatformNickname from '@/components/dialog/MyPlatformNickname.vue';

  const store = useUserStore();
  const route = useRoute();

  //플랫폼 닉네임 등록 컴포넌트 활성화 유무
  let isShowMyPlatform: Ref<boolean> = ref(false);
  //플랫폼 닉네임 등록 컴포넌트 모드 (ins, upd);
  let myPlatformMode: Ref<'ins' | 'upd'> = ref('ins');
  //플랫폼 닉네임 등록 컴포넌트 제목
  let myPlatformTitle: Ref<string> = ref('플레이어 닉네임 등록');

  //헤더 우측 버튼 숨김 여부 (팀 채팅방에서는 정보 수정, 로그아웃 버튼 감추기 위해 만듦)
  const cHideHeaderButton = computed(() => {
    if (route.path.indexOf('/team-room') !== -1) {
      return true;
    } else {
      return false;
    }
  });
  //유저 정보
  const cUser = computed(() => store.getUser);
  //스토어에 유저 정보가 있는지
  const cHasUser = computed(() => store.hasUser);
  //저장된 닉네임
  const cMyNickname = computed(() => store.getNickname);

  const reloadUser = async () => {
    try {
      await store.reloadUser();
    } catch (err) {
      notifError(null, err as string);
    }
  };

  //로그인
  const signin = async (): Promise<void> => {
    try {
      const isNewUser = await store.signin();
      //최초 로그인 시 플랫폼 닉네임 등록 컴포넌트 활성화
      if (isNewUser) {
        myPlatformMode.value = 'ins';
        isShowMyPlatform.value = isNewUser;
      }
    } catch (err) {
      notifError(null, err as string);
    }
  };
  //로그아웃
  const signout = (): void => {
    ElMessageBox.confirm('로그아웃 하시겠습니까?', '로그아웃', {
      confirmButtonText: '로그아웃',
      cancelButtonText: '취소',
    }).then(() => store.signout());
  };
  //현재 로그인 중인 사용자 정보 가져오기
  const myInfo = (): void => {
    store.nowUser();
    myPlatformMode.value = 'upd';
    myPlatformTitle.value = '내 정보';
    isShowMyPlatform.value = true;
  };

  //로그인 사용자의 배그 플랫폼별 닉네임 저장하기
  const saveNicnNames = (form: IUserPlatformNickNames): void => {
    ElMessageBox.confirm('저장하시겠습니까?', '닉네임 저장', {
      confirmButtonText: '저장',
      cancelButtonText: '취소',
    })
      .then(async () => {
        const result = await store.savePlatformNickname(myPlatformMode.value, form);
        if (typeof result === 'string') {
          notifError('플레이어 닉네임 저장', result);
        } else {
          notifSuccess('플레이어 닉네임 저장', '등록완료');
          isShowMyPlatform.value = false;
        }
      })
      .catch(err => {
        isShowMyPlatform.value = false;
        notifError(null, err as string);
      });
  };
  //닉네임 저장 취소
  const inputNickNamesCancel = (): void => {
    isShowMyPlatform.value = false;
  };

  (async () => await reloadUser())();
</script>

<template>
  <div class="common-layout">
    <el-container>
      <!-- 내 정보 컴포넌트 -->
      <MyPlatformNickname
        :open="isShowMyPlatform"
        :nicknames="cMyNickname"
        :cancel-text="myPlatformMode === 'ins' ? '다음에 하기' : '닫기'"
        @close="inputNickNamesCancel"
        @save="saveNicnNames"
      >
        <template #title> {{ myPlatformTitle }} </template>
        <template #body>
          <div class="desc" v-if="myPlatformMode === 'ins'">
            <p>현재 플레이중인 플랫폼별 닉네임을 입력해주시기 바랍니다.</p>
            <p>입력하지 않으면 팀 구하기 기능을 이용하실 수 없습니다.</p>
            <p>입력된 플랫폼 닉네임은 팀 구하기 방 안에서 표시되는데 사용됩니다.</p>
          </div>
          <div v-else>
            <el-divider>사용자</el-divider>
            <el-row>
              <el-col :span="24" align="center">
                <el-avatar :size="80" :src="cUser?.photoURL" />
              </el-col>
              <el-col :span="24" align="center">
                <span>{{ cUser?.displayName }}</span>
              </el-col>
              <el-col :span="24" align="center"> {{ cUser?.email }} </el-col>
              <el-col align="center">
                사이트 가입일 :
                {{ dateFormat(cUser?.metadata.creationTime as string, 'YYYY-MM-DD') }}
              </el-col>
            </el-row>
            <el-divider>닉네임</el-divider>
          </div>
        </template>
        <template #bottom v-if="myPlatformMode !== 'ins'">
          <el-row>
            <el-col align="end"> 등록일 : {{ cMyNickname?.['created-date'] }} </el-col>
            <el-col align="end"> 수정일 : {{ cMyNickname?.['updated-date'] }} </el-col>
          </el-row>
          <el-divider />
        </template>
      </MyPlatformNickname>
      <el-header>
        <HeaderMenu
          @signin="signin"
          @signout="signout"
          @user="myInfo"
          :has-user="cHasUser"
          :hide-button="cHideHeaderButton"
        />
      </el-header>
      <router-view />
    </el-container>
  </div>
</template>

<style scoped>
  .el-divider {
    margin: 20px 0;
  }
  .el-row {
    margin-bottom: 5px;
  }
</style>
