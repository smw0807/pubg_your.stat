<script setup lang="ts">
  import { onMounted, watch, computed, ref, onUnmounted } from 'vue';
  import type { Ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useTeamRoomStore, useUserStore } from '@/store';
  import { ElMessageBox } from 'element-plus';
  import { ITeamMessage } from '@/interfaces';
  import { notifError } from '@/utils';
  import { useWindowSize } from '@vueuse/core';

  //컴포넌트
  import SystemMessage from '@/components/card/SystemMessage.vue';
  import UserMessage from '@/components/card/UserMessage.vue';

  const { height } = useWindowSize();

  const router = useRouter();

  const props = defineProps({
    id: {
      type: String,
    },
  });
  const teamroomStroe = useTeamRoomStore();
  const userStore = useUserStore();

  const isExit: Ref<boolean> = ref(false);
  const isSend: Ref<boolean> = ref(false);

  //팀 정보
  const cTeamInfo = computed(() => teamroomStroe.getTeamInfo);
  //팀 멤버 정보
  const cMembers = computed(() => teamroomStroe.getMembers);
  //팀 메세지
  const cMessages = computed(() => teamroomStroe.getMessages);

  //로그인 사용자 정보
  const cUser = computed(() => userStore.getUser);
  const cNick = computed(() => userStore.getNickname);

  //메세지 박스 높이
  const cHeight = computed(() => height.value - 280 + 'px');

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
      if (message.value.length > 0 && !isSend.value) {
        isSend.value = true;
        const nickname = cNick.value![`${cTeamInfo.value?.platform!}-nickname`];
        const params: ITeamMessage = {
          'sender-uid': cUser.value?.uid!,
          sender: nickname,
          message: message.value,
          'team-uid': props.id,
          type: 'user',
        };
        await teamroomStroe.sendMessage(params);
        isSend.value = false;
        message.value = '';
      }
    } catch (err) {
      notifError(null, err as string);
    }
  };

  onMounted(async () => {
    //팀 데이터 없으면 이전 페이지로...(새로고침시에도 그냥 뒤로)
    if (!cTeamInfo.value) {
      router.go(-1);
    }
    //접속자 멤버 가져오기
    await getMembers();
  });
  //팀 데이터가 변경되면 멤버 정보 새로 가져오기
  watch(cTeamInfo, async () => {
    await getMembers();
  });
  //페이지 벗어날 때
  onUnmounted(async () => {
    message.value = '';
    await exitTeam();
  });

  const cMessageBoxCSS = computed(() => {
    return {
      border: '1px solid #4b4d50',
      height: cHeight.value,
      'overflow-y': 'auto',
    };
  });
</script>
<template>
  <div class="common-layout">
    <el-row>
      <!-- 접속자 리스트 -->
      <el-col :md="4" :sm="24" style="padding-right: 10px">
        <el-card v-for="(member, idx) of cMembers" :key="idx">
          <span> {{ member[`${cTeamInfo?.platform!}-nickname`] }}</span>
          <span v-if="cUser?.email === member.email"> [나]</span>
        </el-card>
      </el-col>
      <!-- 팀 이름, 팀나가기, 메세지 표시, 메세지 입력 -->
      <el-col :md="20" :sm="24">
        <!-- 팀 이름, 팀 나가기 -->
        <el-row justify="space-between" align="middle">
          <el-col :span="12">
            <h2>{{ cTeamInfo?.title }} {{ cHeight }}</h2>
          </el-col>
          <el-col :span="12" align="end">
            <el-button size="large" @click="exitBtn">팀 나가기</el-button>
          </el-col>
        </el-row>

        <!-- 메세지 표시 영역 -->
        <el-row>
          <el-col :span="24">
            <el-card :body-style="cMessageBoxCSS">
              <el-row>
                <el-col :span="24" v-for="(msg, idx) of cMessages" :key="idx">
                  <div v-if="msg.type === 'system'">
                    <SystemMessage :message="msg.message" :time="msg['send-time']" align="center" />
                  </div>
                  <div v-else>
                    <UserMessage
                      :type="msg['sender-uid'] === cUser?.uid ? 'mine' : 'other'"
                      :nickname="msg.sender"
                      :time="msg['send-time']"
                      :message="msg.message"
                    />
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
        <!-- 채팅 메세지 입력 영역 -->
        <el-row>
          <el-col :span="24">
            <el-input
              v-model="message"
              placeholder="내용 입력"
              @keyup.enter="sendMessage"
              clearable
              maxlength="100"
              autofocus
              size="large"
            />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
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
