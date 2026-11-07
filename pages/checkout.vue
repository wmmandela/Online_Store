<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Header -->
    <div class="border-b border-zinc-200 pb-6 mb-8 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <NuxtLink to="/cart" class="text-xs uppercase tracking-wider text-zinc-500 hover:text-zinc-900">
          ← Back to Bag
        </NuxtLink>
        <span class="text-zinc-300">/</span>
        <h1 class="font-serif text-2xl sm:text-3xl text-zinc-900 font-normal">
          Express Checkout
        </h1>
      </div>
      <div class="flex items-center gap-2 text-xs text-zinc-500 font-medium">
        <svg class="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
        </svg>
        <span>Mocked Sandbox Mode</span>
      </div>
    </div>

    <!-- Empty cart redirect guard -->
    <div v-if="cartStore.items.length === 0 && !submitted" class="py-16 text-center">
      <h2 class="font-serif text-2xl text-zinc-900 mb-2">No items to checkout</h2>
      <p class="text-xs text-zinc-500 mb-6">Your shopping bag is currently empty.</p>
      <NuxtLink
        to="/products"
        class="px-6 py-3 bg-zinc-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-gold-500"
      >
        Explore Fine Jewelry
      </NuxtLink>
    </div>

    <!-- Main Checkout Grid -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <!-- Left Column: Checkout Forms (7 cols) -->
      <form @submit.prevent="handleSubmitOrder" class="lg:col-span-7 space-y-8">
        <!-- 1. Contact & Shipping Address -->
        <div class="bg-white border border-zinc-200 p-6 rounded-sm shadow-subtle space-y-4">
          <div class="flex items-center justify-between border-b border-zinc-100 pb-3">
            <h2 class="font-serif text-lg text-zinc-900 font-normal flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-zinc-900 text-white text-xs flex items-center justify-center font-mono font-medium">1</span>
              Shipping & Contact Details
            </h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label class="block font-medium text-zinc-700 mb-1">First Name *</label>
              <input
                v-model="form.firstName"
                required
                type="text"
                class="w-full border border-zinc-300 rounded-sm px-3 py-2 text-zinc-900 focus:outline-none focus:border-zinc-900"
              />
            </div>
            <div>
              <label class="block font-medium text-zinc-700 mb-1">Last Name *</label>
              <input
                v-model="form.lastName"
                required
                type="text"
                class="w-full border border-zinc-300 rounded-sm px-3 py-2 text-zinc-900 focus:outline-none focus:border-zinc-900"
              />
            </div>
            <div class="sm:col-span-2">
              <label class="block font-medium text-zinc-700 mb-1">Email Address (for order tracking) *</label>
              <input
                v-model="form.email"
                required
                type="email"
                class="w-full border border-zinc-300 rounded-sm px-3 py-2 text-zinc-900 focus:outline-none focus:border-zinc-900"
              />
            </div>
            <div class="sm:col-span-2">
              <label class="block font-medium text-zinc-700 mb-1">Phone Number (courier delivery updates) *</label>
              <input
                v-model="form.phone"
                required
                type="tel"
                placeholder="+254 712 345 678"
                class="w-full border border-zinc-300 rounded-sm px-3 py-2 text-zinc-900 focus:outline-none focus:border-zinc-900"
              />
            </div>
            <div class="sm:col-span-2">
              <label class="block font-medium text-zinc-700 mb-1">Street Address *</label>
              <input
                v-model="form.address"
                required
                type="text"
                class="w-full border border-zinc-300 rounded-sm px-3 py-2 text-zinc-900 focus:outline-none focus:border-zinc-900"
              />
            </div>
            <div>
              <label class="block font-medium text-zinc-700 mb-1">Apartment, Suite, Unit</label>
              <input
                v-model="form.apartment"
                type="text"
                class="w-full border border-zinc-300 rounded-sm px-3 py-2 text-zinc-900 focus:outline-none focus:border-zinc-900"
              />
            </div>
            <div>
              <label class="block font-medium text-zinc-700 mb-1">City / Town *</label>
              <input
                v-model="form.city"
                required
                type="text"
                class="w-full border border-zinc-300 rounded-sm px-3 py-2 text-zinc-900 focus:outline-none focus:border-zinc-900"
              />
            </div>
            <div>
              <label class="block font-medium text-zinc-700 mb-1">County / Region *</label>
              <input
                v-model="form.state"
                required
                type="text"
                class="w-full border border-zinc-300 rounded-sm px-3 py-2 text-zinc-900 focus:outline-none focus:border-zinc-900"
              />
            </div>
            <div>
              <label class="block font-medium text-zinc-700 mb-1">Postal Code *</label>
              <input
                v-model="form.postalCode"
                required
                type="text"
                class="w-full border border-zinc-300 rounded-sm px-3 py-2 text-zinc-900 focus:outline-none focus:border-zinc-900"
              />
            </div>
          </div>
        </div>

        <!-- 2. Delivery Options -->
        <div class="bg-white border border-zinc-200 p-6 rounded-sm shadow-subtle space-y-4">
          <div class="flex items-center justify-between border-b border-zinc-100 pb-3">
            <h2 class="font-serif text-lg text-zinc-900 font-normal flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-zinc-900 text-white text-xs flex items-center justify-center font-mono font-medium">2</span>
              Delivery Tier
            </h2>
          </div>

          <div class="space-y-3">
            <label
              class="flex items-center justify-between p-3.5 border rounded-sm cursor-pointer transition-all text-xs"
              :class="shippingTier === 'standard' ? 'border-zinc-900 bg-gold-50/40' : 'border-zinc-200 hover:border-zinc-300'"
            >
              <div class="flex items-center gap-3">
                <input
                  type="radio"
                  name="shipping"
                  value="standard"
                  v-model="shippingTier"
                  class="w-4 h-4 text-zinc-900 border-zinc-300"
                />
                <div>
                  <strong class="text-zinc-900 block font-semibold">Insured Standard Courier (2-4 business days)</strong>
                  <span class="text-zinc-500 text-[11px]">Discreet luxury packaging with direct signature required upon handover.</span>
                </div>
              </div>
              <span class="font-semibold text-zinc-900">
                {{ cartStore.subtotal >= 30000 || cartStore.promoCode === 'FREESHIP' ? 'Free' : formatPrice(1500) }}
              </span>
            </label>

            <label
              class="flex items-center justify-between p-3.5 border rounded-sm cursor-pointer transition-all text-xs"
              :class="shippingTier === 'express' ? 'border-zinc-900 bg-gold-50/40' : 'border-zinc-200 hover:border-zinc-300'"
            >
              <div class="flex items-center gap-3">
                <input
                  type="radio"
                  name="shipping"
                  value="express"
                  v-model="shippingTier"
                  class="w-4 h-4 text-zinc-900 border-zinc-300"
                />
                <div>
                  <strong class="text-zinc-900 block font-semibold">Priority Concierge Express (Same/Next Day)</strong>
                  <span class="text-zinc-500 text-[11px]">Expedited armored courier service with GPS telemetry.</span>
                </div>
              </div>
              <span class="font-semibold text-zinc-900">
                {{ cartStore.promoCode === 'FREESHIP' ? 'Free' : formatPrice(3500) }}
              </span>
            </label>
          </div>
        </div>

        <!-- 3. Mocked Payment Method -->
        <div class="bg-white border border-zinc-200 p-6 rounded-sm shadow-subtle space-y-4">
          <div class="flex items-center justify-between border-b border-zinc-100 pb-3">
            <h2 class="font-serif text-lg text-zinc-900 font-normal flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-zinc-900 text-white text-xs flex items-center justify-center font-mono font-medium">3</span>
              Payment Method (Mocked)
            </h2>
            <span class="text-[11px] text-emerald-700 font-medium">Test Sandbox Mode</span>
          </div>

          <div class="flex gap-2">
            <button
              type="button"
              @click="paymentMethod = 'card'"
              class="flex-1 py-2 px-3 text-xs font-medium border text-center transition-colors"
              :class="paymentMethod === 'card' ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'"
            >
              Credit / Debit Card
            </button>
            <button
              type="button"
              @click="paymentMethod = 'mpesa'"
              class="flex-1 py-2 px-3 text-xs font-medium border text-center transition-colors"
              :class="paymentMethod === 'mpesa' ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'"
            >
              M-PESA (Mock)
            </button>
            <button
              type="button"
              @click="paymentMethod = 'apple'"
              class="flex-1 py-2 px-3 text-xs font-medium border text-center transition-colors"
              :class="paymentMethod === 'apple' ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'"
            >
               Apple Pay (Mock)
            </button>
          </div>

          <!-- Mock Card Fields -->
          <div v-if="paymentMethod === 'card'" class="space-y-3 pt-2 text-xs">
            <div>
              <label class="block font-medium text-zinc-700 mb-1">Cardholder Name</label>
              <input
                v-model="cardName"
                type="text"
                placeholder="Machera Mandela"
                class="w-full border border-zinc-300 rounded-sm px-3 py-2 text-zinc-900 focus:outline-none focus:border-zinc-900"
              />
            </div>
            <div>
              <label class="block font-medium text-zinc-700 mb-1">Card Number</label>
              <input
                v-model="cardNumber"
                type="text"
                maxlength="19"
                placeholder="4242 •••• •••• 4242 (Any test number)"
                class="w-full border border-zinc-300 rounded-sm px-3 py-2 font-mono text-zinc-900 focus:outline-none focus:border-zinc-900"
              />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-medium text-zinc-700 mb-1">Expiration Date</label>
                <input
                  v-model="cardExp"
                  type="text"
                  placeholder="12/28"
                  maxlength="5"
                  class="w-full border border-zinc-300 rounded-sm px-3 py-2 font-mono text-zinc-900 focus:outline-none focus:border-zinc-900"
                />
              </div>
              <div>
                <label class="block font-medium text-zinc-700 mb-1">Security Code (CVC)</label>
                <input
                  v-model="cardCvc"
                  type="text"
                  placeholder="888"
                  maxlength="4"
                  class="w-full border border-zinc-300 rounded-sm px-3 py-2 font-mono text-zinc-900 focus:outline-none focus:border-zinc-900"
                />
              </div>
            </div>
          </div>

          <!-- Mock M-PESA Box -->
          <div v-else-if="paymentMethod === 'mpesa'" class="p-4 bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 rounded-sm space-y-2">
            <div class="font-semibold flex items-center gap-1.5">
              <span>M-PESA Express STK Push Simulation</span>
            </div>
            <p class="text-[11px] text-emerald-700 leading-relaxed">
              Upon placing the order, a simulated M-PESA STK prompt will be triggered for phone number <strong class="font-mono">{{ form.phone }}</strong> for total amount of <strong class="font-mono">{{ formatPrice(computedTotal) }}</strong>.
            </p>
          </div>

          <div v-else class="p-4 bg-zinc-50 text-xs text-zinc-600 rounded-sm text-center">
            You will be seamlessly authenticated with mocked Apple Pay upon clicking Place Order.
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="submitting"
          class="w-full py-4 text-xs uppercase tracking-widest font-semibold bg-zinc-900 text-white hover:bg-gold-500 transition-colors flex items-center justify-center gap-2 shadow-elevated disabled:opacity-50"
        >
          <svg v-if="submitting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ submitting ? 'Authorizing & Securing Order...' : `Authorize & Place Order · ${formatPrice(computedTotal)}` }}</span>
        </button>

        <p class="text-[11px] text-center text-zinc-400">
          By placing your order, you agree to Aurelia's Terms of Atelier & 30-Day Complimentary Return Policy.
        </p>
      </form>

      <!-- Right Column: Order Summary (5 cols) -->
      <div class="lg:col-span-5">
        <div class="bg-zinc-50 border border-zinc-200/80 rounded-sm p-6 space-y-5 sticky top-28">
          <h2 class="font-serif text-lg text-zinc-900 font-normal border-b border-zinc-200 pb-3">
            In Your Bag ({{ cartStore.itemCount }})
          </h2>

          <!-- Mini Item List -->
          <div class="divide-y divide-zinc-200 max-h-72 overflow-y-auto">
            <div
              v-for="item in cartStore.items"
              :key="item.id"
              class="py-3 flex items-center gap-3 text-xs"
            >
              <div class="relative w-12 h-14 bg-white rounded-sm overflow-hidden flex-shrink-0 border border-zinc-200">
                <img :src="item.product.images[0]" :alt="item.product.name" class="w-full h-full object-cover" />
                <span class="absolute -top-1 -right-1 w-4 h-4 bg-zinc-900 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                  {{ item.quantity }}
                </span>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-serif font-medium text-zinc-900 truncate">{{ item.product.name }}</h4>
                <p class="text-[10px] text-zinc-500">{{ item.product.material }} {{ item.selectedSize ? `· Size ${item.selectedSize}` : '' }}</p>
                <p v-if="item.engravingText" class="text-[9px] italic text-zinc-400 truncate">"{{ item.engravingText }}"</p>
              </div>
              <span class="font-medium text-zinc-900">
                {{ formatPrice(item.product.price * item.quantity) }}
              </span>
            </div>
          </div>

          <!-- Totals Breakdown -->
          <div class="pt-3 border-t border-zinc-200 space-y-2 text-xs text-zinc-600">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span class="text-zinc-900 font-medium">{{ formatPrice(cartStore.subtotal) }}</span>
            </div>
            <div v-if="cartStore.discount > 0" class="flex justify-between text-emerald-700">
              <span>Promotional Discount</span>
              <span>-{{ formatPrice(cartStore.discount) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping ({{ shippingTier === 'express' ? 'Concierge Express' : 'Insured Standard' }})</span>
              <span class="text-zinc-900 font-medium">
                {{ computedShippingCost === 0 ? 'Free' : formatPrice(computedShippingCost) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span>Estimated Sales Tax</span>
              <span class="text-zinc-900 font-medium">{{ formatPrice(computedTax) }}</span>
            </div>
            <div class="flex justify-between pt-3 border-t border-zinc-200 text-base font-semibold text-zinc-900">
              <span>Total</span>
              <span class="font-sans text-xl text-zinc-900">{{ formatPrice(computedTotal) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ShippingAddress, Order } from '../types/product'

const cartStore = useCartStore()
const router = useRouter()
const { formatPrice } = useCurrency()
const { showToast } = useToast()

const shippingTier = ref<'standard' | 'express'>('standard')
const paymentMethod = ref<'card' | 'mpesa' | 'apple'>('card')
const submitting = ref(false)
const submitted = ref(false)

const form = reactive<ShippingAddress>({
  firstName: 'Machera',
  lastName: 'Mandela',
  email: 'client@aureliafinejewelry.com',
  phone: '+254 712 345 678',
  address: 'Westlands Commercial Centre, Ring Road',
  apartment: 'Suite 4B',
  city: 'Nairobi',
  state: 'Nairobi County',
  postalCode: '00100',
  country: 'Kenya',
})

const cardName = ref('Machera Mandela')
const cardNumber = ref('4242 •••• •••• 4242')
const cardExp = ref('12/28')
const cardCvc = ref('888')

const computedShippingCost = computed(() => {
  if (shippingTier.value === 'express') {
    return cartStore.promoCode === 'FREESHIP' ? 0 : 3500
  }
  return cartStore.subtotal >= 30000 || cartStore.promoCode === 'FREESHIP' ? 0 : 1500
})

const computedTax = computed(() => {
  const taxable = Math.max(0, cartStore.subtotal - cartStore.discount)
  return Math.round(taxable * 0.08)
})

const computedTotal = computed(() => {
  return Math.max(0, cartStore.subtotal - cartStore.discount + computedShippingCost.value + computedTax.value)
})

const handleSubmitOrder = async () => {
  if (cartStore.items.length === 0 || submitting.value) return
  submitting.value = true

  const methodLabel = paymentMethod.value === 'card'
    ? 'Credit Card (•••• 4242)'
    : paymentMethod.value === 'mpesa'
    ? 'M-PESA Express (Simulated)'
    : 'Apple Pay'

  try {
    const response = await $fetch<{ success: boolean; order: Order }>('/api/checkout', {
      method: 'POST',
      body: {
        items: cartStore.items,
        shippingAddress: { ...form },
        shippingTier: shippingTier.value,
        discountCode: cartStore.promoCode || undefined,
        paymentMethod: methodLabel,
      },
    })

    if (response.success && response.order) {
      submitted.value = true
      if (import.meta.client) {
        sessionStorage.setItem(`order_${response.order.orderId}`, JSON.stringify(response.order))
      }
      cartStore.clearCart()
      showToast({
        title: 'Order Confirmed',
        message: `Order #${response.order.orderId} processed successfully!`,
        type: 'success',
      })
      router.push(`/order-success?orderId=${response.order.orderId}`)
    }
  } catch (err: any) {
    showToast({
      title: 'Checkout Error',
      message: err.data?.statusMessage || 'Unable to authorize order. Please verify details.',
      type: 'error',
    })
  } finally {
    submitting.value = false
  }
}

useSeoMeta({
  title: 'Secure Checkout | AURELIA Fine Jewelry',
  robots: 'noindex, nofollow',
})
</script>
