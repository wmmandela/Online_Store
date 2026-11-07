<template>
  <Teleport to="body">
    <div
      v-if="cartStore.isOpen"
      class="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        @click="cartStore.closeDrawer"
      ></div>

      <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div class="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
          <!-- Drawer Header -->
          <div class="p-5 border-b border-zinc-100 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <h2 class="font-serif text-xl tracking-wide text-zinc-900">
                Your Shopping Bag
              </h2>
              <span class="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 font-medium">
                {{ cartStore.itemCount }}
              </span>
            </div>
            <button
              type="button"
              @click="cartStore.closeDrawer"
              class="p-2 text-zinc-400 hover:text-zinc-900 transition-colors"
              aria-label="Close bag"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Free Shipping Progress Meter -->
          <div class="bg-gold-50/60 p-4 border-b border-gold-100/80">
            <div class="flex items-center justify-between text-xs mb-1.5 font-medium">
              <span v-if="cartStore.amountUntilFreeShipping > 0" class="text-zinc-700">
                Add <strong class="text-gold-700">{{ formatPrice(cartStore.amountUntilFreeShipping) }}</strong> more for <span class="underline">Free Insured Express Delivery</span>
              </span>
              <span v-else class="text-emerald-700 font-semibold flex items-center gap-1">
                <svg class="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                You have qualified for Free Insured Express Delivery!
              </span>
              <span class="text-[11px] text-zinc-500 font-mono">{{ cartStore.freeShippingProgress }}%</span>
            </div>
            <div class="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
              <div
                class="bg-gold-500 h-full transition-all duration-500 rounded-full"
                :style="{ width: `${cartStore.freeShippingProgress}%` }"
              ></div>
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-if="cartStore.items.length === 0"
            class="flex-1 flex flex-col items-center justify-center p-8 text-center"
          >
            <div class="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-300 mb-4 border border-zinc-100">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 class="font-serif text-lg text-zinc-900 mb-1">Your bag is currently empty</h3>
            <p class="text-xs text-zinc-500 max-w-xs mb-6">
              Discover our handcrafted rings, pendants, and limited artisan collections.
            </p>
            <NuxtLink
              to="/products"
              @click="cartStore.closeDrawer"
              class="px-5 py-2.5 bg-zinc-900 text-white text-xs uppercase tracking-widest font-medium hover:bg-gold-500 transition-colors"
            >
              Explore Fine Jewelry
            </NuxtLink>
          </div>

          <!-- Item List -->
          <div v-else class="flex-1 overflow-y-auto p-5 divide-y divide-zinc-100">
            <div
              v-for="item in cartStore.items"
              :key="item.id"
              class="py-4 first:pt-0 last:pb-0 flex gap-4"
            >
              <NuxtLink
                :to="`/products/${item.product.slug}`"
                @click="cartStore.closeDrawer"
                class="w-20 h-24 bg-zinc-50 rounded-sm overflow-hidden flex-shrink-0 border border-zinc-100"
              >
                <img
                  :src="item.product.images[0]"
                  :alt="item.product.name"
                  class="w-full h-full object-cover object-center"
                />
              </NuxtLink>

              <div class="flex-1 min-w-0 flex flex-col">
                <div class="flex items-start justify-between gap-2">
                  <NuxtLink
                    :to="`/products/${item.product.slug}`"
                    @click="cartStore.closeDrawer"
                    class="font-serif text-sm font-medium text-zinc-900 hover:text-gold-600 transition-colors truncate"
                  >
                    {{ item.product.name }}
                  </NuxtLink>
                  <button
                    type="button"
                    @click="cartStore.removeItem(item.id)"
                    class="text-zinc-400 hover:text-rose-600 transition-colors p-0.5"
                    aria-label="Remove item"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div class="text-[11px] text-zinc-500 mt-0.5 flex flex-wrap gap-2">
                  <span>{{ item.product.material }}</span>
                  <span v-if="item.selectedSize" class="text-zinc-700 font-medium">· Size: {{ item.selectedSize }}</span>
                </div>

                <div v-if="item.engravingText" class="text-[10px] italic text-zinc-500 mt-1 bg-zinc-50 px-2 py-0.5 rounded border border-zinc-100">
                  Engraving: "{{ item.engravingText }}"
                </div>

                <div class="mt-auto pt-2 flex items-center justify-between">
                  <!-- Quantity Stepper -->
                  <div class="flex items-center border border-zinc-200 rounded-sm">
                    <button
                      type="button"
                      @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                      class="px-2 py-1 text-zinc-600 hover:text-zinc-900 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span class="px-2 text-xs font-medium text-zinc-900 min-w-[20px] text-center">
                      {{ item.quantity }}
                    </span>
                    <button
                      type="button"
                      @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                      class="px-2 py-1 text-zinc-600 hover:text-zinc-900 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <span class="font-sans font-medium text-sm text-zinc-900">
                    {{ formatPrice(item.product.price * item.quantity) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Drawer Footer -->
          <div v-if="cartStore.items.length > 0" class="p-5 border-t border-zinc-100 bg-zinc-50/50 space-y-3">
            <div class="space-y-1.5 text-xs text-zinc-600">
              <div class="flex items-center justify-between">
                <span>Subtotal</span>
                <span class="font-medium text-zinc-900">{{ formatPrice(cartStore.subtotal) }}</span>
              </div>
              <div v-if="cartStore.discount > 0" class="flex items-center justify-between text-emerald-700">
                <span>Promotional Savings</span>
                <span>-{{ formatPrice(cartStore.discount) }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span>Estimated Shipping</span>
                <span class="font-medium text-zinc-900">
                  {{ cartStore.estimatedShipping === 0 ? 'Free' : formatPrice(cartStore.estimatedShipping) }}
                </span>
              </div>
              <div class="flex items-center justify-between pt-2 border-t border-zinc-200 text-sm font-semibold text-zinc-900">
                <span>Estimated Total</span>
                <span>{{ formatPrice(cartStore.total) }}</span>
              </div>
            </div>

            <div class="space-y-2 pt-2">
              <NuxtLink
                to="/checkout"
                @click="cartStore.closeDrawer"
                class="w-full block py-3 text-center text-xs uppercase tracking-widest font-semibold bg-zinc-900 text-white hover:bg-gold-500 transition-colors shadow-subtle"
              >
                Checkout Now
              </NuxtLink>
              <NuxtLink
                to="/cart"
                @click="cartStore.closeDrawer"
                class="w-full block py-2.5 text-center text-xs uppercase tracking-widest font-medium border border-zinc-300 text-zinc-800 hover:bg-white transition-colors"
              >
                View Full Bag & Promo Codes
              </NuxtLink>
            </div>

            <p class="text-[10px] text-center text-zinc-400">
              Complimentary insured worldwide shipping & 30-day returns.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const cartStore = useCartStore()
const { formatPrice } = useCurrency()

onMounted(() => {
  cartStore.init()
})
</script>
