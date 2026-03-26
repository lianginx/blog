<script lang="ts" setup>
import type { ThemeConfig } from '../types/theme'
import { useData } from 'vitepress'
import { computed } from 'vue'

const { theme } = useData<ThemeConfig>()

const photos = computed(() => theme.value.photo?.items ?? [])
</script>

<template>
  <div class="grid grid-cols-3 gap-2">
    <PhotoImage v-for="item in photos" :key="item.src" class="image" :src="item.src" />
  </div>
</template>
