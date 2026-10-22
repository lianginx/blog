<script setup lang="ts">
import Giscus from '@giscus/vue'

const { isDark } = useData()
</script>

<template>
  <div>
    <ClientOnly>
      <Giscus
        id="comments"
        repo="lianginx/blog"
        repo-id="R_kgDOR3JXPw"
        category="Blog Comments"
        category-id="DIC_kwDOR3JXP84DBoWv"
        mapping="pathname"
        strict="0"
        reactions-enabled="1"
        emit-metadata="0"
        input-position="top"
        :theme="isDark ? 'dark' : 'light'"
        lang="zh-CN"
        loading="lazy"
      />
    </ClientOnly>
  </div>
</template>
