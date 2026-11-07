<template>
  <footer class="bg-zinc-950 text-zinc-300 pt-16 pb-12 border-t border-zinc-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Trust Pillars Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 pb-14 border-b border-zinc-800/80 text-center">
        <div class="flex flex-col items-center">
          <div class="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gold-400 mb-3">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h4 class="font-serif text-sm font-medium text-white mb-1">Recycled 18K Solid Gold</h4>
          <p class="text-[11px] text-zinc-400">Zero newly-mined gold impact</p>
        </div>

        <div class="flex flex-col items-center">
          <div class="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gold-400 mb-3">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h4 class="font-serif text-sm font-medium text-white mb-1">Ethical Diamonds</h4>
          <p class="text-[11px] text-zinc-400">Conflict-free IGI & GIA certified</p>
        </div>

        <div class="flex flex-col items-center">
          <div class="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gold-400 mb-3">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h4 class="font-serif text-sm font-medium text-white mb-1">Insured Express Shipping</h4>
          <p class="text-[11px] text-zinc-400">Complimentary on all orders over $200</p>
        </div>

        <div class="flex flex-col items-center">
          <div class="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gold-400 mb-3">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h4 class="font-serif text-sm font-medium text-white mb-1">30-Day Returns & Warranty</h4>
          <p class="text-[11px] text-zinc-400">Complimentary resizing & checkups</p>
        </div>
      </div>

      <!-- Main Footer Columns -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-10 pt-12 pb-12">
        <!-- Brand column -->
        <div class="md:col-span-2 space-y-4">
          <NuxtLink to="/" class="inline-block">
            <span class="font-serif text-2xl tracking-[0.25em] text-white uppercase">
              Aurelia
            </span>
          </NuxtLink>
          <p class="text-xs text-zinc-400 max-w-sm leading-relaxed">
            Crafting architectural heirlooms for the modern collector. Every creation is handmade in limited editions with recycled 18k solid gold, laboratory diamonds, and responsibly mined natural gemstones.
          </p>
          <div class="text-xs text-gold-400 font-mono tracking-wider pt-2">
            PARIS · NEW YORK · MILAN · TOKYO
          </div>
        </div>

        <!-- Collections Column -->
        <div>
          <h4 class="text-xs uppercase tracking-widest text-white font-medium mb-4">
            Collections
          </h4>
          <ul class="space-y-2.5 text-xs text-zinc-400">
            <li>
              <NuxtLink to="/products?category=rings" class="hover:text-gold-400 transition-colors">
                Solitaire & Band Rings
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products?category=necklaces" class="hover:text-gold-400 transition-colors">
                Necklaces & Chokers
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products?category=earrings" class="hover:text-gold-400 transition-colors">
                Pavé Huggies & Drops
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products?category=bracelets" class="hover:text-gold-400 transition-colors">
                Tennis Bracelets & Cuffs
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products?sort=newest" class="hover:text-gold-400 transition-colors">
                New Arrivals
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Client Services Column -->
        <div>
          <h4 class="text-xs uppercase tracking-widest text-white font-medium mb-4">
            Client Care
          </h4>
          <ul class="space-y-2.5 text-xs text-zinc-400">
            <li>
              <NuxtLink to="/cart" class="hover:text-gold-400 transition-colors">
                View Shopping Bag
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="hover:text-gold-400 transition-colors">
                Complimentary Sizing Guide
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="hover:text-gold-400 transition-colors">
                Ethical Sourcing Protocol
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="hover:text-gold-400 transition-colors">
                Lifetime Care & Cleaning
              </NuxtLink>
            </li>
            <li>
              <a href="mailto:concierge@aureliajewelry.com" class="hover:text-gold-400 transition-colors">
                Private Concierge Inquiries
              </a>
            </li>
          </ul>
        </div>

        <!-- Newsletter Column -->
        <div>
          <h4 class="text-xs uppercase tracking-widest text-white font-medium mb-4">
            Private Salon
          </h4>
          <p class="text-xs text-zinc-400 mb-3">
            Receive private exhibition invitations, secret vault drops, and a $100 welcome credit.
          </p>
          <form @submit.prevent="subscribeNewsletter" class="space-y-2">
            <div class="relative">
              <input
                v-model="emailInput"
                type="email"
                required
                placeholder="your.email@atelier.com"
                class="w-full bg-zinc-900 border border-zinc-800 text-xs text-white px-3 py-2.5 placeholder-zinc-500 focus:outline-none focus:border-gold-500"
              />
            </div>
            <button
              type="submit"
              class="w-full py-2.5 text-xs uppercase tracking-widest font-medium bg-gold-500 text-zinc-950 hover:bg-gold-400 transition-colors"
            >
              {{ subscribed ? 'Invitation Reserved' : 'Request Invitation' }}
            </button>
          </form>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-4">
        <p>© 2026 AURELIA Fine Jewelry Inc. All rights reserved.</p>
        <div class="flex items-center gap-6">
          <NuxtLink to="/about" class="hover:text-zinc-400 transition-colors">Privacy Policy</NuxtLink>
          <NuxtLink to="/about" class="hover:text-zinc-400 transition-colors">Terms of Atelier</NuxtLink>
          <a href="/sitemap.xml" target="_blank" class="hover:text-zinc-400 transition-colors">XML Sitemap</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const emailInput = ref('')
const subscribed = ref(false)
const { showToast } = useToast()

const subscribeNewsletter = () => {
  if (emailInput.value) {
    subscribed.value = true
    showToast({
      title: 'Salon Access Granted',
      message: 'Your $100 voucher code AURELIA10 is ready to use.',
      type: 'success',
    })
    emailInput.value = ''
  }
}
</script>
