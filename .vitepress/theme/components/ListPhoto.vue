<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { blurhashToGradientCssObject } from '@unpic/placeholder'
import { usePreviewImg } from '../components/dialog/usePreviewImg'
import { data } from '../data/photos.data'

const { show } = usePreviewImg()
</script>

<template>
  <div class="grid grid-cols-3 gap-2">
    <div v-for="item, i in data" :key="item.src">
      <img
        class="w-full aspect-square object-cover"
        :src="item.src"
        :style="item.blurhash ? blurhashToGradientCssObject(item.blurhash) as CSSProperties : undefined"
        loading="lazy"
        @click="show(data.map(o => o.src), i)"
      >
    </div>
  </div>
</template>
