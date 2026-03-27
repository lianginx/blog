<script lang="ts" setup>
import type { ThemeConfig } from '../types/theme'
import { useData } from 'vitepress'

const { theme } = useData<ThemeConfig>()
</script>

<template>
  <div class="grid gap-6">
    <ListBlog show-title :limit="theme.blog?.homeLimit ?? 12" />
    <PhotoSection />
  </div>
</template>
