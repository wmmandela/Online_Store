<template>
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-100 transition-all duration-300">
    <!-- Announcement Top Strip -->
    <div class="bg-zinc-900 text-zinc-100 py-2 px-4 text-center text-[11px] tracking-widest uppercase font-medium">
      <div class="max-w-7xl mx-auto flex items-center justify-center gap-4">
        <span>Complimentary Insured Courier Delivery Across Kenya & Worldwide Over KSh 30,000</span>
        <span class="hidden md:inline text-zinc-500">|</span>
        <span class="hidden md:inline">Use code <strong class="text-gold-300">AURELIA10</strong> for 10% off</span>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Mobile Menu Toggle Button -->
        <button
          type="button"
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="lg:hidden p-2 text-zinc-700 hover:text-zinc-900 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Brand Identity / Logo -->
        <div class="flex-shrink-0 flex items-center">
          <NuxtLink to="/" class="group flex flex-col items-center">
            <span class="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-zinc-900 font-normal uppercase transition-colors group-hover:text-gold-600">
              Aurelia
            </span>
            <span class="text-[9px] tracking-[0.35em] text-zinc-400 uppercase font-medium -mt-0.5">
              Fine Jewelry
            </span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation Links -->
        <nav class="hidden lg:flex items-center space-x-8 text-xs font-medium tracking-widest uppercase">
          <NuxtLink
            to="/products"
            class="text-zinc-700 hover:text-gold-600 transition-colors py-2 relative group"
          >
            All Creations
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
          </NuxtLink>
          <NuxtLink
            to="/products?category=rings"
            class="text-zinc-700 hover:text-gold-600 transition-colors py-2 relative group"
          >
            Rings
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
          </NuxtLink>
          <NuxtLink
            to="/products?category=necklaces"
            class="text-zinc-700 hover:text-gold-600 transition-colors py-2 relative group"
          >
            Necklaces
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
          </NuxtLink>
          <NuxtLink
            to="/products?category=earrings"
            class="text-zinc-700 hover:text-gold-600 transition-colors py-2 relative group"
          >
            Earrings
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
          </NuxtLink>
          <NuxtLink
            to="/products?category=bracelets"
            class="text-zinc-700 hover:text-gold-600 transition-colors py-2 relative group"
          >
            Bracelets
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="text-zinc-700 hover:text-gold-600 transition-colors py-2 relative group"
          >
            Our Atelier
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
          </NuxtLink>
        </nav>

        <!-- Right Header Action Utilities -->
        <div class="flex items-center space-x-4 sm:space-x-5">
          <!-- Search Toggle Button -->
          <button
            type="button"
            @click="searchOpen = !searchOpen"
            class="p-2 text-zinc-700 hover:text-zinc-900 transition-colors"
            aria-label="Search collection"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- Shopping Bag Button -->
          <button
            type="button"
            @click="cartStore.openDrawer"
            class="relative p-2 text-zinc-700 hover:text-zinc-900 transition-colors"
            aria-label="Open shopping bag"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span
              v-if="cartStore.itemCount > 0"
              class="absolute -top-1 -right-1 w-5 h-5 bg-zinc-900 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-scale"
            >
              {{ cartStore.itemCount }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Quick Search Dropdown Bar -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="searchOpen" class="bg-zinc-50 border-t border-b border-zinc-200 py-3 px-4">
        <div class="max-w-3xl mx-auto flex items-center gap-3">
          <svg class="w-5 h-5 text-zinc-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="searchQuery"
            @keyup.enter="performSearch"
            type="search"
            placeholder="Search by diamond, 18k gold, sapphire, ring, necklace..."
            class="w-full bg-transparent border-none text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-0"
            autofocus
          />
          <button
            type="button"
            @click="performSearch"
            class="text-xs uppercase tracking-widest font-semibold text-zinc-900 hover:text-gold-600 transition-colors px-3 py-1"
          >
            Search
          </button>
          <button
            type="button"
            @click="searchOpen = false"
            class="text-zinc-400 hover:text-zinc-700 p-1"
          >
            ✕
          </button>
        </div>
      </div>
    </Transition>

    <!-- Mobile Navigation Drawer -->
    <div
      v-if="mobileMenuOpen"
      class="lg:hidden fixed inset-0 top-[112px] bg-white z-30 overflow-y-auto p-6 border-t border-zinc-100 shadow-xl"
    >
      <nav class="space-y-4 text-base font-serif uppercase tracking-widest divide-y divide-zinc-100">
        <NuxtLink
          to="/products"
          @click="mobileMenuOpen = false"
          class="block pt-3 text-zinc-900 hover:text-gold-600"
        >
          All Collections
        </NuxtLink>
        <NuxtLink
          to="/products?category=rings"
          @click="mobileMenuOpen = false"
          class="block pt-3 text-zinc-700 hover:text-gold-600"
        >
          Rings & Bands
        </NuxtLink>
        <NuxtLink
          to="/products?category=necklaces"
          @click="mobileMenuOpen = false"
          class="block pt-3 text-zinc-700 hover:text-gold-600"
        >
          Necklaces & Pendants
        </NuxtLink>
        <NuxtLink
          to="/products?category=earrings"
          @click="mobileMenuOpen = false"
          class="block pt-3 text-zinc-700 hover:text-gold-600"
        >
          Earrings & Huggies
        </NuxtLink>
        <NuxtLink
          to="/products?category=bracelets"
          @click="mobileMenuOpen = false"
          class="block pt-3 text-zinc-700 hover:text-gold-600"
        >
          Bracelets & Cuffs
        </NuxtLink>
        <NuxtLink
          to="/about"
          @click="mobileMenuOpen = false"
          class="block pt-3 text-zinc-700 hover:text-gold-600"
        >
          Our Atelier & Ethics
        </NuxtLink>
        <NuxtLink
          to="/cart"
          @click="mobileMenuOpen = false"
          class="block pt-3 text-gold-700 font-semibold flex items-center justify-between"
        >
          <span>View Shopping Bag</span>
          <span class="text-xs bg-zinc-900 text-white px-2 py-0.5 rounded-full font-mono">{{ cartStore.itemCount }}</span>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const cartStore = useCartStore()
const router = useRouter()

const mobileMenuOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/products',
      query: { search: searchQuery.value.trim() },
    })
    searchOpen.value = false
    searchQuery.value = ''
  }
}
</script>
