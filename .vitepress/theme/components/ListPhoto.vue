<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { usePreviewImg } from '#composables'
import { data } from '#data/photos.data'
import { blurhashToGradientCssObject } from '@unpic/placeholder'

const { show } = usePreviewImg()
</script>

<template>
  <div class="grid cols-2 gap-2 sm:cols-3 sm:gap-3">
    <div v-for="item, i in data" :key="item.src">
      <img
        class="w-full aspect-square object-cover cursor-zoom-in"
        :style="
          item.blurhash
            ? blurhashToGradientCssObject(item.blurhash) as CSSProperties
            : undefined
        "
        :src="withBase(item.src)"
        :alt="item.date"
        loading="lazy"
        @click="show(data.map(o => o.src), i)"
      >
    </div>
  </div>
</template>
