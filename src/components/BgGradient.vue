<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const el = ref(null)
const isMobile = ref(false)

function update() {
  if (!el.value || isMobile.value) return
  const y = window.scrollY ?? document.documentElement.scrollTop ?? 0
  el.value.style.transform = `translate3d(0,${y * 0.025}px,0)`
}

function checkMobile() {
  isMobile.value = window.innerWidth < 768 || 'ontouchstart' in window
}

onMounted(() => {
  checkMobile()
  if (!isMobile.value) {
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', () => {
      checkMobile()
      update()
    })
    update()
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
})
</script>

<template>
  <div ref="el" id="bg-gradient" class="bg-gradient" aria-hidden="true" />
</template>
