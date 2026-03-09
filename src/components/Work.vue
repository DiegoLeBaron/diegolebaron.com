<script setup>
import { ref } from 'vue'
import { workPrimary, workMore } from '@/data/work'
import { monthsBetween, formatDuration } from '@/composables/useDuration'
import { inject } from 'vue'

const showMore = ref(false)
const openModal = inject('openTimelineModal')
const closeMobileNav = inject('closeMobileNav', () => {})

function duration(start, end) {
  return formatDuration(monthsBetween(start, end))
}

function onCardMouseMove(e) {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  const maxTilt = 10
  card.style.transform = `perspective(1200px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg)`
}

function onCardMouseLeave(e) {
  e.currentTarget.style.transform = ''
}

function openTimeline(modalId) {
  closeMobileNav()
  openModal?.(modalId)
}
</script>

<template>
  <section id="work" class="section-work py-20 md:py-28 text-center relative">
    <div class="section-inner max-w-4xl mx-auto px-4 sm:px-6 w-full">
      <p class="text-xs font-medium uppercase tracking-widest text-zinc-500 mb-4">Work</p>
      <h2 class="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight mb-12">Where I've done it</h2>
      <div class="work-cards-grid grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div v-for="job in workPrimary" :key="job.company" class="work-card-wrapper">
          <div
            class="work-card rounded-xl border border-border bg-zinc-900/30 p-5 flex flex-col h-full transition-transform duration-200 ease-out"
            @mousemove="onCardMouseMove"
            @mouseleave="onCardMouseLeave"
          >
            <div class="work-card-top flex items-start justify-between gap-2 mb-3">
              <span class="text-xs font-medium uppercase tracking-wider text-accent">{{ job.dateLabel }}</span>
              <span class="work-card-total text-xs text-zinc-500 flex-shrink-0">{{ duration(job.dateStart, job.dateEnd) }}</span>
            </div>
            <h3 class="text-lg font-semibold text-zinc-100">
              <a :href="job.url" target="_blank" rel="noopener" class="work-card-company-link">{{ job.company }}</a>
            </h3>
            <p class="text-sm text-zinc-500 mt-0.5">{{ job.industry }}</p>
            <p class="mt-3 text-sm text-zinc-400 flex-1">{{ job.description }}</p>
            <button
              v-if="job.timelineModalId"
              type="button"
              class="work-timeline-toggle mt-4 block text-left text-sm text-accent hover:underline"
              @click="openTimeline(job.timelineModalId)"
            >
              Expand timeline
            </button>
          </div>
        </div>
      </div>
      <div class="mt-8 flex justify-center">
        <button
          type="button"
          id="work-view-more"
          class="work-view-more px-6 py-3 rounded-full border border-border bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 hover:border-zinc-600 transition-colors text-sm font-medium"
          @click="showMore = !showMore"
        >
          {{ showMore ? 'View less' : 'View more' }}
        </button>
      </div>
      <div v-show="showMore" class="work-cards-grid grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-6">
        <div v-for="job in workMore" :key="job.company" class="work-card-wrapper">
          <div
            class="work-card rounded-xl border border-border bg-zinc-900/30 p-5 flex flex-col h-full transition-transform duration-200 ease-out"
            @mousemove="onCardMouseMove"
            @mouseleave="onCardMouseLeave"
          >
            <div class="work-card-top flex items-start justify-between gap-2 mb-3">
              <span class="text-xs font-medium uppercase tracking-wider text-zinc-500">{{ job.dateLabel }}</span>
              <span class="work-card-total text-xs text-zinc-500 flex-shrink-0">{{ duration(job.dateStart, job.dateEnd) }}</span>
            </div>
            <h3 class="text-lg font-semibold text-zinc-100">
              <a :href="job.url" target="_blank" rel="noopener" class="work-card-company-link">{{ job.company }}</a>
            </h3>
            <p class="text-sm text-zinc-500 mt-0.5">{{ job.industry }}</p>
            <p class="mt-3 text-sm text-zinc-400 flex-1">{{ job.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
