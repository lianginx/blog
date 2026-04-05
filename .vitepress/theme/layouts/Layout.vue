<script lang="ts" setup>
import BackTop from '#components/BackTop.vue'
import DialogPreviewImg from '#components/dialog/PreviewImg.vue'
import FootBar from '#components/FootBar.vue'
import NavBar from '#components/NavBar.vue'
import NotFound from '#components/NotFound.vue'
import LayoutDocContent from '#layouts/LayoutDocContent.vue'
import { useData } from 'vitepress'

const { page, frontmatter } = useData()
</script>

<template>
  <div class="p-6 lg:w-2xl lg:mx-auto md:p-10">
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
