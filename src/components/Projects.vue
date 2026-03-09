<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { projects as projectsData } from '@/data/projects'

const baseUrl = import.meta.env.BASE_URL
const trackRef = ref(null)
const position = ref(1)
const index = ref(0)
const count = projectsData.length
const totalSlides = count + 2
const TRANSITION = '0.4s cubic-bezier(0.22, 1, 0.36, 1)'
const AUTOPLAY_MS = 5500
let autoplayTimer = null

const slides = computed(() => {
  const list = [...projectsData]
  const last = list[list.length - 1]
  const first = list[0]
  return [last, ...list, first]
})

function setPosition(pos, noTransition) {
  if (!trackRef.value) return
  if (noTransition) {
    trackRef.value.style.transition = 'none'
    trackRef.value.style.transform = `translate3d(-${pos * 100}%, 0, 0)`
    trackRef.value.offsetHeight
    trackRef.value.style.transition = `transform ${TRANSITION}`
  } else {
    trackRef.value.style.transform = `translate3d(-${pos * 100}%, 0, 0)`
  }
}

function onTransitionEnd(e) {
  if (e.target !== trackRef.value || e.propertyName !== 'transform') return
  if (position.value === 0) {
    position.value = count
    index.value = count - 1
    setPosition(position.value, true)
  } else if (position.value === totalSlides - 1) {
    position.value = 1
    index.value = 0
    setPosition(position.value, true)
  }
}

function goNext() {
  position.value++
  setPosition(position.value, false)
  if (position.value === totalSlides - 1) return
  index.value = (index.value + 1) % count
}

function goPrev() {
  position.value--
  setPosition(position.value, false)
  if (position.value === 0) return
  index.value = (index.value - 1 + count) % count
}

function startAutoplay() {
  if (autoplayTimer) clearInterval(autoplayTimer)
  autoplayTimer = setInterval(goNext, AUTOPLAY_MS)
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

function goToSlide(j) {
  position.value = j + 1
  index.value = j
  setPosition(position.value, false)
  startAutoplay()
}

function onCardMouseMove(e) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  const maxTilt = 6
  el.style.transform = `perspective(1200px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg)`
}

function onCardMouseLeave(e) {
  e.currentTarget.style.transform = ''
}

onMounted(() => {
  setPosition(position.value, true)
  startAutoplay()
  trackRef.value?.addEventListener('transitionend', onTransitionEnd)
})

onUnmounted(() => {
  if (autoplayTimer) clearInterval(autoplayTimer)
  trackRef.value?.removeEventListener('transitionend', onTransitionEnd)
})
</script>

<template>
  <section id="projects" class="section-projects py-20 md:py-28 relative">
    <div class="section-inner max-w-5xl mx-auto px-4 sm:px-6 w-full">
      <p class="text-xs font-medium uppercase tracking-widest text-zinc-500 mb-4 text-center">Projects</p>
      <h2 class="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight mb-12 text-center">What I've done</h2>
      <div class="projects-carousel">
        <div
          class="projects-carousel-viewport"
          @mouseenter="stopAutoplay"
          @mouseleave="startAutoplay"
        >
          <div
            ref="trackRef"
            class="projects-carousel-inner"
            id="projects-track"
          >
            <div v-for="(project, i) in slides" :key="`${project.id}-${i}`" class="projects-carousel-slide-wrap">
              <article
                class="project-card project-card-tilt rounded-xl border border-border bg-zinc-900/30 backdrop-blur-sm overflow-hidden flex flex-col md:flex-row h-full"
                @mousemove="onCardMouseMove"
                @mouseleave="onCardMouseLeave"
              >
                <div class="project-card-image-wrap flex-shrink-0">
                <div class="project-card-image" aria-hidden="true">
                  <img :src="`${baseUrl}${project.image}`" alt="" class="project-card-img" width="800" height="480" />
                </div>
              </div>
              <div class="project-card-body p-4 md:p-5 flex flex-col flex-1 min-w-0">
                <h3 class="text-base font-semibold text-zinc-100 mb-1">{{ project.title }}</h3>
                <p class="text-xs text-zinc-500 mb-2">{{ project.subtitle }}</p>
                <ul class="project-tags flex flex-wrap gap-1.5 mb-3" aria-label="Contributions">
                  <li v-for="tag in project.tags" :key="tag"><span class="project-tag">{{ tag }}</span></li>
                </ul>
                <p class="text-sm text-zinc-400 leading-relaxed flex-1">{{ project.description }}</p>
              </div>
              </article>
            </div>
          </div>
        </div>
        <button type="button" class="projects-carousel-btn projects-carousel-prev" aria-label="Previous project" @click="goPrev(); startAutoplay()">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button type="button" class="projects-carousel-btn projects-carousel-next" aria-label="Next project" @click="goNext(); startAutoplay()">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>
        <div class="projects-dots" aria-label="Project slides">
          <button
            v-for="(p, i) of projectsData"
            :key="p.id"
            type="button"
            class="projects-dot"
            :class="{ active: i === index }"
            :aria-label="`Go to project ${i + 1}`"
            :aria-current="i === index ? 'true' : 'false'"
            @click="goToSlide(i)"
          />
        </div>
      </div>
    </div>
  </section>
</template>
