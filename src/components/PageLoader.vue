<script setup>
import { ref, onMounted } from 'vue'

const visible = ref(false)

function openCurtains() {
  visible.value = true
}

onMounted(() => {
  if (document.readyState === 'complete') {
    requestAnimationFrame(() => requestAnimationFrame(openCurtains))
  } else {
    window.addEventListener('load', () => {
      requestAnimationFrame(() => requestAnimationFrame(openCurtains))
    })
  }
})
</script>

<template>
  <div
    class="page-loader"
    :class="{ 'is-open': visible }"
    aria-hidden="true"
  >
    <div class="page-loader-curtain page-loader-curtain--left">
      <div class="page-loader-line" aria-hidden="true" />
    </div>
    <div class="page-loader-curtain page-loader-curtain--right">
      <div class="page-loader-line" aria-hidden="true" />
    </div>
  </div>
</template>
