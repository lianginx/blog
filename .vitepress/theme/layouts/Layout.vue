<script lang="ts" setup>
import { useData } from 'vitepress'

const { page, frontmatter } = useData()
</script>

<template>
  <div class="p-6 md:w-2xl md:mx-auto md:p-10">
    <NavBar />
    <main>
      <NotFound v-if="page.isNotFound" />
      <LayoutDocContent v-else-if="frontmatter.layout === undefined || frontmatter.layout === 'doc'" />
      <Content v-else-if="frontmatter.layout === 'page'" />
    </main>
    <FootBar />
    <BackTop />
    <DialogPreviewImg />
  </div>
</template>
