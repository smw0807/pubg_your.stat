<script setup lang="ts">
  import { ref } from 'vue';
  import type { Ref } from 'vue';
  const props = defineProps({
    imgName: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
  });
  const sourceLink: Ref<string> = ref(props.source);
  const imgPath: Ref<string> = ref(`/car-respone/${props.imgName}.png`);
  const selIndex = 0;
</script>
<template>
  <el-row align="middle" justify="center">
    <el-col>
      <el-card>
        <v-zoomer-gallery
          ref="gallery"
          :list="[imgPath]"
          :zooming-elastic="false"
          v-model="selIndex"
          style="width: 100%; height: 800px; border: solid 1px silver"
        ></v-zoomer-gallery>
        <slot name="tag" />

        <div style="padding: 14px">
          출처 :
          <el-link :href="sourceLink" target="_blank">
            {{ sourceLink }}
          </el-link>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<style scoped></style>
