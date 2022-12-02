<script setup lang="ts">
  import card from '@/components/map/MapCard.vue';
  const miramar =
    'https://battlegrounds.party/map/?Desert/2.32/408000x408000/Vcy/b/o0:4/lBall';
</script>
<template>
  <div class="main">
    <card imgName="miramar-car" :source="miramar" />
  </div>
</template>
<style scoped></style>
