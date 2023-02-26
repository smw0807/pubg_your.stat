<script setup lang="ts">
  import { onMounted, watch, computed, onBeforeUnmount, ref } from 'vue';
  import type { Ref } from 'vue';
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

  //로그인 사용자 정보
  const cUser = computed(() => userStore.getUser);
  //팀 정보
  const cTeamInfo = computed(() => store.getTeamInfo);
  //팀 멤버 정보
  const cMembers = computed(() => store.getMembers);

  //채팅 메세지
  const message: Ref<string> = ref('');

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
  const exitBtn = (): void => {
    ElMessageBox.confirm('현재 팀을 나가겠습니까?', '팀나가기', {
      confirmButtonText: '나가기',
      cancelButtonText: '취소',
    }).then(async () => {
      await exitTeam();
      router.go(-1);
    });
  };

  const sendMessage = () => {
    console.log('message : ', message.value);
    if (message.value.length > 0) {
      //todo 메세지 전송 후 초기화
      message.value = '';
    }
  };

  onMounted(async () => {
    //새로 고침 시 팀 리스트로...
    if (!cTeamInfo.value && !import.meta.env.DEV) {
      router.go(-1);
    }
    //접속자 멤버 가져오기
    await getMembers();
  });
  //팀 정보 변경시 멤버 정보 새로 가져오기
  watch(cTeamInfo, async () => {
    await getMembers();
  });
  //페이지 벗어날 때
  onBeforeUnmount(async () => {
    message.value = '';
    await exitTeam();
  });
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
    <el-container>
      <!-- 접속자 리스트 -->
      <el-aside width="200px">
        <el-card v-for="(member, idx) of cMembers" :key="idx">
          <span v-if="cTeamInfo?.platform === 'kakao'">{{ member['kakao-nickname'] }}</span>
          <span v-else> {{ member['steam-nickname'] }}</span>
          <span v-if="cUser?.email === member.email"> [나]</span>
        </el-card>
      </el-aside>

      <el-container>
        <!-- 팀 이름, 팀 나가기 -->
        <el-header>
          <el-row justify="space-between" align="middle">
            <el-col :span="12">
              <h2>{{ cTeamInfo?.title }}</h2>
            </el-col>
            <el-col :span="12" align="end">
              <el-button size="large" @click="exitBtn">팀 나가기</el-button>
            </el-col>
          </el-row>
        </el-header>

        <!-- todo 채팅 영역 -->
        <el-main>
          <div class="messageArea"></div>
        </el-main>

        <!-- 채팅 메세지 입력 영역 -->
        <el-footer>
          <el-input
            v-model="message"
            placeholder="내용 입력"
            @keyup.enter="sendMessage"
            clearable
            maxlength="100"
            autofocus
            size="large"
          />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped>
  .el-card {
    margin-bottom: 5px;
  }
  .messageArea {
    width: 100%;
    border: 1px solid #4b4d50;
    height: 500px;
  }
</style>
<route>
  {
    meta: {
      layout: "TeamChat"
    }
  }
</route>
