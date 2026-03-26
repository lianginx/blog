<script lang="ts" setup>
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div class="p-6 md:w-2xl md:mx-auto md:p-10">
    <NavBar />
    <main>
      <LayoutDocContent v-if="frontmatter.layout === undefined || frontmatter.layout === 'doc'" />
      <Content v-if="frontmatter.layout === 'page'" />
    </main>
    <FootBar />
    <BackTop />
  </div>
</template>
