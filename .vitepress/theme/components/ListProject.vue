<script setup lang="ts">
import type { ThemeConfig } from '#theme/types/theme'
import SIcon from '#components/SIcon.vue'
import { HouseIcon } from '@lucide/vue'
import { siGithub, siNpm } from 'simple-icons'
import { useData, withBase } from 'vitepress'
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    showTitle?: boolean
    showFilter?: boolean
    limit?: number
  }>(),
  {},
)

const { theme } = useData<ThemeConfig>()

const currentTag = ref('全部')
const tags = computed(() => {
  const set = new Set<string>(['全部'])
  theme.value.projects?.items?.forEach(item => set.add(item.tag))
  return Array.from(set)
})

const projects = computed(() =>
  theme.value.projects?.items
    ?.slice(0, props.limit)
    ?.filter(item => currentTag.value === '全部' || item.tag === currentTag.value))
</script>

<template>
  <div class="grid gap-4 lg:gap-3">
    <div v-if="showTitle">
      <a class="font-bold" :href="withBase('/projects')">Projects</a>
      <span> ——</span>
    </div>

    <div v-if="showFilter" class="flex flex-wrap gap-2 mb-1">
      <button
        v-for="item in tags" :key="item"
        class="hover:bg-[--vp-c-default-soft] px-2 py-1 rd-md cursor-pointer text-sm"
        :class="{ 'bg-[--vp-c-default-soft]': currentTag === item }"
        @click="currentTag = item"
      >
        {{ item }}
      </button>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
      <div
        v-for="item in projects" :key="item.title"
        class="flex flex-col b b-solid b-[--vp-c-divider] hover:b-[--vp-c-border] p-4 rd-md gap-2"
      >
        <a
          class="text-lg font-bold line-clamp-1"
          :href="item.links[0].url" target="_blank"
        >
          {{ item.title }}
        </a>
        <div class="line-clamp-3 leading-normal text-xs text-[--vp-c-text-2] h-14 mb-3">
          {{ item.description }}
        </div>
        <div class="flex justify-between items-center">
          <div class="bg-[--vp-c-default-soft] text-10px leading-none px-2 py-1 rounded-full cursor-default">
            {{ item.tag }}
          </div>
          <div class="flex gap-1">
            <a
              v-for="link in item.links" :key="link.url"
              class="p-1 rd hover:bg-[--vp-c-default-soft]"
              :href="link.url" target="_blank"
              :aria-label="link.type"
            >
              <SIcon v-if="link.type === 'github'" class="w-4 h-4" :icon="siGithub" />
              <SIcon v-else-if="link.type === 'npm'" class="w-4 h-4" :icon="siNpm" />
              <HouseIcon v-else-if="link.type === 'home'" :size="17" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
