<script lang="ts" setup>
import { useTemplateRef } from 'vue'

withDefaults(
  defineProps<{
    src: string
    alt?: string
    width?: string | number
    height?: string | number
    loading?: 'lazy' | 'eager'
  }>(),
  { loading: 'lazy' },
)

const dialogRef = useTemplateRef('dialog')

function preview() {
  dialogRef.value?.showModal()
}

function close() {
  // 关闭动画
  dialogRef.value?.classList.add('leaving')
  dialogRef.value?.addEventListener(
    'animationend',
    () => {
      dialogRef.value?.close()
      dialogRef.value?.classList.remove('leaving')
    },
    { once: true },
  )
}
</script>

<template>
  <div>
    <img class="cursor-zoom-in w-full aspect-ratio-square object-cover" v-bind="$props" @click="preview">
    <Teleport to="body">
      <dialog ref="dialog" @click="close">
        <div tabindex="0" />
        <img class="h-9/10 object-contain" :src="src" :alt="alt">
      </dialog>
    </Teleport>
  </div>
</template>

<style scoped>
:root {
  --dialog-backdrop: rgba(255, 255, 255, 0.5);
}

.dark {
  --dialog-backdrop: rgba(0, 0, 0, 0.5);
}

dialog::backdrop {
  background-color: var(--dialog-backdrop);
  backdrop-filter: blur(20px);
}

dialog:modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: var(--vp-c-text-1);
  background: transparent;
  border: 0;
  padding: 0;
  animation: fadeInUp 0.15s;
}

dialog.leaving {
  animation: fadeOutDown 0.15s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 20%, 0);
  }

  to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeOutDown {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, 20%, 0);
  }
}
</style>
