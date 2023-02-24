<script setup lang="ts">
  import { computed, watch, ref } from 'vue';
  import type { Ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { ElMessageBox } from 'element-plus';
  import { Refresh } from '@element-plus/icons-vue';
  import { ITeamForm, ITeamFilter, PlatformType } from '@/interfaces';
  import { useTeamStore, useUserStore, useTeamRoomStore } from '@/store';
  import { notifWarning } from '@/utils';

  // 팀 리스트 필터 컴포넌트
  import TeamFilter from '@/components/dialog/ListFilter.vue';
  // 팀 만들기 컴포넌트
  import TeamDialog from '@/components/dialog/CreateTeam.vue';
  // 팀 리스트 카드 컴포넌트
  import TeamCard from '@/components/card/TeamInfo.vue';

  const props = defineProps<{ platform: PlatformType }>();
  const teamStore = useTeamStore();
  const userStore = useUserStore();
  const teamroomStore = useTeamRoomStore();
  const router = useRouter();

  //팀 만들기 모달 열기 여부
  const createTeamModal: Ref<boolean> = ref(false);

  const cPlatform = computed(() => props.platform);
  const cKakaoFilter = computed(() => teamStore.kakaoFilter);
  const cSteamFilter = computed(() => teamStore.steamFilter);

  // 현재 로그인 유저 정보 유무
  const hasUser = computed(() => userStore.hasUser);

  // 팀 리스트
  const list = computed(() => teamStore.getList);

  // 팀 만들기 다이얼로그 컴포넌트 버튼 이벤트
  const teamDialogEvent = (v: string) => {
    if (v === 'open') {
      createTeamModal.value = true;
    } else if (v === 'close') {
      createTeamModal.value = false;
    }
  };

  // 팀 만들기
  const createTeam = (form: ITeamForm): void => {
    ElMessageBox.confirm('팀을 생성하시겠습니까?', '팀 만들기', {
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then(async () => {
      const result = await teamStore.createTeam(form);
      createTeamModal.value = false;
      joinTeam(result);
    });
  };

  // 팀 리스트 불러오기
  const getTeamList = async (): Promise<void> => {
    if (cPlatform.value === 'kakao') {
      await teamStore.teamList(teamStore.kakaoFilter);
    } else if (cPlatform.value === 'steam') {
      await teamStore.teamList(teamStore.steamFilter);
    }
  };

  // 필터값 저장
  const setFilter = async (filter: ITeamFilter): Promise<void> => {
    if (cPlatform.value === 'kakao') {
      teamStore.kakaoFilter = filter;
    } else if (cPlatform.value === 'steam') {
      teamStore.steamFilter = filter;
    }
    await getTeamList();
  };

  // 참가하기
  const joinTeam = async (id: string): Promise<void> => {
    if (await teamroomStore.hasTeam(id)) {
      router.push(`/team-room/${id}`);
    } else {
      notifWarning('팀 참가 실패', '팀이 존재하지 않습니다.\n리스트를 다시 불러옵니다.');
      await getTeamList();
    }
  };

  (async () => await getTeamList())();

  //팀 구하기 메뉴에서 플랫폼 변경되면 데이터 다시 불러오기
  watch(cPlatform, async () => {
    await getTeamList();
  });
</script>
<template>
  <div>
    <!-- 필터버튼, 방만들기 버튼 -->
    <el-row justify="end">
      <el-col align="end" :span="6">
        <el-button @click="getTeamList">
          <el-icon><Refresh /></el-icon>
        </el-button>
        <TeamFilter
          :platform="cPlatform"
          @select-data="setFilter"
          :filter-data="cPlatform === 'kakao' ? cKakaoFilter : cSteamFilter"
        />
        <TeamDialog
          :disabled="!hasUser"
          :platform="cPlatform"
          :open="createTeamModal"
          @input-data="createTeam"
          @button-event="teamDialogEvent"
        />
      </el-col>
    </el-row>
    <!-- 방 리스트 -->
    <el-row>
      <el-col :xl="3" :lg="6" :md="8" :sm="12" v-for="info in list">
        <TeamCard :info="info" @join="joinTeam" />
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
  .el-row {
    margin-bottom: 10px;
  }
  .el-col {
    margin-bottom: 10px;
  }
</style>
