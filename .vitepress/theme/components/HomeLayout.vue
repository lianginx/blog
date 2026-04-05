<script lang="ts" setup>
import ListBlog from '#components/ListBlog.vue'
import ListProject from '#components/ListProject.vue'
import PhotoSection from '#components/PhotoSection.vue'
</script>

<template>
  <div class="grid gap-8">
    <ListBlog show-title :limit="12" />
    <ListProject show-title :limit="2" />
    <PhotoSection />
  </div>
</template>
