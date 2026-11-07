<template>
  <div>
    <!-- Hero Editorial Banner -->
    <section class="relative bg-zinc-950 text-white min-h-[85vh] flex items-center justify-center overflow-hidden">
      <!-- Background Luxury Image with Gradient Overlay -->
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=85"
          alt="Aurelia Haute Joaillerie Fine Jewelry"
          fetchpriority="high"
          class="w-full h-full object-cover object-center opacity-40 scale-105 animate-pulse-subtle"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
        <div class="absolute inset-0 bg-radial-gradient from-transparent to-zinc-950/80"></div>
      </div>

      <!-- Hero Copy -->
      <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <span class="inline-block text-gold-400 text-xs sm:text-sm uppercase tracking-[0.35em] font-medium mb-4 animate-fade-in">
          High Jewelry Atelier · Paris & New York
        </span>
        <h1 class="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white mb-6 leading-[1.1] animate-slide-up">
          Modern Heirlooms <br class="hidden sm:inline" />
          <span class="italic font-light">Forged in Light</span>
        </h1>
        <p class="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto mb-10 leading-relaxed font-light">
          Sculptural fine jewelry handcrafted from 100% recycled 18k solid gold, conflict-free diamonds, and rare gemstones. Made to outlive generations.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink
            to="/products"
            class="w-full sm:w-auto px-8 py-3.5 bg-gold-500 text-zinc-950 text-xs uppercase tracking-widest font-semibold hover:bg-gold-400 transition-all shadow-glow"
          >
            Explore Collections
          </NuxtLink>
          <NuxtLink
            to="/products?category=rings"
            class="w-full sm:w-auto px-8 py-3.5 bg-white/10 backdrop-blur-md text-white border border-white/20 text-xs uppercase tracking-widest font-medium hover:bg-white/20 transition-all"
          >
            Engagement & Rings
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Value Proposition Ribbon -->
    <section class="border-b border-zinc-200/80 bg-white py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="flex items-center justify-center gap-3">
            <span class="text-gold-600 font-serif text-lg">✦</span>
            <span class="text-xs uppercase tracking-wider text-zinc-700 font-medium">100% Recycled 18K Gold</span>
          </div>
          <div class="flex items-center justify-center gap-3">
            <span class="text-gold-600 font-serif text-lg">✦</span>
            <span class="text-xs uppercase tracking-wider text-zinc-700 font-medium">Certified Ethical Diamonds</span>
          </div>
          <div class="flex items-center justify-center gap-3">
            <span class="text-gold-600 font-serif text-lg">✦</span>
            <span class="text-xs uppercase tracking-wider text-zinc-700 font-medium">Free Worldwide Express Delivery</span>
          </div>
          <div class="flex items-center justify-center gap-3">
            <span class="text-gold-600 font-serif text-lg">✦</span>
            <span class="text-xs uppercase tracking-wider text-zinc-700 font-medium">Lifetime Care & Resizing</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Collections Showcase -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center max-w-2xl mx-auto mb-14">
        <span class="text-xs uppercase tracking-[0.3em] text-gold-600 font-medium block mb-2">
          Curated Catalog
        </span>
        <h2 class="font-serif text-3xl sm:text-4xl text-zinc-900 font-normal">
          Explore by Collection
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <NuxtLink
          v-for="cat in categories"
          :key="cat.id"
          :to="`/products?category=${cat.slug}`"
          class="group relative aspect-[3/4] overflow-hidden bg-zinc-100 rounded-sm shadow-subtle"
        >
          <img
            :src="cat.image"
            :alt="cat.name"
            loading="lazy"
            class="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent"></div>
          <div class="absolute inset-x-4 bottom-5 text-white">
            <span class="text-[10px] uppercase tracking-widest text-gold-300 font-medium block mb-1">
              {{ cat.count }} Creations
            </span>
            <h3 class="font-serif text-xl sm:text-2xl font-normal group-hover:text-gold-200 transition-colors">
              {{ cat.name }}
            </h3>
            <span class="inline-flex items-center text-xs tracking-wider uppercase font-medium mt-2 text-zinc-300 group-hover:text-white transition-colors">
              Discover Line →
            </span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Featured Bestsellers Section -->
    <section class="bg-zinc-50/70 border-t border-b border-zinc-200/60 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span class="text-xs uppercase tracking-[0.3em] text-gold-600 font-medium block mb-2">
              Iconic Pieces
            </span>
            <h2 class="font-serif text-3xl sm:text-4xl text-zinc-900 font-normal">
              Most Coveted Creations
            </h2>
          </div>
          <NuxtLink
            to="/products"
            class="text-xs uppercase tracking-widest font-semibold text-zinc-900 hover:text-gold-600 flex items-center gap-1.5 transition-colors"
          >
            <span>View All Creations</span>
            <span>→</span>
          </NuxtLink>
        </div>

        <ProductGrid :products="bestsellers" :loading="pending" />
      </div>
    </section>

    <!-- Atelier Craftsmanship Editorial -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Editorial Images Collage -->
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
                alt="Jeweler setting diamond"
                loading="lazy"
                class="rounded-sm shadow-subtle object-cover aspect-[4/5] w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80"
                alt="Solid gold braided ring detail"
                loading="lazy"
                class="rounded-sm shadow-subtle object-cover aspect-[4/3] w-full"
              />
            </div>
            <div class="space-y-4 pt-8">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
                alt="Fine jewelry necklace"
                loading="lazy"
                class="rounded-sm shadow-subtle object-cover aspect-[4/3] w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1611591475155-4264754f931b?auto=format&fit=crop&w=800&q=80"
                alt="Platinum tennis bracelet"
                loading="lazy"
                class="rounded-sm shadow-subtle object-cover aspect-[4/5] w-full"
              />
            </div>
          </div>

          <!-- Editorial Narrative -->
          <div class="space-y-6">
            <span class="text-xs uppercase tracking-[0.3em] text-gold-600 font-medium block">
              The Philosophy
            </span>
            <h2 class="font-serif text-3xl sm:text-5xl text-zinc-900 font-normal leading-tight">
              Honoring Earth & Artisan Mastery
            </h2>
            <p class="text-sm text-zinc-600 leading-relaxed">
              We reject the opacity and ecological toll of conventional mining. Aurelia was founded on an unapologetic commitment: to create the world’s most mesmerizing fine jewelry without extraction harm.
            </p>
            <p class="text-sm text-zinc-600 leading-relaxed">
              Every ring, pendant, and cuff is forged in our carbon-neutral workshops utilizing 100% recycled 18k solid gold and certified ethical diamonds with identical chemical, physical, and optical atomic perfection.
            </p>

            <div class="pt-4 grid grid-cols-2 gap-6 border-t border-zinc-100">
              <div>
                <span class="block font-serif text-3xl text-zinc-900 font-normal">0%</span>
                <span class="text-xs text-zinc-500 uppercase tracking-wider">Newly Mined Gold</span>
              </div>
              <div>
                <span class="block font-serif text-3xl text-zinc-900 font-normal">100%</span>
                <span class="text-xs text-zinc-500 uppercase tracking-wider">Traceable Supply Chain</span>
              </div>
            </div>

            <div class="pt-4">
              <NuxtLink
                to="/about"
                class="inline-block px-7 py-3 text-xs uppercase tracking-widest font-semibold border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors"
              >
                Read Our Sustainability Charter
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Press Quotes Ribbon -->
    <section class="bg-zinc-950 text-white py-16 border-t border-zinc-800">
      <div class="max-w-5xl mx-auto px-4 text-center">
        <span class="text-xs uppercase tracking-[0.3em] text-gold-400 font-medium block mb-6">
          Critical Acclaim
        </span>
        <blockquote class="font-serif text-2xl sm:text-3xl font-light italic leading-relaxed text-zinc-200 mb-6">
          “Aurelia redefines haute joaillerie for the modern era—architectural silhouettes, flawless diamonds, and unmatched ethical transparency.”
        </blockquote>
        <div class="flex items-center justify-center gap-8 text-xs tracking-widest uppercase text-zinc-400 font-medium">
          <span>VOGUE</span>
          <span>·</span>
          <span>HARPER'S BAZAAR</span>
          <span>·</span>
          <span>ELLE DECOR</span>
          <span>·</span>
          <span>WALLPAPER*</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Product, CategorySummary } from '../types/product'

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || 'https://aurelia-jewelry.vercel.app'

// Comprehensive SEO Meta Tags
useSeoMeta({
  title: 'AURELIA | Haute Joaillerie & Ethical Fine Jewelry',
  ogTitle: 'AURELIA | Haute Joaillerie & Ethical Fine Jewelry',
  description: 'Handcrafted fine jewelry in recycled 18k solid gold, conflict-free diamonds, and rare gemstones. Free worldwide insured delivery & 30-day returns.',
  ogDescription: 'Handcrafted fine jewelry in recycled 18k solid gold, conflict-free diamonds, and rare gemstones. Free worldwide insured delivery & 30-day returns.',
  ogImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&h=630&q=85',
  ogUrl: siteUrl,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'AURELIA | Haute Joaillerie & Ethical Fine Jewelry',
  twitterDescription: 'Handcrafted fine jewelry in recycled 18k solid gold, conflict-free diamonds, and rare gemstones.',
  twitterImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&h=630&q=85',
})

useHead({
  link: [{ rel: 'canonical', href: siteUrl }],
})

// Fetch Products & Categories from Server API
const { data: productsData, pending } = await useFetch<{ products: Product[] }>('/api/products', {
  query: { limit: 8, sort: 'featured' },
})

const { data: categoriesData } = await useFetch<CategorySummary[]>('/api/categories')

const bestsellers = computed(() => productsData.value?.products || [])
const categories = computed(() => categoriesData.value || [])
</script>
