<template>
  <div class="group relative flex flex-col bg-white border border-zinc-100 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-elevated hover:border-zinc-200">
    <!-- Image Area with Dual Hover Swap -->
    <div class="relative aspect-[4/5] w-full overflow-hidden bg-zinc-50">
      <NuxtLink :to="`/products/${product.slug}`" class="block w-full h-full">
        <!-- Primary Image -->
        <img
          :src="primaryImage"
          :alt="product.name"
          loading="lazy"
          decoding="async"
          width="600"
          height="750"
          class="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
          :class="{ 'opacity-0 absolute inset-0 group-hover:opacity-100': secondaryImage }"
        />
        <!-- Secondary Image on Hover (if available) -->
        <img
          v-if="secondaryImage"
          :src="secondaryImage"
          :alt="`${product.name} alternate view`"
          loading="lazy"
          decoding="async"
          width="600"
          height="750"
          class="w-full h-full object-cover object-center transition-all duration-700 ease-out opacity-0 group-hover:opacity-100 absolute inset-0"
        />
      </NuxtLink>

      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
        <span
          v-if="product.isBestseller"
          class="inline-flex items-center px-2 py-0.5 text-[10px] uppercase font-semibold tracking-widest bg-zinc-900 text-white rounded-none"
        >
          Bestseller
        </span>
        <span
          v-else-if="product.isNew"
          class="inline-flex items-center px-2 py-0.5 text-[10px] uppercase font-semibold tracking-widest bg-gold-500 text-white rounded-none"
        >
          New Arrival
        </span>
        <span
          v-if="discountPercentage"
          class="inline-flex items-center px-2 py-0.5 text-[10px] uppercase font-semibold tracking-widest bg-rose-900 text-rose-50 rounded-none"
        >
          -{{ discountPercentage }}%
        </span>
      </div>

      <!-- Quick Action Overlay Buttons -->
      <div class="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
        <button
          type="button"
          @click.stop="quickView"
          class="flex-1 py-2 px-3 text-xs tracking-wider uppercase font-medium bg-white/95 text-zinc-900 backdrop-blur-sm border border-zinc-200 hover:bg-zinc-900 hover:text-white transition-colors text-center shadow-subtle"
        >
          Quick View
        </button>
        <button
          type="button"
          @click.stop="handleQuickAdd"
          :disabled="!product.inStock || adding"
          class="py-2 px-3 text-xs tracking-wider uppercase font-medium bg-zinc-900 text-white hover:bg-gold-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-subtle"
          :aria-label="`Add ${product.name} to bag`"
        >
          <svg v-if="!adding" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Product Meta Content -->
    <div class="p-4 flex flex-col flex-1">
      <div class="flex items-center justify-between text-xs text-zinc-500 mb-1">
        <span class="tracking-widest uppercase text-[11px] font-medium text-gold-600">
          {{ product.material }}
        </span>
        <StarRating :rating="product.rating" :count="product.reviewCount" />
      </div>

      <h3 class="font-serif text-base text-zinc-900 font-medium tracking-wide line-clamp-1 group-hover:text-gold-600 transition-colors mb-1">
        <NuxtLink :to="`/products/${product.slug}`">
          {{ product.name }}
        </NuxtLink>
      </h3>

      <p class="text-xs text-zinc-500 line-clamp-1 mb-3">
        {{ product.gemstone !== 'None' ? `${product.gemstone} · ` : '' }}{{ product.categoryLabel }}
      </p>

      <div class="mt-auto pt-2 border-t border-zinc-100 flex items-baseline gap-2">
        <span class="font-sans font-medium text-zinc-900 text-sm sm:text-base">
          {{ formatPrice(product.price) }}
        </span>
        <span v-if="product.compareAtPrice" class="text-xs text-zinc-400 line-through">
          {{ formatPrice(product.compareAtPrice) }}
        </span>
        <span v-if="!product.inStock" class="ml-auto text-[11px] text-rose-600 font-medium">
          Out of Stock
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../types/product'

const props = defineProps<{
  product: Product
}>()

const { formatPrice } = useCurrency()
const cartStore = useCartStore()
const { showToast } = useToast()
const { openQuickView } = useQuickView()

const adding = ref(false)

const primaryImage = computed(() => props.product.images[0] || '')
const secondaryImage = computed(() => props.product.images[1] || '')

const discountPercentage = computed(() => {
  if (props.product.compareAtPrice && props.product.compareAtPrice > props.product.price) {
    return Math.round(((props.product.compareAtPrice - props.product.price) / props.product.compareAtPrice) * 100)
  }
  return 0
})

const quickView = () => {
  openQuickView(props.product)
}

const handleQuickAdd = async () => {
  if (!props.product.inStock || adding.value) return
  adding.value = true

  // default to first size if available
  const defaultSize = props.product.sizes?.[0]

  try {
    cartStore.addToCart(props.product, 1, defaultSize)
    showToast({
      title: 'Added to Bag',
      message: `${props.product.name} ${defaultSize ? `(Size ${defaultSize})` : ''}`,
      type: 'success',
    })
  } finally {
    setTimeout(() => {
      adding.value = false
    }, 400)
  }
}
</script>
