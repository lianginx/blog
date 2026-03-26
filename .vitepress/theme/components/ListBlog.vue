<script lang="ts" setup>
import type { BlogItem } from '../types/theme'
import { computed, ref } from 'vue'
// @ts-expect-error vitepress 运行时导出 data
import { data } from '../../../docs/blog.data'

const props = defineProps<{
  showTitle?: boolean
  showSearch?: boolean
  limit?: number
}>()

const keywords = ref('')

const blogs = computed<BlogItem[]>(
  () => {
    let nextData = data as BlogItem[]
    if (keywords.value) {
      nextData = nextData.filter((item: Record<string, any>) => item.frontmatter.title.toLowerCase().includes(keywords.value))
    }
    return nextData.slice(0, props.limit)
  },
)

function clear() {
  keywords.value = ''
}
</script>

<template>
  <div class="grid gap-2">
    <div v-if="showTitle">
      <a class="font-bold" href="/blog">Blog</a>
      <span> ——</span>
    </div>
    <div v-if="showSearch" class="flex items-center gap-2 h-6">
      <button v-if="keywords" @click="clear">
        <IconClose :size="16" />
      </button>
      <IconSearch :size="16" />
      <input v-model.trim="keywords" class="flex-1 text-sm" placeholder="Search...">
    </div>
    <div
      v-for="{ url, frontmatter } in blogs" :key="url"
      class="flex flex-col md:flex-row justify-between gap-1"
    >
      <a :href="url" class="flex-1 line-clamp-2 md:line-clamp-1">{{ frontmatter.title }}</a>
      <div class="font-[BlinkMacSystemFont] tabular-nums text-[--vp-c-text-3] md:text-[--vp-c-text-1]">
        {{ frontmatter.date }}
      </div>
    </div>
  </div>
</template>
