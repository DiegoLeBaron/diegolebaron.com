<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)

function update() {
  const scrollTop = window.scrollY ?? document.documentElement.scrollTop ?? 0
  const docHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight ?? 0
  )
  const scrollHeight = docHeight - window.innerHeight
  if (scrollHeight <= 0) return
  progress.value = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100))
}

onMounted(() => {
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
  window.addEventListener('load', update)
  update()
})

onUnmounted(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
  window.removeEventListener('load', update)
})
</script>

<template>
  <div id="scroll-progress" class="scroll-progress" aria-hidden="true">
    <div
      id="scroll-progress-bar"
      class="scroll-progress-bar"
      :style="{ width: progress + '%' }"
    />
  </div>
</template>
