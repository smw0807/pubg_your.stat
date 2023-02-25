<script setup lang="ts">
  import { onMounted, watchEffect, computed, onBeforeUnmount } from 'vue';
  import { useRouter } from 'vue-router';
  import { notifError } from '@/utils';
  import { useTeamRoomStore, useUserStore } from '@/store';
  import { ElMessageBox } from 'element-plus';

  const router = useRouter();

  const props = defineProps({
    id: {
      type: String,
    },
  });
  const store = useTeamRoomStore();
  // store.joinTime = nowDateFormat('YYYY-MM-DD HH:mm:ss');
  store.joinTime = '2023-02-17 18:00:00';

  const userStore = useUserStore();

  //팀 정보
  const cTeamInfo = computed(() => store.getTeamInfo);
  //팀 접속자들 정보 가져오기
  const getMembers = async (): Promise<void> => {
    await store.getMembers(cTeamInfo.value?.members!);
  };
  //입장 시점부터 대화 내용 가져오기
  const getMessage = async () => {};

  //팀 나가기
  const exitTeam = async (): Promise<void> => {
    await store.exitTeam(userStore.user?.uid!);
  };

  //팀 나가기 버튼 클릭 시
  const exitBtn = () => {
    ElMessageBox.confirm('현재 팀을 나가겠습니까?', '팀나가기', {
      confirmButtonText: '나가기',
      cancelButtonText: '취소',
    }).then(async () => {
      await exitTeam();
      router.go(-1);
    });
  };

  onMounted(async () => {
    //접속자 멤버 가져오기
    await getMembers();
  });
  watchEffect(async () => {
    console.log('check !!: ', cTeamInfo.value);
    await getMembers();
  });
  onBeforeUnmount(async () => {
    await exitTeam();
  });
</script>
<template>
  <div class="common-layout">
    <!-- {{ id }} / {{ store.joinTime }} -->
    <el-container>
      <!-- todo 접속자 리스트 (왼쪽 사이드) -->
      <el-aside width="200px">접속자 리스트~</el-aside>
      <el-container>
        <!-- todo 팀 이름, 채팅방 나가기 버튼 -->
        <el-header>
          <el-row justify="space-between" align="bottom">
            <el-col :span="12">
              <h2>{{ cTeamInfo?.title }}</h2>
            </el-col>
            <el-col :span="12" align="end">
              <el-button @click="exitBtn">팀 나가기</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-divider />
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
