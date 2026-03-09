<script setup>
import { techIcons } from '@/data/techIcons'
</script>

<template>
  <section id="stack" class="section-stack section-merge py-20 md:py-28 text-center relative">
    <div class="section-inner max-w-4xl mx-auto px-4 sm:px-6 w-full">
      <p class="text-xs font-medium uppercase tracking-widest text-zinc-500 mb-4">Skills</p>
      <h2 class="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight mb-4">Tools and resources that power my workflow</h2>
      <p class="text-zinc-400 mb-12 max-w-2xl mx-auto">Technologies and systems I use day to day.</p>
      <div class="tech-icons-grid mx-auto">
        <div
          v-for="tech in techIcons"
          :key="tech.name"
          class="tech-icon-cell"
          :class="tech.cssClass"
          :title="tech.name"
        >
          <img v-if="tech.src" :src="tech.src" :alt="tech.name" />
          <span v-else>{{ tech.text ?? tech.name }}</span>
          <span class="tech-icon-tooltip">{{ tech.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
