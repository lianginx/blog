<script lang="ts" setup>
import ListBlog from '#components/ListBlog.vue'
import PhotoSection from '#components/PhotoSection.vue'
</script>

<template>
  <div class="grid gap-6">
    <ListBlog show-title :limit="12" />
    <PhotoSection />
  </div>
</template>
