<script lang="ts" setup>
import { Content } from 'vitepress'

const { page, frontmatter } = useData()
</script>

<template>
  <div class="p-6 lg:w-2xl lg:mx-auto md:p-10">
    <NavBar />
    <main class="min-h-screen-sm">
      <NotFound v-if="page.isNotFound" />
      <DocContent v-else-if="frontmatter.layout === undefined || frontmatter.layout === 'doc'" />
      <Content v-else-if="frontmatter.layout === 'page'" />
    </main>
    <FootBar />
    <BackTop />
    <DialogPreviewImg />
  </div>
</template>
