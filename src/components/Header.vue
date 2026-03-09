<script setup>
defineProps({
  mobileNavOpen: Boolean,
})

const emit = defineEmits(['toggle-mobile-nav'])
</script>

<template>
  <header class="header-bar flex flex-col md:flex-row md:items-center md:justify-center pt-0 md:pt-6 px-3 md:px-6 pointer-events-none gap-0 md:gap-0 md:fixed md:top-0 md:left-0 md:right-0 md:z-30">
    <nav class="nav-pill flex flex-row pointer-events-auto items-center justify-between md:justify-center gap-2 md:gap-1 px-3 md:px-5 py-2.5 md:py-2.5 rounded-none md:rounded-full md:bg-white/5 md:backdrop-blur-xl md:border md:border-white/10 md:shadow-lg w-full md:max-w-none md:w-auto border-b border-white/10 md:border-b-0">
      <a href="#home" class="header-logo font-bold text-lg md:text-sm text-zinc-100 tracking-tight py-1 md:mr-4">Diego</a>
      <div class="nav-links hidden md:flex flex-wrap gap-0.5 md:contents">
        <a href="#home" class="nav-link px-2.5 py-1.5 md:px-3 rounded-full text-xs md:text-sm text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-colors">Home</a>
        <a href="#about" class="nav-link px-2.5 py-1.5 md:px-3 rounded-full text-xs md:text-sm text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-colors">About</a>
        <a href="#projects" class="nav-link px-2.5 py-1.5 md:px-3 rounded-full text-xs md:text-sm text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-colors">Projects</a>
        <a href="#work" class="nav-link px-2.5 py-1.5 md:px-3 rounded-full text-xs md:text-sm text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-colors">Work</a>
        <a href="#stack" class="nav-link px-2.5 py-1.5 md:px-3 rounded-full text-xs md:text-sm text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-colors">Skills</a>
        <a href="#contact" class="nav-link px-2.5 py-1.5 md:px-3 rounded-full text-xs md:text-sm text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-colors">Contact</a>
      </div>
      <button
        type="button"
        class="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-colors"
        aria-label="Open menu"
        :aria-expanded="mobileNavOpen"
        aria-controls="mobile-nav"
        @click="emit('toggle-mobile-nav')"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </nav>
  </header>
</template>
