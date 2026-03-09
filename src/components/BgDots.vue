<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let ctx = null
let dots = []
let mouseX = -1e5
let mouseY = -1e5
let rafId = null
const INFLUENCE_RADIUS = 260
const BASE_RADIUS = 0.5

function resize() {
  const canvas = canvasRef.value
  if (!canvas) return
  const isMobile = window.innerWidth < 768 || 'ontouchstart' in window
  const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2)
  const spacing = isMobile ? 28 : 22
  const w = window.innerWidth
  const h = window.innerHeight
  canvas.width = w * dpr
  canvas.height = h * dpr
  canvas.style.width = w + 'px'
  canvas.style.height = h + 'px'
  ctx = canvas.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  dots = []
  for (let x = 0; x <= w + spacing; x += spacing) {
    for (let y = 0; y <= h + spacing; y += spacing) {
      dots.push({ x, y })
    }
  }
  draw()
}

function draw() {
  if (!ctx || !canvasRef.value) return
  const w = window.innerWidth
  const h = window.innerHeight
  ctx.clearRect(0, 0, w, h)
  for (let i = 0; i < dots.length; i++) {
    const d = dots[i]
    const dx = d.x - mouseX
    const dy = d.y - mouseY
    const dist = Math.sqrt(dx * dx + dy * dy)
    const t = Math.max(0, 1 - dist / INFLUENCE_RADIUS)
    const radius = BASE_RADIUS + t * 0.4
    const alpha = 0.05 + t * 0.25
    ctx.fillStyle = `rgba(255,255,255,${alpha})`
    ctx.beginPath()
    ctx.arc(d.x, d.y, radius, 0, Math.PI * 2)
    ctx.fill()
  }
}

function onMove(e) {
  mouseX = e.clientX
  mouseY = e.clientY
  if (rafId === null) {
    rafId = requestAnimationFrame(() => {
      rafId = null
      draw()
    })
  }
}

function onLeave() {
  mouseX = -1e5
  mouseY = -1e5
  requestAnimationFrame(draw)
}

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('mouseleave', onLeave)
  document.body.addEventListener('mouseleave', onLeave)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseleave', onLeave)
  document.body.removeEventListener('mouseleave', onLeave)
})
</script>

<template>
  <canvas ref="canvasRef" id="bg-dots" class="bg-dots" aria-hidden="true" />
</template>
