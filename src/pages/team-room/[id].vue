<script setup lang="ts">
  import { onMounted, watch, watchEffect, computed, onBeforeUnmount } from 'vue';
  import { useRouter } from 'vue-router';
  import { nowDateFormat, notifError } from '@/utils';
  import { useTeamRoomStore, useUserStore } from '@/store';

  const router = useRouter();

  const props = defineProps({
    id: {
      type: String,
    },
  });
  const store = useTeamRoomStore();
  store.teamId = props.id as string;
  // store.joinTime = nowDateFormat('YYYY-MM-DD HH:mm:ss');
  store.joinTime = '2023-02-17 18:00:00';

  const userStore = useUserStore();

  //1. 방 입장 처리 시작
  const joinTeam = async (): Promise<string | boolean> => {
    return await store.joinTeam(userStore.user?.uid!);
  };
  //2. 방 정보
  const cTeamInfo = computed(() => store.getTeamInfo);
  //3. 방 접속자들 정보 가져오기
  const getMembers = async (): Promise<void> => {
    await store.getMembers(cTeamInfo.value?.members!);
  };
  //4. 입장 시점부터 대화 내용 가져오기

  //팀 나가기
  const exitTeam = async (): Promise<void> => {
    await store.exitTeam(userStore.user?.uid!);
  };

  //todo 이부분 일단 완성만 시키고 로직 꼭 다듬기
  (async () => {
    const join = await joinTeam();
    if (typeof join === 'string') {
      notifError('팀 참가 실패', join);
    } else {
      await getMembers();
    }
  })();
  watchEffect(() => {
    console.log('check !!: ', cTeamInfo.value);
  });
  onBeforeUnmount(async () => {
    await exitTeam();
  });
</script>
<template>
  <div class="common-layout">
    {{ id }} / {{ store.joinTime }}
    <el-container>
      <!-- todo 접속자 리스트 (왼쪽 사이드) -->
      <el-aside width="200px">접속자 리스트~</el-aside>
      <el-container>
        <!-- todo 팀 이름, 채팅방 나가기 버튼 -->
        <el-header> 팀 이름 / 나가기 버튼 </el-header>
        <!-- todo 채팅 영역 -->
        <el-main> 채팅 내용</el-main>
        <!-- todo 채팅 입력 영역 -->
        <el-footer> 채팅 입력 </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped></style>
<route>
  {
    meta: {
      layout: "TeamChat"
    }
  }
</route>
