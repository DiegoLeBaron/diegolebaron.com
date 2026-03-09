<script setup>
import { ref, watch } from 'vue'
import { formatDuration, monthsBetween } from '@/composables/useDuration'

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
  items: { type: Array, required: true },
  open: Boolean,
})

const emit = defineEmits(['close'])

const panelRef = ref(null)
const isOpen = ref(false)

watch(() => props.open, (val) => {
  isOpen.value = !!val
}, { immediate: true })

function close() {
  isOpen.value = false
}

function duration(start, end) {
  return formatDuration(monthsBetween(start, end))
}

function onBackdropClick() {
  close()
}

function onPanelTransitionEnd(e) {
  if (panelRef.value && e.target === panelRef.value && e.propertyName === 'transform' && !isOpen.value) {
    emit('close')
  }
}
</script>

<template>
  <div
    v-show="open"
    :id="id"
    class="timeline-modal"
    :class="{ 'is-open': isOpen, hidden: !open }"
    role="dialog"
    :aria-labelledby="id + '-title'"
    aria-modal="true"
  >
    <div class="timeline-modal-backdrop" @click="onBackdropClick" />
    <div ref="panelRef" class="timeline-modal-panel" @transitionend="onPanelTransitionEnd">
      <div class="timeline-modal-header">
        <h2 :id="id + '-title'" class="timeline-modal-title">{{ title }}</h2>
        <button type="button" class="timeline-modal-close" aria-label="Close modal" @click="close">
          <svg class="timeline-modal-close-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="work-timeline">
        <div
          v-for="(item, i) in items"
          :key="i"
          class="work-timeline-item"
        >
          <div class="work-timeline-item-header">
            <div>
              <span
                class="text-xs font-medium uppercase tracking-wider"
                :class="item.accent ? 'text-accent' : 'text-zinc-500'"
              >
                {{ item.dateLabel }}
              </span>
              <p class="text-sm font-medium text-zinc-100 mt-0.5">{{ item.title }}</p>
            </div>
            <span class="work-timeline-duration">{{ duration(item.dateStart, item.dateEnd) }}</span>
          </div>
          <p class="text-sm text-zinc-400 mt-1">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
