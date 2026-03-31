<script setup lang="ts">
import SIcon from '#components/SIcon.vue'
import { HouseIcon } from '@lucide/vue'
import { siGithub, siNpm } from 'simple-icons'
import { computed, ref } from 'vue'

interface ProjectItem {
  title: string
  description: string
  links: ProjectLink[]
  tag: string
}

interface ProjectLink {
  type: 'github' | 'npm' | 'home'
  url: string
}

const props = withDefaults(
  defineProps<{
    items: ProjectItem[]
  }>(),
  {},
)

const currentTag = ref('全部')
const tags = computed(() => {
  const set = new Set<string>(['全部'])
  props.items.forEach(item => set.add(item.tag))
  return Array.from(set)
})
const projects = computed(() =>
  props.items.filter(item => currentTag.value === '全部' || item.tag === currentTag.value))
</script>

<template>
  <div class="flex flex-wrap gap-2 mb-4">
    <div
      v-for="item in tags" :key="item"
      class="hover:bg-[--vp-c-default-soft] px-2 py-1 rd-md cursor-pointer text-sm"
      :class="{ 'bg-[--vp-c-default-soft]': currentTag === item }"
      @click="currentTag = item"
    >
      {{ item }}
    </div>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
    <div
      v-for="item in projects"
      :key="item.title"
      class="flex flex-col b b-solid b-[--vp-c-divider] hover:b-[--vp-c-border] p-4 rd-md gap-2"
    >
      <a
        class="text-lg font-bold line-clamp-1 hover:decoration-none"
        :href="item.links[0].url"
        target="_blank"
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
            :href="link.url"
            target="_blank"
          >
            <SIcon v-if="link.type === 'github'" class="w-4 h-4" :icon="siGithub" />
            <SIcon v-else-if="link.type === 'npm'" class="w-4 h-4" :icon="siNpm" />
            <HouseIcon v-else-if="link.type === 'home'" :size="17" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
