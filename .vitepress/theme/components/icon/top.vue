<script lang="ts" setup>
defineProps<{
  size: number
}>()
</script>

<template>
  <img
    :width="size"
    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2MTYxNjEiIHN0cm9rZS13aWR0aD0iMS43NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1hcnJvdy11cC1mcm9tLWxpbmUtaWNvbiBsdWNpZGUtYXJyb3ctdXAtZnJvbS1saW5lIj48cGF0aCBkPSJtMTggOS02LTYtNiA2Ii8+PHBhdGggZD0iTTEyIDN2MTQiLz48cGF0aCBkPSJNNSAyMWgxNCIvPjwvc3ZnPg=="
  >
</template>
