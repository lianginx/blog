<script setup lang="ts">
import type { ThemeConfig } from '#types'

const { theme } = useData<ThemeConfig>()
</script>

<template>
  <pre>{{ theme.friends?.items }}</pre>
  <div>
    <div v-for="friend in theme.friends?.items" :key="friend.link">
      <div>{{ friend.name }}</div>
    </div>
  </div>
</template>

<style scoped></style>
