<script setup lang="ts">
  import { computed, watch, ref } from 'vue';
  import type { Ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { alertEmits, ElMessageBox } from 'element-plus';
  import { Refresh } from '@element-plus/icons-vue';
  import { ITeamForm, ITeamFilter, PlatformType } from '@/interfaces';
  import { useTeamStore, useUserStore, useTeamRoomStore } from '@/store';
  import { notifWarning, notifError } from '@/utils';

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
  const createTeanDialog: Ref<boolean> = ref(false);
  //팀 필터 모달 열기 여부
  const teamFilterDialog: Ref<boolean> = ref(false);

  //현재 플랫폼
  const cPlatform = computed(() => props.platform);
  //카카오 팀 필터 값
  const cKakaoFilter = computed(() => teamStore.kakaoFilter);
  //스팀 팀 필터 값
  const cSteamFilter = computed(() => teamStore.steamFilter);
  // 팀 리스트
  const cList = computed(() => teamStore.getList);
  // 현재 로그인 유저 정보 유무
  const hasUser = computed(() => userStore.hasUser);

  //팀 필터, 팀 만들기 버튼
  const dialogButtonEvent = (type: 'team' | 'filter'): void => {
    if (type === 'team') {
      if (!hasNickname()) {
        notifWarning(
          '팀 만들기 실패',
          '팀을 만들기 위해선 [내 정보]에서 만드려는 플랫폼의 게임 닉네임을 입력해주세요.'
        );
        return;
      }
      createTeanDialog.value = !createTeanDialog.value;
    } else if (type === 'filter') {
      teamFilterDialog.value = !teamFilterDialog.value;
    }
  };

  // 팀 만들기
  const createTeam = (form: ITeamForm): void => {
    ElMessageBox.confirm('팀을 생성하시겠습니까?', '팀 만들기', {
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then(async () => {
      try {
        const result = await teamStore.createTeam(form);
        if (result) {
          createTeanDialog.value = false;
          joinTeam(result);
        }
      } catch (err) {
        notifError(null, err as string);
      }
    });
  };

  // 팀 리스트 불러오기
  const getTeamList = async (): Promise<void> => {
    try {
      if (cPlatform.value === 'kakao') {
        await teamStore.teamList(teamStore.kakaoFilter);
      } else if (cPlatform.value === 'steam') {
        await teamStore.teamList(teamStore.steamFilter);
      }
    } catch (err) {
      notifError(null, err as string);
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
    try {
      if (!hasNickname()) {
        notifWarning(
          '팀 참가 실패',
          '팀에 참여하려면 [내 정보]에서 닉네임을 등록해주세요.<br>각 플랫폼 닉네임을 등록해야 해당 플랫폼 팀에 참가할 수 있습니다.'
        );
        return;
      }
      const result = await teamroomStore.joinTeam(userStore.user?.uid!, id);
      if (typeof result === 'boolean') {
        router.push(`/team-room/${id}`);
      } else {
        notifWarning('팀 참가 실패', result);
        await getTeamList();
      }
    } catch (err) {
      notifError('팀 참가 실패', err as string);
    }
  };

  (async () => await getTeamList())();

  //현재 사용사용자가 닉네임을 등록했는지 확인(팀만들기, 참가하기 시 체크용)
  const hasNickname = (): boolean => {
    const nicknames = userStore.getNickname;
    if (!nicknames) {
      return false;
    }
    if (nicknames[`${cPlatform.value}-nickname`]) {
      return true;
    }
    return false;
  };
  //팀 구하기 메뉴에서 플랫폼 변경되면 데이터 다시 불러오기
  watch(cPlatform, async () => {
    await getTeamList();
  });
</script>
<template>
  <div>
    <!-- 필터버튼, 방만들기 버튼 -->
    <el-row justify="end">
      <el-col align="end" :span="24">
        <el-button @click="getTeamList">
          <el-icon><Refresh /></el-icon>
        </el-button>
        <el-button @click="dialogButtonEvent('filter')"> 팀 필터 </el-button>
        <el-button @click="dialogButtonEvent('team')"> 팀 만들기 </el-button>

        <TeamFilter
          :platform="cPlatform"
          @select-data="setFilter"
          :filter-data="cPlatform === 'kakao' ? cKakaoFilter : cSteamFilter"
          :open="teamFilterDialog"
          @close="dialogButtonEvent('filter')"
        />
        <TeamDialog
          :disabled="!hasUser"
          :platform="cPlatform"
          :open="createTeanDialog"
          @input-data="createTeam"
          @close="dialogButtonEvent('team')"
        />
      </el-col>
    </el-row>
    <!-- 방 리스트 -->
    <el-row>
      <el-col :xl="3" :lg="6" :md="8" :sm="12" v-for="info in cList">
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
