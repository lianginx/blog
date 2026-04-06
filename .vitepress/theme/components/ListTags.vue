<script setup lang="ts">
import type { TagItem } from '#types/theme'

withDefaults(
  defineProps<{
    tags?: TagItem[]
  }>(),
  {},
)

const emit = defineEmits<{
  clear: []
}>()

const modelValue = defineModel<string>({
  default: '',
  required: true,
})

function clearCurrentTag() {
  modelValue.value = ''
  emit('clear')
}
</script>

<template>
  <div>
    <div v-if="modelValue" class="flex items-center space-x-2">
      <div class="text-[--vp-c-text-3]">
        Tag:
      </div>
      <button
        class="flex items-center text-base text-[--vp-c-text-2] hover:text-[--vp-c-text-1] cursor-pointer"
        aria-label="清除已选标签"
        @click="clearCurrentTag"
      >
        {{ modelValue }}
      </button>
    </div>
    <div v-else class="flex flex-wrap gap-x-3 gap-y-1 leading-none">
      <button
        v-for="tag in tags" :key="tag.name"
        class="cursor-pointer text-base"
        @click="modelValue = tag.name"
      >
        <span class="text-[--vp-c-text-3] hover:text-[--vp-c-text-1]">
          {{ tag.name }}
        </span>
        <span class="text-[--vp-c-text-3] text-xs">({{ tag.count }})</span>
      </button>
    </div>
  </div>
</template>
