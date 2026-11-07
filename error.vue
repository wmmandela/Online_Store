<template>
  <div class="min-h-screen flex flex-col justify-between bg-[#FCFBF9] text-zinc-900">
    <AppHeader />

    <main class="flex-1 flex items-center justify-center p-6 text-center">
      <div class="max-w-md mx-auto space-y-4">
        <span class="font-mono text-xs uppercase tracking-widest text-gold-600 block">
          Error {{ error?.statusCode || 404 }}
        </span>
        <h1 class="font-serif text-3xl sm:text-4xl text-zinc-900 font-normal">
          Creation Not Found
        </h1>
        <p class="text-xs text-zinc-500 leading-relaxed">
          The fine jewelry page or creation you are seeking may have been renamed, removed, or is temporarily in our private exhibition vault.
        </p>
        <div class="pt-4 flex items-center justify-center gap-3">
          <NuxtLink
            to="/products"
            class="px-6 py-3 bg-zinc-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-gold-500 transition-colors"
          >
            Explore Jewelry Catalog
          </NuxtLink>
          <NuxtLink
            to="/"
            class="px-6 py-3 border border-zinc-300 text-zinc-800 text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
          >
            Return Home
          </NuxtLink>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

useSeoMeta({
  title: 'Page Not Found | AURELIA Fine Jewelry',
  robots: 'noindex, nofollow',
})
</script>
