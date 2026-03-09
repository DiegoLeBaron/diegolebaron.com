<script setup>
defineProps({
  open: Boolean,
})

const emit = defineEmits(['close'])
</script>

<template>
  <div
    id="mobile-nav"
    class="mobile-nav"
    :class="{
      'mobile-nav-closed': !open,
      'is-open': open,
    }"
    aria-hidden="!open"
    aria-label="Mobile menu"
  >
    <div
      class="mobile-nav-backdrop"
      aria-hidden="true"
      @click="emit('close')"
    />
    <div class="mobile-nav-panel" id="mobile-nav-panel" role="dialog" aria-label="Navigation">
      <button type="button" class="mobile-nav-close" aria-label="Close menu" @click="emit('close')">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
      <nav class="mobile-nav-links" aria-label="Navigation">
        <a href="#home" class="mobile-nav-link block py-3 text-lg text-zinc-300 hover:text-zinc-100 transition-colors" @click="emit('close')">Home</a>
        <a href="#about" class="mobile-nav-link block py-3 text-lg text-zinc-300 hover:text-zinc-100 transition-colors" @click="emit('close')">About</a>
        <a href="#projects" class="mobile-nav-link block py-3 text-lg text-zinc-300 hover:text-zinc-100 transition-colors" @click="emit('close')">Projects</a>
        <a href="#work" class="mobile-nav-link block py-3 text-lg text-zinc-300 hover:text-zinc-100 transition-colors" @click="emit('close')">Work</a>
        <a href="#stack" class="mobile-nav-link block py-3 text-lg text-zinc-300 hover:text-zinc-100 transition-colors" @click="emit('close')">Skills</a>
        <a href="#contact" class="mobile-nav-link block py-3 text-lg text-zinc-300 hover:text-zinc-100 transition-colors" @click="emit('close')">Contact</a>
      </nav>
    </div>
  </div>
</template>
