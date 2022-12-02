<script setup lang="ts">
  import card from '@/components/map/MapCard.vue';
  const taego =
    'https://battlegrounds.party/map/?Tiger/2.32/408000x408000/Vq/b/o0:3/lBall';
</script>
<template>
  <div class="main">
    <card imgName="taego-car" :source="taego" />
  </div>
</template>
<style scoped></style>
