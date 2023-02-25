<script setup lang="ts">
  import { onMounted, watch, computed, onBeforeUnmount } from 'vue';
  import { useRouter } from 'vue-router';
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
  //팀 멤버 정보
  const cMembers = computed(() => store.getMembers);

  //팀 접속자들 정보 가져오기
  const getMembers = async (): Promise<void> => {
    await store.getMembersData(cTeamInfo.value?.members!);
  };
  //입장 시점부터 대화 내용 가져오기
  const getMessage = async () => {};

  //팀 나가기
  const exitTeam = async (): Promise<void> => {
    await store.exitTeam(userStore.user?.uid!, props.id!);
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
    //새로 고침 시 팀 리스트로...
    // if (!cTeamInfo.value) {
    //   router.go(-1);
    // }
    //접속자 멤버 가져오기
    // await getMembers();
  });
  watch(cTeamInfo, async () => {
    console.log('check !!: ', cTeamInfo.value);
    await getMembers();
  });
  // onBeforeUnmount(async () => {
  //   await exitTeam();
  // });
  if (import.meta.env.DEV) {
    (async () => {
      console.log('test...');
      console.log(userStore.user?.uid!, props.id!);
      await store.joinTeam(userStore.user?.uid!, props.id!);
      console.log(cTeamInfo.value);
      await getMembers();
    })();
  }
</script>
<template>
  <div class="common-layout">
    <!-- {{ id }} / {{ store.joinTime }} -->
    <el-container>
      <!-- todo 접속자 리스트 (왼쪽 사이드) -->
      <el-aside width="200px">
        <el-card v-for="(member, idx) of cMembers" :key="idx">
          <span v-if="cTeamInfo?.platform === 'kakao'">{{ member['kakao-nickname'] }}</span>
          <span v-else> {{ member['steam-nickname'] }}</span>
        </el-card>
      </el-aside>
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
<style scoped>
  .el-card {
    margin-bottom: 5px;
  }
</style>
<route>
  {
    meta: {
      layout: "TeamChat"
    }
  }
</route>
