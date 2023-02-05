<script setup lang="ts">
  import { computed } from 'vue';
  import MapCard from '@/components/card/Map.vue';
  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
  });

  let cImgName = computed(() => props.name + '-car');
  // 이미지 출처 경로
  const source = (): string => {
    let result = '';
    switch (props.name) {
      case 'erangel':
        result = 'https://battlegrounds.party/map/?Baltic/2.32/409600x409600/V5u/b/o1:2/lBall';
        break;
      case 'miramar':
        result = 'https://battlegrounds.party/map/?Desert/2.32/408000x408000/Vcy/b/o0:4/lBall';
        break;
      case 'taego':
        result = 'https://battlegrounds.party/map/?Tiger/2.32/408000x408000/Vq/b/o0:3/lBall';
        break;
    }
    return result;
  };
</script>
<template>
  <MapCard :img-name="cImgName" :source="source()">
    <template #tag v-if="props.name === 'erangel'">
      <el-tag class="mx-1" effect="dark" color="#dda0dd">UAZ(100%) </el-tag>
      <el-tag class="mx-1" effect="dark" color="#800080">다시아(100%) </el-tag>
      <el-tag class="mx-1" effect="dark" color="#f00">탈것(50%) </el-tag>
      <el-tag class="mx-1" effect="dark" color="#9370db">보트(100%) </el-tag>
    </template>

    <template #tag v-else-if="props.name === 'miramar'">
      <el-tag class="mx-1" effect="dark" color="#ffd800">황금미라도(100%) </el-tag>
      <el-tag class="mx-1" effect="dark" color="#800080">미라도(100%) </el-tag>
      <el-tag class="mx-1" effect="dark" color="#dda0dd">픽업트럭(50%) </el-tag>
      <el-tag class="mx-1" effect="dark" color="#f5dfb3">탈것(48%) </el-tag>
      <el-tag class="mx-1" effect="dark" color="#9370db">보트(100%) </el-tag>
    </template>

    <template #tag v-else-if="props.name === 'taego'">
      <el-tag class="mx-1" effect="dark" color="#f00">포니(100%) </el-tag>
      <el-tag class="mx-1" effect="dark" color="#dda0dd">포터(100%) </el-tag>
      <el-tag class="mx-1" effect="dark" color="#f5dfb3">탈것(53%) </el-tag>
    </template>
  </MapCard>
</template>
<style scoped></style>
