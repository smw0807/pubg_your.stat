<script setup lang="ts">
  import card from '@/components/map/MapCard.vue';
  const erangel =
    'https://battlegrounds.party/map/?Baltic/2.32/409600x409600/V5u/b/o1:2/lBall';
</script>
<template>
  <div class="main">
    <card imgName="erangel-car" :source="erangel" />
  </div>
</template>
<style scoped></style>
