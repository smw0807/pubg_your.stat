<script setup lang="ts">
  import { computed } from 'vue';
  interface Props {
    imgName: string;
    source: string;
  }
  const props = defineProps<Props>();

  let selIndex = 0;
  const urlPath = import.meta.env.DEV ? '/' : '/pubg_your.stat/';
  const cImgPath = computed(() => `${urlPath}car-respone/${props.imgName}.png`);
  const cSourceLink = computed(() => props.source);
</script>
<template>
  <el-row align="middle" justify="center">
    <el-col>
      <el-card>
        <v-zoomer-gallery
          ref="gallery"
          :list="[cImgPath]"
          :zooming-elastic="false"
          v-model="selIndex"
          style="width: 100%; height: 800px; border: solid 1px silver"
        ></v-zoomer-gallery>
        <slot name="tag" />

        <div style="padding: 14px">
          출처 :
          <el-link :href="cSourceLink" target="_blank">
            {{ cSourceLink }}
          </el-link>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<style scoped></style>
