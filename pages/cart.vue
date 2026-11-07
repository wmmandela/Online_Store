<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="border-b border-zinc-200 pb-6 mb-8 flex items-baseline justify-between">
      <div>
        <h1 class="font-serif text-3xl sm:text-4xl text-zinc-900 font-normal">
          Shopping Bag
        </h1>
        <p class="text-xs text-zinc-500 mt-1">
          Review your selected fine jewelry before proceeding to complimentary insured shipping.
        </p>
      </div>
      <NuxtLink
        to="/products"
        class="text-xs uppercase tracking-wider text-zinc-600 hover:text-zinc-900 underline hidden sm:inline"
      >
        ← Continue Browsing
      </NuxtLink>
    </div>

    <!-- Free Shipping Progress Banner -->
    <div class="bg-gold-50/70 border border-gold-200/80 rounded-sm p-4 mb-8">
      <div class="flex items-center justify-between text-xs mb-2">
        <span v-if="cartStore.amountUntilFreeShipping > 0" class="text-zinc-800 font-medium">
          Add <strong class="text-gold-700 font-bold">{{ formatPrice(cartStore.amountUntilFreeShipping) }}</strong> more to unlock <span class="underline">Complimentary Worldwide Insured Express Delivery</span>
        </span>
        <span v-else class="text-emerald-700 font-semibold flex items-center gap-1.5">
          <svg class="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          Congratulations! You have unlocked Free Insured Express Delivery (KSh 3,500 value)
        </span>
        <span class="font-mono text-zinc-500 text-[11px]">{{ cartStore.freeShippingProgress }}%</span>
      </div>
      <div class="w-full bg-zinc-200 h-2 rounded-full overflow-hidden">
        <div
          class="bg-gold-500 h-full rounded-full transition-all duration-500"
          :style="{ width: `${cartStore.freeShippingProgress}%` }"
        ></div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="cartStore.items.length === 0"
      class="text-center py-20 bg-white border border-dashed border-zinc-200 rounded-sm"
    >
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-300">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <h2 class="font-serif text-2xl text-zinc-900 mb-2">Your shopping bag is empty</h2>
      <p class="text-xs text-zinc-500 max-w-sm mx-auto mb-6">
        No fine jewelry creations have been added to your shopping bag yet. Explore our handcrafted collections.
      </p>
      <NuxtLink
        to="/products"
        class="inline-block px-8 py-3.5 bg-zinc-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-gold-500 transition-colors"
      >
        Explore Collections
      </NuxtLink>
    </div>

    <!-- Active Cart Layout (2 Columns) -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <!-- Left Column: Item List (7 cols) -->
      <div class="lg:col-span-7 divide-y divide-zinc-200 border-t border-b border-zinc-200">
        <div
          v-for="item in cartStore.items"
          :key="item.id"
          class="py-6 flex flex-col sm:flex-row gap-5"
        >
          <!-- Thumbnail -->
          <NuxtLink
            :to="`/products/${item.product.slug}`"
            class="w-full sm:w-28 aspect-[4/5] bg-zinc-50 rounded-sm overflow-hidden flex-shrink-0 border border-zinc-100"
          >
            <img
              :src="item.product.images[0]"
              :alt="item.product.name"
              class="w-full h-full object-cover object-center"
            />
          </NuxtLink>

          <!-- Details & Controls -->
          <div class="flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between gap-3">
                <div>
                  <span class="text-[10px] uppercase tracking-widest text-gold-600 font-semibold block">
                    {{ item.product.categoryLabel }}
                  </span>
                  <NuxtLink
                    :to="`/products/${item.product.slug}`"
                    class="font-serif text-lg text-zinc-900 hover:text-gold-600 transition-colors"
                  >
                    {{ item.product.name }}
                  </NuxtLink>
                </div>
                <span class="font-sans font-medium text-base text-zinc-900">
                  {{ formatPrice(item.product.price * item.quantity) }}
                </span>
              </div>

              <!-- Attributes -->
              <div class="text-xs text-zinc-500 mt-1 space-y-0.5">
                <div>{{ item.product.material }}</div>
                <div v-if="item.selectedSize">Size: <strong class="text-zinc-800">{{ item.selectedSize }}</strong></div>
                <div v-if="item.engravingText" class="italic text-[11px] text-zinc-600 bg-zinc-50 p-1.5 rounded border border-zinc-100 mt-1">
                  Complimentary Engraving: "{{ item.engravingText }}"
                </div>
              </div>
            </div>

            <div class="mt-4 pt-3 flex items-center justify-between border-t border-zinc-100">
              <!-- Quantity Stepper -->
              <div class="flex items-center border border-zinc-200 rounded-sm bg-white">
                <button
                  type="button"
                  @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                  class="px-3 py-1 text-zinc-600 hover:text-zinc-900"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span class="px-2 text-xs font-semibold text-zinc-900 min-w-[24px] text-center font-mono">
                  {{ item.quantity }}
                </span>
                <button
                  type="button"
                  @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                  class="px-3 py-1 text-zinc-600 hover:text-zinc-900"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div class="flex items-center gap-4">
                <span class="text-xs text-zinc-400">
                  {{ formatPrice(item.product.price) }} each
                </span>
                <button
                  type="button"
                  @click="cartStore.removeItem(item.id)"
                  class="text-xs text-zinc-400 hover:text-rose-600 underline transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Order Summary & Coupon (5 cols) -->
      <div class="lg:col-span-5 space-y-6">
        <div class="bg-zinc-50 border border-zinc-200/80 rounded-sm p-6 space-y-5">
          <h2 class="font-serif text-xl text-zinc-900 font-normal border-b border-zinc-200 pb-3">
            Order Summary
          </h2>

          <div class="space-y-3 text-xs text-zinc-600">
            <div class="flex items-center justify-between">
              <span>Subtotal ({{ cartStore.itemCount }} pieces)</span>
              <span class="font-medium text-zinc-900">{{ formatPrice(cartStore.subtotal) }}</span>
            </div>

            <!-- Promotional Discount -->
            <div v-if="cartStore.discount > 0" class="flex items-center justify-between text-emerald-700 font-medium">
              <span class="flex items-center gap-1.5">
                <span>Voucher ({{ cartStore.promoCode }})</span>
                <button @click="cartStore.removePromoCode" class="text-zinc-400 hover:text-zinc-700 text-[10px]">✕</button>
              </span>
              <span>-{{ formatPrice(cartStore.discount) }}</span>
            </div>

            <div class="flex items-center justify-between">
              <span>Insured Courier Shipping</span>
              <span class="font-medium text-zinc-900">
                {{ cartStore.estimatedShipping === 0 ? 'Complimentary ($0)' : formatPrice(cartStore.estimatedShipping) }}
              </span>
            </div>

            <div class="flex items-center justify-between">
              <span>Estimated Sales Tax (8%)</span>
              <span class="font-medium text-zinc-900">{{ formatPrice(cartStore.estimatedTax) }}</span>
            </div>

            <div class="flex items-center justify-between pt-4 border-t border-zinc-200 text-base font-semibold text-zinc-900">
              <span>Estimated Total</span>
              <span class="font-sans text-xl text-zinc-900">{{ formatPrice(cartStore.total) }}</span>
            </div>
          </div>

          <!-- Promo Voucher Box -->
          <div class="pt-4 border-t border-zinc-200">
            <label class="block text-xs uppercase tracking-wider font-semibold text-zinc-800 mb-1.5">
              Promotional Voucher Code
            </label>
            <div class="flex gap-2">
              <input
                v-model="voucherInput"
                type="text"
                placeholder="Try AURELIA10 or VIP50"
                class="flex-1 text-xs uppercase bg-white border border-zinc-300 rounded-sm px-3 py-2.5 focus:outline-none focus:border-zinc-900"
              />
              <button
                type="button"
                @click="applyVoucher"
                class="px-4 py-2.5 text-xs uppercase tracking-wider font-semibold bg-zinc-900 text-white hover:bg-gold-500 transition-colors"
              >
                Apply
              </button>
            </div>
            <p v-if="voucherMessage" class="text-[11px] mt-1.5 font-medium" :class="voucherSuccess ? 'text-emerald-700' : 'text-rose-600'">
              {{ voucherMessage }}
            </p>
          </div>

          <!-- Checkout CTA Button -->
          <NuxtLink
            to="/checkout"
            class="block w-full py-4 text-center text-xs uppercase tracking-widest font-semibold bg-zinc-900 text-white hover:bg-gold-500 transition-colors shadow-elevated"
          >
            Proceed to Secure Checkout
          </NuxtLink>

          <!-- Security Assurance -->
          <div class="pt-2 text-center text-[10px] text-zinc-400 space-y-1">
            <p class="flex items-center justify-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
              256-Bit Encrypted Checkout
            </p>
            <p>Complimentary 30-day returns & lifetime warranty included with every order.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore()
const { formatPrice } = useCurrency()
const { showToast } = useToast()

const voucherInput = ref('')
const voucherMessage = ref('')
const voucherSuccess = ref(false)

const applyVoucher = () => {
  if (!voucherInput.value.trim()) return

  const result = cartStore.applyPromoCode(voucherInput.value)
  voucherSuccess.value = result.success
  voucherMessage.value = result.message

  if (result.success) {
    showToast({
      title: 'Voucher Applied',
      message: result.message,
      type: 'success',
    })
    voucherInput.value = ''
  }
}

// SEO
useSeoMeta({
  title: 'Shopping Bag | AURELIA Fine Jewelry',
  description: 'Review your selected artisanal fine jewelry, calculate shipping, and proceed to secure checkout.',
  robots: 'noindex, follow',
})
</script>
