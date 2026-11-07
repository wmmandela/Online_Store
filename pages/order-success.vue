<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
    <!-- Success Badge -->
    <div class="text-center space-y-4 mb-10">
      <div class="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <span class="text-xs uppercase tracking-[0.3em] text-gold-600 font-semibold block">
        Order Confirmed & Secured
      </span>
      <h1 class="font-serif text-3xl sm:text-4xl text-zinc-900 font-normal">
        Thank You for Your Patronage
      </h1>
      <p class="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
        Your bespoke jewelry order has been entrusted to our master goldsmiths. A formal confirmation dossier and tracking link have been dispatched to your email.
      </p>

      <div class="inline-flex items-center gap-2 px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-sm font-mono text-xs">
        <span class="text-zinc-500">Order Reference:</span>
        <strong class="text-zinc-900">{{ orderId }}</strong>
      </div>
    </div>

    <!-- Order Receipt Card -->
    <div class="bg-white border border-zinc-200 rounded-sm shadow-subtle p-6 sm:p-8 space-y-8">
      <!-- Order Status & Logistics Strip -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 border-b border-zinc-100 text-xs">
        <div>
          <span class="text-zinc-400 uppercase tracking-wider block text-[10px] mb-1">Status</span>
          <span class="inline-flex items-center gap-1.5 font-medium text-emerald-700">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            Confirmed & Pre-Inspected
          </span>
        </div>

        <div>
          <span class="text-zinc-400 uppercase tracking-wider block text-[10px] mb-1">Estimated Delivery</span>
          <span class="font-medium text-zinc-900">{{ orderDetails?.estimatedDelivery || 'Within 3-5 business days' }}</span>
        </div>

        <div>
          <span class="text-zinc-400 uppercase tracking-wider block text-[10px] mb-1">Shipping Tier</span>
          <span class="font-medium text-zinc-900">{{ orderDetails?.shippingTier || 'Insured Express Courier' }}</span>
        </div>
      </div>

      <!-- Shipping Address & Payment Summary -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-zinc-100 text-xs">
        <div>
          <h4 class="font-semibold text-zinc-900 uppercase tracking-wider text-[11px] mb-2">
            Discreet Shipping Destination
          </h4>
          <p class="text-zinc-600 leading-relaxed" v-if="orderDetails?.shippingAddress">
            {{ orderDetails.shippingAddress.firstName }} {{ orderDetails.shippingAddress.lastName }}<br />
            {{ orderDetails.shippingAddress.address }}
            <span v-if="orderDetails.shippingAddress.apartment">, {{ orderDetails.shippingAddress.apartment }}</span><br />
            {{ orderDetails.shippingAddress.city }}, {{ orderDetails.shippingAddress.state }} {{ orderDetails.shippingAddress.postalCode }}<br />
            {{ orderDetails.shippingAddress.country }}<br />
            <span class="text-zinc-400">{{ orderDetails.shippingAddress.phone }}</span>
          </p>
          <p v-else class="text-zinc-500">Provided at checkout.</p>
        </div>

        <div>
          <h4 class="font-semibold text-zinc-900 uppercase tracking-wider text-[11px] mb-2">
            Payment & Protection
          </h4>
          <p class="text-zinc-600 leading-relaxed">
            Method: <strong>{{ orderDetails?.paymentMethod || 'Mock Credit Card (•••• 4242)' }}</strong><br />
            Coverage: <strong>100% Full Transit Value Insurance</strong><br />
            Authentication: <strong>IGI / Atelier Hallmark Certification</strong><br />
            Packaging: <strong>Signature Velvet Keepsake Box</strong>
          </p>
        </div>
      </div>

      <!-- Itemized Table (if available) -->
      <div v-if="orderDetails?.items && orderDetails.items.length > 0" class="space-y-4">
        <h4 class="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">
          Itemized Creations
        </h4>
        <div class="divide-y divide-zinc-100 border-t border-b border-zinc-100">
          <div
            v-for="item in orderDetails.items"
            :key="item.id"
            class="py-3 flex items-center justify-between text-xs"
          >
            <div class="flex items-center gap-3">
              <img
                :src="item.product.images[0]"
                :alt="item.product.name"
                class="w-12 h-14 object-cover bg-zinc-50 rounded-sm border border-zinc-100"
              />
              <div>
                <h5 class="font-serif font-medium text-zinc-900">{{ item.product.name }}</h5>
                <p class="text-[10px] text-zinc-500">
                  {{ item.product.material }} {{ item.selectedSize ? `· Size ${item.selectedSize}` : '' }} · Qty: {{ item.quantity }}
                </p>
                <p v-if="item.engravingText" class="text-[9px] italic text-zinc-400">
                  Engraving: "{{ item.engravingText }}"
                </p>
              </div>
            </div>
            <span class="font-medium text-zinc-900">
              {{ formatPrice(item.product.price * item.quantity) }}
            </span>
          </div>
        </div>

        <!-- Financial Summary Breakdown -->
        <div class="max-w-xs ml-auto space-y-1.5 text-xs text-zinc-600 pt-2">
          <div class="flex justify-between">
            <span>Subtotal:</span>
            <span class="text-zinc-900 font-medium">{{ formatPrice(orderDetails.subtotal) }}</span>
          </div>
          <div v-if="orderDetails.discount > 0" class="flex justify-between text-emerald-700">
            <span>Discount ({{ orderDetails.discountCode }}):</span>
            <span>-{{ formatPrice(orderDetails.discount) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Shipping:</span>
            <span class="text-zinc-900 font-medium">
              {{ orderDetails.shipping === 0 ? 'Complimentary' : formatPrice(orderDetails.shipping) }}
            </span>
          </div>
          <div class="flex justify-between">
            <span>Sales Tax:</span>
            <span class="text-zinc-900 font-medium">{{ formatPrice(orderDetails.tax) }}</span>
          </div>
          <div class="flex justify-between pt-2 border-t border-zinc-200 text-sm font-semibold text-zinc-900">
            <span>Total Paid:</span>
            <span class="font-sans text-base">{{ formatPrice(orderDetails.total) }}</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          @click="printReceipt"
          class="w-full sm:w-auto px-5 py-2.5 text-xs uppercase tracking-wider font-medium border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Official Receipt
        </button>

        <NuxtLink
          to="/products"
          class="w-full sm:w-auto px-7 py-3 bg-zinc-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-gold-500 transition-colors text-center"
        >
          Continue Exploring Fine Jewelry
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Order } from '../types/product'

const route = useRoute()
const { formatPrice } = useCurrency()

const orderId = computed(() => (route.query.orderId as string) || 'AUR-2026-MOCK')
const orderDetails = ref<Order | null>(null)

onMounted(() => {
  if (import.meta.client) {
    const cached = sessionStorage.getItem(`order_${orderId.value}`)
    if (cached) {
      try {
        orderDetails.value = JSON.parse(cached)
      } catch (e) {
        console.error('Failed to parse cached order', e)
      }
    }
  }
})

const printReceipt = () => {
  if (import.meta.client) {
    window.print()
  }
}

useSeoMeta({
  title: 'Order Confirmed | AURELIA Fine Jewelry',
  robots: 'noindex, nofollow',
})
</script>
