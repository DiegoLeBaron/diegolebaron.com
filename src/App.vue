<script setup>
import { ref, provide, onMounted, onUnmounted, watch } from 'vue'
import Lenis from 'lenis'
import PageLoader from './components/PageLoader.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import BgGradient from './components/BgGradient.vue'
import BgDots from './components/BgDots.vue'
import Header from './components/Header.vue'
import MobileNav from './components/MobileNav.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Projects from './components/Projects.vue'
import Work from './components/Work.vue'
import Stack from './components/Stack.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import TimelineModal from './components/TimelineModal.vue'
import { timelineVizypay, timelineMyriad } from './data/work'

let lenis = null

const mobileNavOpen = ref(false)
const openModalId = ref(null)

function scrollTo(el) {
  if (lenis && typeof lenis.scrollTo === 'function') {
    lenis.scrollTo(el, { offset: 0, duration: 1.2 })
  } else {
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

let switchSound = null
function initSounds() {
  try {
    switchSound = new Audio('/sounds/switch-page.mp3')
  } catch (_) {}
}

function playSwitch() {
  if (switchSound) {
    switchSound.currentTime = 0
    switchSound.play().catch(() => {})
  }
}

function closeMobileNav() {
  mobileNavOpen.value = false
  document.body.style.overflow = ''
}

function openTimelineModal(id) {
  openModalId.value = id
}

function closeTimelineModal() {
  openModalId.value = null
}

provide('scrollTo', scrollTo)
provide('playSwitch', playSwitch)
provide('closeMobileNav', closeMobileNav)
provide('openTimelineModal', openTimelineModal)

function handleHashClick(e) {
  const a = e.target.closest('a[href^="#"]')
  if (!a || a.classList.contains('hero-scroll-down')) return
  const href = a.getAttribute('href')
  if (href === '#') return
  const id = href.slice(1)
  const target = document.getElementById(id)
  if (target) {
    e.preventDefault()
    playSwitch()
    scrollTo(target)
  }
}

watch(openModalId, (id) => {
  if (id) {
    document.body.classList.add('modal-open')
    document.body.style.overflow = 'hidden'
  } else {
    document.body.classList.remove('modal-open')
    document.body.style.overflow = ''
  }
})

function onKeydown(e) {
  if (e.key === 'Escape' && openModalId.value) {
    closeTimelineModal()
  }
}

onMounted(() => {
  initSounds()
  document.addEventListener('click', handleHashClick)
  document.addEventListener('keydown', onKeydown)

  const isMobile = window.innerWidth < 768 || 'ontouchstart' in window
  if (!isMobile) {
    lenis = new Lenis({ lerp: 0.08, smoothWheel: true, syncTouch: false })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    window.lenis = lenis
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleHashClick)
  document.removeEventListener('keydown', onKeydown)
  if (lenis) lenis.destroy()
})

const timelineModals = [
  { id: 'timeline-modal-vizypay', title: 'VizyPay', items: timelineVizypay },
  { id: 'timeline-modal-myriad', title: 'Myriad Advisor Solutions', items: timelineMyriad },
]
</script>

<template>
  <div class="body-dark text-zinc-100 antialiased font-sans relative overflow-x-hidden">
    <PageLoader />
    <ScrollProgress />
    <BgGradient />
    <BgDots />
    <Header :mobile-nav-open="mobileNavOpen" @toggle-mobile-nav="mobileNavOpen = !mobileNavOpen" />
    <MobileNav :open="mobileNavOpen" @close="closeMobileNav" />

    <main class="w-full relative z-10">
      <Hero />
      <About />
      <Projects />
      <Work />
      <Stack />
      <Contact />
      <Footer />
    </main>

    <TimelineModal
      v-for="modal in timelineModals"
      :key="modal.id"
      :id="modal.id"
      :title="modal.title"
      :items="modal.items"
      :open="openModalId === modal.id"
      @close="closeTimelineModal"
    />
  </div>
</template>
