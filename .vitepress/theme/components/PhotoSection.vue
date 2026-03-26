<script lang="ts" setup>
import type { ThemeConfig } from '../types/theme'
import { useData } from 'vitepress'
import { computed } from 'vue'

withDefaults(
  defineProps<{
    showTitle?: boolean
  }>(),
  {
    showTitle: true,
  },
)

const { theme } = useData<ThemeConfig>()

const limit = computed(() => theme.value.blog?.homeLimit ?? 4)
const photos = computed(() => theme.value.photo?.items?.slice(0, limit.value) ?? [])
</script>

<template>
  <div class="grid gap-3">
    <div v-if="showTitle">
      <a class="font-bold" :href="theme.photo?.base">Photos</a>
      <span> ——</span>
    </div>
    <div
      class="imgs grid grid-cols-4 gap-2"
    >
      <PhotoImage v-for="item in photos" :key="item.src" :src="item.src" />
    </div>
  </div>
</template>
