<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { usePreviewImg } from '#composables'
import { data } from '#data/photos.data'
import { blurhashToGradientCssObject } from '@unpic/placeholder'

withDefaults(
  defineProps<{
    showTitle?: boolean
  }>(),
  {
    showTitle: true,
  },
)

const photoItems = computed(() => data.slice(0, 4))

const { show } = usePreviewImg()
</script>

<template>
  <div class="grid gap-4 lg:gap-3">
    <div v-if="showTitle">
      <a class="font-bold" :href="withBase('/photos')">Photos</a>
      <span> ——</span>
    </div>
    <div class="imgs grid cols-2 sm:cols-4 gap-3">
      <img
        v-for="item, i in photoItems"
        :key="item.src"
        class="w-full aspect-square object-cover cursor-zoom-in"
        :style="item.blurhash ? blurhashToGradientCssObject(item.blurhash) as CSSProperties : undefined"
        :src="withBase(item.src)"
        :alt="item.date"
        loading="lazy"
        @click="show(photoItems.map(o => o.src), i)"
      >
    </div>
  </div>
</template>
