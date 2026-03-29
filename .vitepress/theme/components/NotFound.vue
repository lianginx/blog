<script lang="ts" setup>
import { withBase } from 'vitepress'
</script>

<template>
  <div class="line-height-relaxed">
    <p class="text-[--vp-c-text-2] font-500 text-2xl">
      您要找的页面不存在
    </p>
    <br>
    <p class="text-[--vp-c-text-3]">
      这甚至不是一个有趣的 404 页面。
    </p>
    <br>
    <a :href="withBase('/')">返回首页</a>
  </div>
</template>
