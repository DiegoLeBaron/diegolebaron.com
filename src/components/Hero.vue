<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'

const scrollTo = inject('scrollTo')
const playSwitch = inject('playSwitch', () => {})

const roles = ['Full-Stack Engineer', 'Designer', 'UI/UX Developer', 'Infrastructure & IT', 'Certified ScrumMaster']
const roleIndex = ref(0)
let intervalId = null

function updateRole() {
  roleIndex.value = (roleIndex.value + 1) % roles.length
}

function goToAbout(e) {
  e.preventDefault()
  playSwitch()
  const el = document.getElementById('about')
  if (el && scrollTo) scrollTo(el)
}

onMounted(() => {
  updateRole()
  intervalId = setInterval(updateRole, 2800)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <section id="home" class="hero-section min-h-screen flex flex-col justify-center pt-16 md:pt-32 pb-16 text-center relative">
    <div class="section-inner max-w-4xl mx-auto px-4 sm:px-6 w-full">
      <h1 class="hero-headline text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-100 tracking-tight leading-tight mb-8">
        <span class="block">I design and build products that</span>
        <span class="block mt-1">deliver <span class="hero-impact">real impact</span></span>
      </h1>
      <div class="hero-intro">
        <p class="text-xl md:text-2xl text-zinc-400 mb-3">Hello, I'm Diego LeBaron</p>
        <div class="hero-role-bubble mt-3" aria-live="polite">
          <div
            class="hero-role-track"
            :style="{ transform: `translateY(-${roleIndex * 3}rem)` }"
          >
            <span v-for="(role, i) of roles" :key="i" class="hero-role-item">{{ role }}</span>
          </div>
        </div>
        <p class="text-zinc-400 mt-6">
          <span class="text-zinc-500">Let's Connect</span>
          <a href="mailto:diego@diegolebaron.com" class="text-accent hover:underline ml-2">diego@diegolebaron.com</a>
        </p>
      </div>
    </div>
    <a
      href="#about"
      class="hero-scroll-down absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors"
      aria-label="Scroll to content"
      @click.prevent="goToAbout"
    >
      <span class="text-xs uppercase tracking-widest">Scroll</span>
      <svg class="w-6 h-6 animate-bounce-down" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
    </a>
  </section>
</template>
