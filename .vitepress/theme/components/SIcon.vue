<script setup lang="ts">
import type { SimpleIcon } from 'simple-icons'

defineProps<{
  icon: SimpleIcon
}>()
</script>

<template>
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path :d="icon.path" />
  </svg>
</template>
