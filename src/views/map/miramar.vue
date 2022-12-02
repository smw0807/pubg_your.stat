<script setup lang="ts">
  import card from '@/components/map/MapCard.vue';
  const miramar =
    'https://battlegrounds.party/map/?Desert/2.32/408000x408000/Vcy/b/o0:4/lBall';
</script>
<template>
  <div class="main">
    <card imgName="miramar-car" :source="miramar">
      <template #tag>
        <el-tag class="mx-1" effect="dark" color="#ffd800"
          >황금미라도(100%)
        </el-tag>
        <el-tag class="mx-1" effect="dark" color="#800080"
          >미라도(100%)
        </el-tag>
        <el-tag class="mx-1" effect="dark" color="#dda0dd"
          >픽업트럭(50%)
        </el-tag>
        <el-tag class="mx-1" effect="dark" color="#f5dfb3">탈것(48%) </el-tag>
        <el-tag class="mx-1" effect="dark" color="#9370db">보트(100%) </el-tag>
      </template>
    </card>
  </div>
</template>
<style scoped>
  .el-tag {
    border: 0;
    color: black;
  }
</style>
