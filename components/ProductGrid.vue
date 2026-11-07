<template>
  <div>
    <!-- Loading Skeleton Grid -->
    <div
      v-if="loading"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
    >
      <div
        v-for="i in 8"
        :key="i"
        class="bg-white border border-zinc-100 rounded-sm overflow-hidden animate-pulse"
      >
        <div class="aspect-[4/5] bg-zinc-100 w-full"></div>
        <div class="p-4 space-y-2.5">
          <div class="h-3 bg-zinc-100 w-1/3"></div>
          <div class="h-4 bg-zinc-100 w-3/4"></div>
          <div class="h-3 bg-zinc-100 w-1/2"></div>
          <div class="h-4 bg-zinc-100 w-1/4 pt-2"></div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="products.length === 0"
      class="py-16 px-4 text-center border border-dashed border-zinc-200 rounded-sm bg-zinc-50/50"
    >
      <div class="w-12 h-12 mx-auto mb-3 text-zinc-400">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 class="font-serif text-xl text-zinc-900 mb-1">No jewelry found</h3>
      <p class="text-sm text-zinc-500 max-w-sm mx-auto mb-5">
        We could not find any creations matching your selected criteria. Try adjusting your filters or search terms.
      </p>
      <button
        type="button"
        @click="$emit('reset')"
        class="inline-flex items-center px-4 py-2 text-xs uppercase tracking-widest font-medium bg-zinc-900 text-white hover:bg-gold-500 transition-colors"
      >
        Reset Filters
      </button>
    </div>

    <!-- Active Products Grid -->
    <div
      v-else
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../types/product'

defineProps<{
  products: Product[]
  loading?: boolean
}>()

defineEmits<{
  (e: 'reset'): void
}>()
</script>
