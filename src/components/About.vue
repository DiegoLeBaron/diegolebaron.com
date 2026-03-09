<script setup>
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
</script>

<template>
  <section id="about" class="section-about section-merge py-20 md:py-28 relative">
    <div class="section-inner max-w-5xl mx-auto px-4 sm:px-6 w-full">
      <p class="text-xs font-medium uppercase tracking-widest text-zinc-500 mb-4 text-center">About</p>
      <h2 class="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight mb-12 text-center">Building the bridge between ideas and experiences</h2>
      <div class="about-cards flex flex-col md:flex-row items-stretch gap-5 md:gap-6 text-left">
        <div
          class="about-photo-card flex-shrink-0 rounded-xl border border-border bg-zinc-900/30 backdrop-blur-sm overflow-hidden flex flex-col items-center justify-center p-4"
          @mousemove="onCardMouseMove"
          @mouseleave="onCardMouseLeave"
        >
          <div class="about-photo-wrap">
            <img src="/assets/images/photo.png" alt="Diego LeBaron" class="about-photo" width="280" height="320" />
          </div>
        </div>
        <div
          class="about-text-card flex-1 min-w-0 rounded-xl border border-border bg-zinc-900/30 backdrop-blur-sm p-5 md:p-6 flex flex-col"
          @mousemove="onCardMouseMove"
          @mouseleave="onCardMouseLeave"
        >
          <div class="about-text">
            <p class="text-zinc-400 leading-relaxed">
              I'm Diego LeBaron—a Full-Stack Engineer from Waukee, Iowa. I build and ship production systems end-to-end, working with modern tools across the stack—from Angular and Nest.js to Vue, TypeScript, Laravel, and PHP—depending on the product. Nine-plus years in the stack has sharpened a focus on clean architecture, scalable APIs, and interfaces that perform. Certified ScrumMaster and IT Consultant by trade; engineer by craft.
            </p>
            <p class="text-zinc-400 leading-relaxed mt-4">
              Currently a Full-Stack Engineer at VizyPay (fintech) and Director of IT at Genuine Painting Inc.
            </p>
            <div class="flex items-center gap-6 mt-8">
              <a href="https://www.linkedin.com/in/diego-lebaron/" target="_blank" rel="noopener noreferrer" class="text-zinc-400 hover:text-zinc-100 transition-colors" aria-label="LinkedIn">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://github.com/diegolebaron" target="_blank" rel="noopener noreferrer" class="text-zinc-400 hover:text-zinc-100 transition-colors" aria-label="GitHub">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="mailto:diego@diegolebaron.com" class="text-zinc-400 hover:text-zinc-100 transition-colors" aria-label="Email">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
