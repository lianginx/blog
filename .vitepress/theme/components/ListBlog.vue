<script lang="ts" setup>
import ListTags from '#components/ListTags.vue'
import { useBlog } from '#composables/useBlog'
import { ChevronsDownUpIcon, CircleXIcon, SearchIcon, TagIcon, XIcon } from '@lucide/vue'
import { withBase } from 'vitepress'
import { ref } from 'vue'

const props = defineProps<{
  showTitle?: boolean
  showSearch?: boolean
  showTags?: boolean
  limit?: number
}>()

const {
  currentTag,
  keywords,
  blogs,
  tags,
  clearKeywords,
  clearCurrentTag,
} = useBlog({ limit: props.limit })

const isCollapse = ref(false)
function SwitchShowTags() {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <div class="space-y-4 lg:space-y-3">
    <div v-if="showTitle">
      <a class="font-bold" :href="withBase('/blog')">Blog</a>
      <span> ——</span>
    </div>

    <div v-if="showSearch || showTags" class="flex items-center">
      <div v-if="showSearch" class="flex-1 flex items-center gap-2 h-6">
        <div class="text-[--vp-c-text-3]">
          <CircleXIcon
            v-if="keywords" class="cursor-pointer" :size="16"
            role="button" aria-label="清除搜索关键词"
            @click="clearKeywords"
          />
          <SearchIcon v-else :size="16" aria-hidden="true" />
        </div>
        <input v-model.trim="keywords" class="flex-1 text-sm" placeholder="Search...">
      </div>
      <button
        class="text-[--vp-c-text-3] cursor-pointer ml-4"
        :aria-label="currentTag ? '清除已选标签' : '展开/折叠标签栏'"
        @click="currentTag ? clearCurrentTag() : SwitchShowTags()"
      >
        <component
          :is="!isCollapse ? TagIcon : currentTag ? XIcon : ChevronsDownUpIcon"
          v-if="showTags"
          :size="16"
        />
      </button>
    </div>

    <Transition name="tag" class="pb-1">
      <ListTags
        v-if="isCollapse"
        v-model="currentTag"
        :tags="tags"
      />
    </Transition>

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

<style scoped>
.tag-enter-active,
.tag-leave-active {
  overflow: hidden;
  transition:
    padding-bottom 300ms ease,
    margin-top 300ms ease,
    max-height 300ms ease,
    opacity 300ms ease,
    transform 300ms ease;
  transform-origin: top;
}

.tag-enter-from,
.tag-leave-to {
  padding-bottom: 0!important;
  margin-top: 0!important;
  max-height: 0;
  opacity: 0;
  transform: translateY(-6px);
}

.tag-enter-to,
.tag-leave-from {
  max-height: 240px;
  opacity: 1;
  transform: translateY(0);

}
</style>
