import { computed, onMounted, ref } from 'vue'

const imgs = ref<string[]>([])
const index = ref(0)

const currentImg = computed(() => imgs.value[index.value])
const isFirst = computed(() => index.value === 0)
const isLast = computed(() => index.value === imgs.value.length - 1)

export function usePreviewImg() {
  let previewImgDom: HTMLDialogElement | null

  function show(imgList: string[], i = 0) {
    imgs.value = imgList
    index.value = i
    previewImgDom?.showModal()
  }

  function close() {
    previewImgDom?.close()
    imgs.value = []
    index.value = 0
  }

  function prev() {
    if (isFirst.value)
      return
    index.value--
  }

  function next() {
    if (isLast.value)
      return
    index.value++
  }

  onMounted(() => {
    previewImgDom = document.querySelector('dialog#preview-img')
    if (!previewImgDom) {
      throw new Error('缺少全局 DialogPreviewImg 组件')
    }
  })

  return {
    currentImg,
    isFirst,
    isLast,
    show,
    prev,
    next,
    close,
  }
}
