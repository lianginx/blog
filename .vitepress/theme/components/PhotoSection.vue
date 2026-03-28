<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { blurhashToGradientCssObject } from '@unpic/placeholder'
import { computed } from 'vue'
import { data } from '../data/photos.data'
import { usePreviewImg } from './dialog/usePreviewImg'

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
  <div class="grid gap-3">
    <div v-if="showTitle">
      <a class="font-bold" href="/photos">Photos</a>
      <span> ——</span>
    </div>
    <div class="imgs grid grid-cols-4 gap-2">
      <img
        v-for="item, i in photoItems"
        :key="item.src"
        class="w-full aspect-square object-cover"
        :src="item.src"
        :style="item.blurhash ? blurhashToGradientCssObject(item.blurhash) as CSSProperties : undefined"
        loading="lazy"
        @click="show(photoItems.map(o => o.src), i)"
      >
    </div>
  </div>
</template>
