<script setup lang="ts">
  import { onMounted, watch, computed, ref, onUnmounted } from 'vue';
  import type { Ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useTeamRoomStore, useUserStore } from '@/store';
  import { ElMessageBox } from 'element-plus';
  import { ITeamMessage } from '@/interfaces';
  import { notifError } from '@/utils';

  //컴포넌트
  import SystemMessage from '@/components/card/SystemMessage.vue';

  const router = useRouter();

  const props = defineProps({
    id: {
      type: String,
    },
  });
  const teamroomStroe = useTeamRoomStore();
  const userStore = useUserStore();

  const isExit: Ref<boolean> = ref(false);

  //팀 정보
  const cTeamInfo = computed(() => teamroomStroe.getTeamInfo);
  //팀 멤버 정보
  const cMembers = computed(() => teamroomStroe.getMembers);
  //팀 메세지
  const cMessages = computed(() => teamroomStroe.getMessages);

  //로그인 사용자 정보
  const cUser = computed(() => userStore.getUser);
  const cNick = computed(() => userStore.getNickname);

  //채팅 메세지
  const message: Ref<string> = ref('');

  //팀 접속자들 정보 가져오기
  const getMembers = async (): Promise<void> => {
    try {
      await teamroomStroe.getMembersData(cTeamInfo.value?.members!);
    } catch (err) {
      notifError(null, err as string);
    }
  };

  //팀 나가기
  const exitTeam = async (): Promise<void> => {
    try {
      if (!isExit.value) {
        await teamroomStroe.exitTeam(cUser.value?.uid!, props.id!);
        isExit.value = true;
      }
    } catch (err) {
      notifError(null, err as string);
    }
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

  //메세지 보내기
  const sendMessage = async (): Promise<void> => {
    try {
      if (message.value.length > 0) {
        const nickname = cNick.value![`${cTeamInfo.value?.platform!}-nickname`];
        const params: ITeamMessage = {
          'sender-uid': cUser.value?.uid!,
          sender: nickname,
          message: message.value,
          'team-uid': props.id,
          type: 'user',
        };
        await teamroomStroe.sendMessage(params);
        message.value = '';
      }
    } catch (err) {
      notifError(null, err as string);
    }
  };

  onMounted(async () => {
    //새로 고침 시 팀 리스트로...
    if (!cTeamInfo.value) {
      router.go(-1);
    }
    //접속자 멤버 가져오기
    await getMembers();
    //입장 메세지 보내기
  });
  //팀 정보 변경시 멤버 정보 새로 가져오기
  watch(cTeamInfo, async () => {
    await getMembers();
  });
  //페이지 벗어날 때
  onUnmounted(async () => {
    message.value = '';
    await exitTeam();
  });
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

        <!-- 메세지 표시 영역 -->
        <el-main>
          <div class="messageArea">
            <el-row>
              <el-col :span="24" v-for="(msg, idx) of cMessages" :key="idx">
                <div v-if="msg.type === 'system'">
                  <SystemMessage :message="msg.message" :time="msg['send-time']" align="center" />
                </div>
                <div v-else>
                  {{ msg.message }} / {{ msg['send-time'] }} / {{ msg.sender }}<br />
                </div>
              </el-col>
            </el-row>
          </div>
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
