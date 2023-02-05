<script setup lang="ts">
  import { computed, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { Refresh } from '@element-plus/icons-vue';
  import { ITeamForm, ITeamFilter, PlatformType } from '@/interfaces';
  import { useTeamStore, useUserStore } from '@/store';

  // 팀 리스트 필터 컴포넌트
  import TeamFilter from '@/components/dialog/ListFilter.vue';
  // 팀 만들기 컴포넌트
  import TeamDialog from '@/components/dialog/CreateTeam.vue';
  // 팀 리스트 카드 컴포넌트
  import TeamCard from '@/components/card/TeamInfo.vue';

  const props = defineProps<{ platform: PlatformType }>();
  const teamStore = useTeamStore();
  const userStore = useUserStore();
  const router = useRouter();

  const cPlatform = computed(() => props.platform);
  const cKakaoFilter = computed(() => teamStore.kakaoFilter);
  const cSteamFilter = computed(() => teamStore.steamFilter);

  // 현재 로그인 유저 정보 유무
  const hasUser = computed(() => userStore.hasUser);

  // 팀 리스트
  const list = computed(() => teamStore.getList);

  // 팀 만들기
  const createTeam = async (form: ITeamForm): Promise<void> => {
    const result = await teamStore.createTeam(form);
    joinTeam(result);
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
  const joinTeam = (id: string): void => {
    router.push(`/team-chatting/${id}`);
  };

  (async () => await getTeamList())();

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
        <TeamDialog :disabled="!hasUser" :platform="cPlatform" @input-data="createTeam" />
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
