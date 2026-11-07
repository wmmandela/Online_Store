<template>
  <Teleport to="body">
    <div
      v-if="isOpen && product"
      class="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      :aria-label="`Quick view for ${product.name}`"
    >
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        @click="closeQuickView"
      ></div>

      <div class="min-h-full flex items-center justify-center p-4 sm:p-6 text-center">
        <div class="relative w-full max-w-3xl bg-white text-left shadow-2xl rounded-sm overflow-hidden transform transition-all my-8">
          <!-- Close button -->
          <button
            type="button"
            @click="closeQuickView"
            class="absolute top-4 right-4 z-10 p-2 text-zinc-400 hover:text-zinc-900 bg-white/80 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="grid grid-cols-1 md:grid-cols-2">
            <!-- Image Carousel/Gallery -->
            <div class="relative bg-zinc-50 aspect-square md:aspect-auto h-full">
              <img
                :src="selectedImage || product.images[0]"
                :alt="product.name"
                class="w-full h-full object-cover object-center"
              />
              <div
                v-if="product.images.length > 1"
                class="absolute bottom-3 inset-x-3 flex justify-center gap-2"
              >
                <button
                  v-for="(img, idx) in product.images"
                  :key="idx"
                  type="button"
                  @click="selectedImage = img"
                  class="w-2.5 h-2.5 rounded-full border border-white transition-all"
                  :class="selectedImage === img || (!selectedImage && idx === 0) ? 'bg-zinc-900 scale-125' : 'bg-white/70'"
                ></button>
              </div>
            </div>

            <!-- Details Panel -->
            <div class="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between text-xs text-zinc-500 mb-2">
                  <span class="uppercase tracking-widest text-gold-600 font-medium">
                    {{ product.categoryLabel }}
                  </span>
                  <StarRating :rating="product.rating" :count="product.reviewCount" />
                </div>

                <h2 class="font-serif text-2xl text-zinc-900 font-medium mb-2">
                  {{ product.name }}
                </h2>

                <div class="flex items-baseline gap-2 mb-4">
                  <span class="font-sans text-xl font-medium text-zinc-900">
                    {{ formatPrice(product.price) }}
                  </span>
                  <span v-if="product.compareAtPrice" class="text-sm text-zinc-400 line-through">
                    {{ formatPrice(product.compareAtPrice) }}
                  </span>
                </div>

                <p class="text-xs text-zinc-600 line-clamp-3 mb-5 leading-relaxed">
                  {{ product.shortDescription }}
                </p>

                <!-- Size Selector (if applicable) -->
                <div v-if="product.sizes && product.sizes.length > 0" class="mb-5">
                  <label class="block text-xs font-medium uppercase tracking-wider text-zinc-700 mb-2">
                    Select Size
                  </label>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="size in product.sizes"
                      :key="size"
                      type="button"
                      @click="selectedSize = size"
                      class="px-3 py-1.5 text-xs font-medium border transition-colors"
                      :class="selectedSize === size ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 text-zinc-700 hover:border-zinc-400'"
                    >
                      {{ size }}
                    </button>
                  </div>
                </div>

                <!-- Key Attributes -->
                <div class="text-[11px] text-zinc-500 space-y-1 mb-6 bg-zinc-50 p-3 rounded-sm">
                  <div><strong>Material:</strong> {{ product.material }}</div>
                  <div v-if="product.gemstone !== 'None'"><strong>Gemstone:</strong> {{ product.gemstone }}</div>
                  <div v-if="product.carat"><strong>Carat Weight:</strong> {{ product.carat }} ctw</div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="space-y-2 pt-2">
                <button
                  type="button"
                  @click="handleAddToCart"
                  :disabled="!product.inStock"
                  class="w-full py-3 bg-zinc-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-gold-500 transition-colors disabled:opacity-50"
                >
                  {{ product.inStock ? 'Add to Shopping Bag' : 'Out of Stock' }}
                </button>

                <NuxtLink
                  :to="`/products/${product.slug}`"
                  @click="closeQuickView"
                  class="w-full block py-2 text-center text-xs text-zinc-500 hover:text-zinc-900 underline underline-offset-4 transition-colors"
                >
                  View Full Product Details & Sizing Guide →
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { isOpen, product, closeQuickView } = useQuickView()
const { formatPrice } = useCurrency()
const cartStore = useCartStore()
const { showToast } = useToast()

const selectedImage = ref<string>('')
const selectedSize = ref<string>('')

watch(
  () => product.value,
  (newVal) => {
    if (newVal) {
      selectedImage.value = newVal.images[0] || ''
      selectedSize.value = newVal.sizes?.[0] || ''
    }
  },
  { immediate: true }
)

const handleAddToCart = () => {
  if (!product.value || !product.value.inStock) return

  cartStore.addToCart(product.value, 1, selectedSize.value)
  showToast({
    title: 'Added to Bag',
    message: `${product.value.name} ${selectedSize.value ? `(Size ${selectedSize.value})` : ''}`,
    type: 'success',
  })
  closeQuickView()
}
</script>
