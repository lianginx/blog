<script lang="ts" setup>
import type { ThemeConfig } from '#types'
import { ArrowUpRightIcon, CheckIcon, ChevronDownIcon, ClipboardIcon, LinkIcon, LoaderCircleIcon } from '@lucide/vue'
import { siQwen } from 'simple-icons'
import { hasMarkdownCopy, markdownCopyPath } from '#utils/llmsPaths'

/** simple-icons 已下架 OpenAI 图标，这里内联官方 glyph */
const OPENAI_PATH = 'M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z'

const { page } = useData<ThemeConfig>()

const status = ref<'idle' | 'copying' | 'done'>('idle')
const open = ref(false)
const align = ref<'left' | 'right'>('right')
const root = ref<HTMLElement | null>(null)

/**
 * 文章的 Markdown 原文地址。
 *
 * 构建时 `generateLlmsTxt` 会把每篇文章的原文写到同路径的 `.md` 文件
 * （`dist/blog/foo.md`），dev 下 Vite 也直接以静态文件提供 `srcDir` 里的源文件，
 * 所以两种环境用同一个 URL 就能拿到原文，无需 VitePress 暴露正文 API。
 */
const markdownUrl = computed(() =>
  hasMarkdownCopy(page.value.relativePath)
    ? withBase(markdownCopyPath(page.value.relativePath))
    : '',
)

/** 完整 URL；只在菜单打开时求值，SSR 不会渲染菜单，因此可以安全访问 location */
const absoluteMarkdownUrl = computed(() =>
  markdownUrl.value
    ? new URL(markdownUrl.value, window.location.origin).href
    : '',
)

const aiPrompt = computed(() => `请阅读这篇文章，然后回答我关于它的问题：${absoluteMarkdownUrl.value}`)
const chatgptUrl = computed(() => `https://chatgpt.com/?q=${encodeURIComponent(aiPrompt.value)}`)
const qianwenUrl = computed(() => `https://www.qianwen.com/?q=${encodeURIComponent(aiPrompt.value)}`)

const label = computed(() => {
  if (status.value === 'copying')
    return '复制中'
  return status.value === 'done' ? '已复制' : '复制页面'
})

async function copyText(text: string) {
  await navigator.clipboard.writeText(text)

  status.value = 'done'
  window.setTimeout(() => {
    if (status.value === 'done')
      status.value = 'idle'
  }, 1200)
}

async function copyPage() {
  if (!markdownUrl.value || status.value === 'copying')
    return

  close()

  try {
    status.value = 'copying'

    const response = await fetch(markdownUrl.value)
    if (!response.ok)
      throw new Error(`Fetch ${markdownUrl.value} failed: ${response.status}`)

    await copyText(await response.text())
  }
  catch (error) {
    console.error('copy page failed', error)
    status.value = 'idle'
  }
}

async function copyMarkdownLink() {
  close()

  try {
    await copyText(absoluteMarkdownUrl.value)
  }
  catch (error) {
    console.error('copy markdown link failed', error)
  }
}

function updateAlign() {
  const rect = root.value?.getBoundingClientRect()
  if (rect)
    align.value = rect.left + rect.width / 2 < window.innerWidth / 2 ? 'left' : 'right'
}

function toggle() {
  open.value = !open.value
  if (open.value)
    updateAlign()
}

function close() {
  open.value = false
}

function onPointerDown(event: PointerEvent) {
  if (open.value && root.value && !root.value.contains(event.target as Node))
    close()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape')
    close()
}

onMounted(() => {
  document.addEventListener('pointerdown', onPointerDown)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('pointerdown', onPointerDown)
  document.removeEventListener('keydown', onKeydown)
})

watch(() => page.value.relativePath, close)
</script>

<template>
  <div v-if="markdownUrl" ref="root" class="relative inline-flex">
    <div class="inline-flex items-stretch overflow-hidden rd-md bg-[--vp-c-default-soft] transition-colors duration-150">
      <button
        type="button"
        class="flex items-center gap-1 px-2 py-1 text-xs hover:bg-[--vp-c-default-3] active:scale-96"
        @click="copyPage"
      >
        <component
          :is="status === 'copying' ? LoaderCircleIcon : status === 'done' ? CheckIcon : ClipboardIcon"
          :size="12"
          :class="status === 'copying' ? 'animate-spin' : ''"
        />
        <span>{{ label }}</span>
      </button>
      <span class="my-1 w-px bg-[--vp-c-divider]" />
      <button
        type="button"
        class="grid w-7 place-items-center transition-colors hover:bg-[--vp-c-default-3]"
        :class="{ 'bg-[--vp-c-default-3]': open }"
        aria-haspopup="menu"
        :aria-expanded="open"
        aria-label="更多复制选项"
        @click="toggle"
      >
        <ChevronDownIcon :size="12" class="transition-transform duration-150" :class="open ? 'rotate-180' : ''" />
      </button>
    </div>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="scale-95 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    >
      <div
        v-if="open"
        class="absolute top-full z-50 mt-1.5 w-60 max-w-[calc(100vw-2rem)] origin-top-right rd-lg border border-[--vp-c-divider] bg-[--vp-c-bg-soft] p-1 shadow-lg"
        :class="align === 'left' ? 'left-0' : 'right-0'"
        role="menu"
      >
        <button
          type="button"
          class="flex w-full items-center gap-2 rd-md px-2 py-1.5 text-left text-xs transition-colors hover:bg-[--vp-c-default-soft]"
          role="menuitem"
          @click="copyMarkdownLink"
        >
          <LinkIcon :size="13" class="shrink-0 text-[--vp-c-text-2]" />
          <span class="flex-auto">复制 Markdown 链接</span>
        </button>

        <a
          class="flex w-full items-center gap-2 rd-md px-2 py-1.5 text-xs transition-colors hover:bg-[--vp-c-default-soft] !no-underline"
          :href="markdownUrl"
          target="_blank"
          rel="noreferrer"
          role="menuitem"
          @click="close"
        >
          <span
            class="grid h-3.5 w-3.5 shrink-0 place-items-center rd-[3px] border border-current text-[8px] font-bold text-[--vp-c-text-2] leading-none"
            aria-hidden="true"
          >MD</span>
          <span class="flex-auto">查看 Markdown</span>
          <ArrowUpRightIcon :size="12" class="shrink-0 text-[--vp-c-text-3]" />
        </a>

        <a
          class="flex w-full items-center gap-2 rd-md px-2 py-1.5 text-xs transition-colors hover:bg-[--vp-c-default-soft] !no-underline"
          :href="chatgptUrl"
          target="_blank"
          rel="noreferrer"
          role="menuitem"
          @click="close"
        >
          <svg viewBox="0 0 24 24" class="h-3.5 w-3.5 shrink-0 text-[--vp-c-text-2]" fill="currentColor" aria-hidden="true">
            <path :d="OPENAI_PATH" />
          </svg>
          <span class="flex-auto">在 ChatGPT 中提问</span>
          <ArrowUpRightIcon :size="12" class="shrink-0 text-[--vp-c-text-3]" />
        </a>

        <a
          class="flex w-full items-center gap-2 rd-md px-2 py-1.5 text-xs transition-colors hover:bg-[--vp-c-default-soft] !no-underline"
          :href="qianwenUrl"
          target="_blank"
          rel="noreferrer"
          role="menuitem"
          @click="close"
        >
          <SIcon :icon="siQwen" class="h-3.5 w-3.5 shrink-0 text-[--vp-c-text-2]" />
          <span class="flex-auto">在千问中提问</span>
          <ArrowUpRightIcon :size="12" class="shrink-0 text-[--vp-c-text-3]" />
        </a>
      </div>
    </Transition>
  </div>
</template>
