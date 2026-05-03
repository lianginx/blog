<script lang="ts" setup>
import { Content } from 'vitepress'

const { page, frontmatter } = useData()
</script>

<template>
  <div>
    <div class="p-8 lg:w-2xl lg:mx-auto lg:p-12 animate-fade-in">
      <NavBar />
      <main class="min-h-screen-sm">
        <NotFound v-if="page.isNotFound" />
        <DocContent v-else-if="frontmatter.layout === undefined || frontmatter.layout === 'doc'" />
        <Content v-else-if="frontmatter.layout === 'page'" />
      </main>
      <FootBar />
      <DialogPreviewImg />
    </div>
    <BackTop />
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: 800ms both fade-in;
}
</style>
