<script setup lang="ts">
  import card from '@/components/map/MapCard.vue';
  const taego =
    'https://battlegrounds.party/map/?Tiger/2.32/408000x408000/Vq/b/o0:3/lBall';
</script>
<template>
  <div class="main">
    <card imgName="taego-car" :source="taego">
      <template #tag>
        <el-tag class="mx-1" effect="dark" color="#f00">포니(100%) </el-tag>
        <el-tag class="mx-1" effect="dark" color="#dda0dd">포터(100%) </el-tag>
        <el-tag class="mx-1" effect="dark" color="#f5dfb3">탈것(53%) </el-tag>
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
