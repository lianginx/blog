<script lang="ts" setup>
import type { BlogItem } from '#types/theme'
import { data } from '#data/blog.data'
import { CircleXIcon, SearchIcon } from '@lucide/vue'
import { withBase } from 'vitepress'
import { computed, ref } from 'vue'

const props = defineProps<{
  showTitle?: boolean
  showSearch?: boolean
  limit?: number
}>()

const keywords = ref('')

const blogs = computed<BlogItem[]>(
  () => {
    let nextData = data
    if (keywords.value) {
      nextData = nextData.filter((item: Record<string, any>) =>
        item.frontmatter.title
          .toLowerCase()
          .includes(keywords.value),
      )
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
      <a class="font-bold" :href="withBase('/blog')">Blog</a>
      <span> ——</span>
    </div>
    <div v-if="showSearch" class="flex items-center gap-2 h-6">
      <div class="text-[--vp-c-text-3]">
        <CircleXIcon v-if="keywords" class="cursor-pointer" :size="16" @click="clear" />
        <SearchIcon v-else :size="16" />
      </div>
      <input v-model.trim="keywords" class="flex-1 text-sm" placeholder="Search...">
    </div>
    <div
      v-for="{ url, frontmatter } in blogs" :key="url"
      class="flex flex-col md:flex-row justify-between gap-1 md:gap-4"
    >
      <div class="flex-1 line-clamp-2 md:line-clamp-1">
        <a :href="withBase(url)">{{ frontmatter.title }}</a>
      </div>
      <div class="font-[BlinkMacSystemFont] tabular-nums text-[--vp-c-text-3] md:text-[--vp-c-text-1]">
        {{ frontmatter.date }}
      </div>
    </div>
  </div>
</template>
