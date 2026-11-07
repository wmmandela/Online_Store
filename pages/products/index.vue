<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Breadcrumbs -->
    <Breadcrumb :items="breadcrumbItems" />

    <!-- Collection Header -->
    <div class="border-b border-zinc-200 pb-8 pt-4">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span class="text-xs uppercase tracking-[0.3em] text-gold-600 font-medium block mb-1.5">
            Haute Joaillerie
          </span>
          <h1 class="font-serif text-3xl sm:text-4xl text-zinc-900 font-normal">
            {{ pageTitle }}
          </h1>
          <p class="text-xs sm:text-sm text-zinc-500 mt-2 max-w-xl">
            {{ pageDescription }}
          </p>
        </div>

        <!-- Desktop Quick Stats & Mobile Filter Button -->
        <div class="flex items-center gap-3">
          <span class="text-xs text-zinc-500 font-medium hidden sm:inline">
            Showing <strong class="text-zinc-900">{{ totalProducts }}</strong> creations
          </span>
          <button
            type="button"
            @click="mobileFilterOpen = true"
            class="lg:hidden flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-medium border border-zinc-300 bg-white text-zinc-900"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>Filters</span>
            <span v-if="activeFilterCount > 0" class="w-4 h-4 rounded-full bg-zinc-900 text-white text-[10px] flex items-center justify-center">
              {{ activeFilterCount }}
            </span>
          </button>
        </div>
      </div>

      <!-- Quick Category Tabs Strip -->
      <div class="flex items-center gap-2 overflow-x-auto pt-6 no-scrollbar">
        <button
          type="button"
          @click="setCategory('all')"
          class="px-4 py-1.5 text-xs uppercase tracking-wider font-medium rounded-full transition-colors whitespace-nowrap"
          :class="!activeCategory || activeCategory === 'all' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'"
        >
          All ({{ allCount }})
        </button>
        <button
          v-for="cat in categories"
          :key="cat.id"
          type="button"
          @click="setCategory(cat.slug)"
          class="px-4 py-1.5 text-xs uppercase tracking-wider font-medium rounded-full transition-colors whitespace-nowrap"
          :class="activeCategory === cat.slug ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'"
        >
          {{ cat.name }} ({{ cat.count }})
        </button>
      </div>
    </div>

    <!-- Active Filters Bar & Controls -->
    <div class="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100">
      <!-- Search Input -->
      <div class="relative max-w-xs w-full">
        <input
          v-model="searchInput"
          @input="onSearchInput"
          type="text"
          placeholder="Filter by keyword..."
          class="w-full text-xs bg-zinc-50 border border-zinc-200 rounded-sm px-3 py-2 pl-8 focus:outline-none focus:border-zinc-400"
        />
        <svg class="w-4 h-4 text-zinc-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <button
          v-if="searchInput"
          @click="clearSearch"
          class="absolute right-2.5 top-2 text-zinc-400 hover:text-zinc-600 text-xs"
        >
          ✕
        </button>
      </div>

      <!-- Sort Selector Dropdown -->
      <div class="flex items-center gap-2 self-end sm:self-auto">
        <label for="sort-select" class="text-xs uppercase tracking-wider text-zinc-500 font-medium">
          Sort by:
        </label>
        <select
          id="sort-select"
          v-model="selectedSort"
          @change="onSortChange"
          class="text-xs font-medium bg-white border border-zinc-200 rounded-sm px-3 py-2 focus:outline-none focus:border-zinc-400"
        >
          <option value="featured">Featured & Bestsellers</option>
          <option value="newest">Newest Arrivals</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>

    <!-- Active Filters Tags (if any) -->
    <div v-if="activeFilterCount > 0" class="pt-4 flex flex-wrap items-center gap-2">
      <span class="text-xs text-zinc-500">Active filters:</span>
      <span
        v-if="activeCategory && activeCategory !== 'all'"
        class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 text-zinc-800 text-xs rounded-full"
      >
        Collection: {{ activeCategory }}
        <button @click="setCategory('all')" class="text-zinc-500 hover:text-zinc-900">✕</button>
      </span>
      <span
        v-if="selectedMaterial"
        class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 text-zinc-800 text-xs rounded-full"
      >
        Material: {{ selectedMaterial }}
        <button @click="selectedMaterial = ''" class="text-zinc-500 hover:text-zinc-900">✕</button>
      </span>
      <span
        v-if="selectedGemstone"
        class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 text-zinc-800 text-xs rounded-full"
      >
        Gem: {{ selectedGemstone }}
        <button @click="selectedGemstone = ''" class="text-zinc-500 hover:text-zinc-900">✕</button>
      </span>
      <span
        v-if="inStockOnly"
        class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 text-zinc-800 text-xs rounded-full"
      >
        In Stock Only
        <button @click="inStockOnly = false" class="text-zinc-500 hover:text-zinc-900">✕</button>
      </span>
      <button
        @click="resetAllFilters"
        class="text-xs text-gold-700 underline hover:text-zinc-900 ml-2 font-medium"
      >
        Clear All
      </button>
    </div>

    <!-- Layout: Desktop Sidebar Filters + Product Grid -->
    <div class="pt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Desktop Sidebar -->
      <aside class="hidden lg:block space-y-8 pr-4">
        <!-- Material Filter -->
        <div>
          <h3 class="text-xs uppercase tracking-wider font-semibold text-zinc-900 mb-3">
            Precious Metal
          </h3>
          <div class="space-y-2">
            <label
              v-for="mat in availableMaterials"
              :key="mat"
              class="flex items-center text-xs text-zinc-700 cursor-pointer hover:text-zinc-900"
            >
              <input
                type="radio"
                name="material"
                :value="mat"
                v-model="selectedMaterial"
                class="w-3.5 h-3.5 text-zinc-900 border-zinc-300 focus:ring-0"
              />
              <span class="ml-2.5">{{ mat }}</span>
            </label>
            <label class="flex items-center text-xs text-zinc-500 cursor-pointer pt-1">
              <input
                type="radio"
                name="material"
                value=""
                v-model="selectedMaterial"
                class="w-3.5 h-3.5 text-zinc-900 border-zinc-300 focus:ring-0"
              />
              <span class="ml-2.5">All Metals</span>
            </label>
          </div>
        </div>

        <!-- Gemstone Filter -->
        <div>
          <h3 class="text-xs uppercase tracking-wider font-semibold text-zinc-900 mb-3">
            Gemstone
          </h3>
          <div class="space-y-2">
            <label
              v-for="gem in availableGemstones"
              :key="gem"
              class="flex items-center text-xs text-zinc-700 cursor-pointer hover:text-zinc-900"
            >
              <input
                type="radio"
                name="gemstone"
                :value="gem"
                v-model="selectedGemstone"
                class="w-3.5 h-3.5 text-zinc-900 border-zinc-300 focus:ring-0"
              />
              <span class="ml-2.5">{{ gem }}</span>
            </label>
            <label class="flex items-center text-xs text-zinc-500 cursor-pointer pt-1">
              <input
                type="radio"
                name="gemstone"
                value=""
                v-model="selectedGemstone"
                class="w-3.5 h-3.5 text-zinc-900 border-zinc-300 focus:ring-0"
              />
              <span class="ml-2.5">All Gemstones</span>
            </label>
          </div>
        </div>

        <!-- Availability Toggle -->
        <div class="pt-2 border-t border-zinc-100">
          <label class="flex items-center text-xs text-zinc-700 cursor-pointer hover:text-zinc-900">
            <input
              type="checkbox"
              v-model="inStockOnly"
              class="w-3.5 h-3.5 text-zinc-900 rounded border-zinc-300 focus:ring-0"
            />
            <span class="ml-2.5 font-medium">In Stock Items Only</span>
          </label>
        </div>

        <!-- Reset Button -->
        <div class="pt-4 border-t border-zinc-100">
          <button
            type="button"
            @click="resetAllFilters"
            class="w-full py-2 text-xs uppercase tracking-widest font-medium border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      </aside>

      <!-- Products Grid Area (3 cols desktop) -->
      <div class="lg:col-span-3">
        <ProductGrid
          :products="products"
          :loading="pending"
          @reset="resetAllFilters"
        />

        <!-- Pagination Controls -->
        <div
          v-if="totalPages > 1"
          class="mt-12 pt-6 border-t border-zinc-200 flex items-center justify-between"
        >
          <button
            type="button"
            @click="setPage(currentPage - 1)"
            :disabled="currentPage <= 1"
            class="px-4 py-2 text-xs uppercase tracking-wider font-medium border border-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-50"
          >
            ← Previous
          </button>

          <span class="text-xs text-zinc-500 font-medium">
            Page {{ currentPage }} of {{ totalPages }}
          </span>

          <button
            type="button"
            @click="setPage(currentPage + 1)"
            :disabled="currentPage >= totalPages"
            class="px-4 py-2 text-xs uppercase tracking-wider font-medium border border-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-50"
          >
            Next →
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Slide-over Filter Drawer -->
    <Teleport to="body">
      <div
        v-if="mobileFilterOpen"
        class="fixed inset-0 z-50 overflow-hidden lg:hidden"
        role="dialog"
      >
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="mobileFilterOpen = false"></div>
        <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div class="w-screen max-w-xs bg-white p-6 shadow-2xl flex flex-col justify-between">
            <div class="space-y-6 overflow-y-auto">
              <div class="flex items-center justify-between pb-4 border-b border-zinc-100">
                <h3 class="font-serif text-lg text-zinc-900 font-medium">Filters</h3>
                <button @click="mobileFilterOpen = false" class="text-zinc-400 hover:text-zinc-900">✕</button>
              </div>

              <!-- Precious Metal -->
              <div>
                <h4 class="text-xs uppercase tracking-wider font-semibold text-zinc-900 mb-3">Metal</h4>
                <div class="space-y-2">
                  <label v-for="mat in availableMaterials" :key="mat" class="flex items-center text-xs text-zinc-700">
                    <input type="radio" :value="mat" v-model="selectedMaterial" class="w-3.5 h-3.5 text-zinc-900" />
                    <span class="ml-2.5">{{ mat }}</span>
                  </label>
                  <label class="flex items-center text-xs text-zinc-500 pt-1">
                    <input type="radio" value="" v-model="selectedMaterial" class="w-3.5 h-3.5 text-zinc-900" />
                    <span class="ml-2.5">All Metals</span>
                  </label>
                </div>
              </div>

              <!-- Gemstone -->
              <div>
                <h4 class="text-xs uppercase tracking-wider font-semibold text-zinc-900 mb-3">Gemstone</h4>
                <div class="space-y-2">
                  <label v-for="gem in availableGemstones" :key="gem" class="flex items-center text-xs text-zinc-700">
                    <input type="radio" :value="gem" v-model="selectedGemstone" class="w-3.5 h-3.5 text-zinc-900" />
                    <span class="ml-2.5">{{ gem }}</span>
                  </label>
                  <label class="flex items-center text-xs text-zinc-500 pt-1">
                    <input type="radio" value="" v-model="selectedGemstone" class="w-3.5 h-3.5 text-zinc-900" />
                    <span class="ml-2.5">All Gemstones</span>
                  </label>
                </div>
              </div>

              <!-- In Stock -->
              <div>
                <label class="flex items-center text-xs text-zinc-700">
                  <input type="checkbox" v-model="inStockOnly" class="w-3.5 h-3.5 text-zinc-900" />
                  <span class="ml-2.5 font-medium">In Stock Only</span>
                </label>
              </div>
            </div>

            <div class="pt-4 border-t border-zinc-100 space-y-2">
              <button
                type="button"
                @click="mobileFilterOpen = false"
                class="w-full py-2.5 bg-zinc-900 text-white text-xs uppercase tracking-widest font-semibold"
              >
                Apply Filters
              </button>
              <button
                type="button"
                @click="resetAllFilters"
                class="w-full py-2 text-xs uppercase tracking-widest text-zinc-500"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { ProductListResponse, CategorySummary } from '../../types/product'

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || 'https://aurelia-jewelry.vercel.app'

// Reactive state
const activeCategory = ref<string>((route.query.category as string) || 'all')
const selectedMaterial = ref<string>((route.query.material as string) || '')
const selectedGemstone = ref<string>((route.query.gemstone as string) || '')
const inStockOnly = ref<boolean>(route.query.inStockOnly === 'true')
const selectedSort = ref<string>((route.query.sort as string) || 'featured')
const searchInput = ref<string>((route.query.search as string) || '')
const currentPage = ref<number>(Number(route.query.page) || 1)
const mobileFilterOpen = ref(false)

// Fetch Categories for counts
const { data: categoriesData } = await useFetch<CategorySummary[]>('/api/categories')
const categories = computed(() => categoriesData.value || [])
const allCount = computed(() => categories.value.reduce((sum, c) => sum + c.count, 0))

// Query parameters computed
const queryParams = computed(() => {
  const q: Record<string, any> = {
    sort: selectedSort.value,
    page: currentPage.value,
    limit: 9,
  }
  if (activeCategory.value && activeCategory.value !== 'all') q.category = activeCategory.value
  if (selectedMaterial.value) q.material = selectedMaterial.value
  if (selectedGemstone.value) q.gemstone = selectedGemstone.value
  if (inStockOnly.value) q.inStockOnly = true
  if (searchInput.value.trim()) q.search = searchInput.value.trim()
  return q
})

// Sync query back to browser URL
watch(queryParams, (newParams) => {
  router.replace({ query: newParams })
})

// Fetch Products from Server API
const { data, pending } = await useFetch<ProductListResponse>('/api/products', {
  query: queryParams,
  watch: [queryParams],
})

const products = computed(() => data.value?.products || [])
const totalProducts = computed(() => data.value?.total || 0)
const totalPages = computed(() => data.value?.totalPages || 1)
const availableMaterials = computed(() => data.value?.availableMaterials || [])
const availableGemstones = computed(() => data.value?.availableGemstones || [])

const activeFilterCount = computed(() => {
  let count = 0
  if (activeCategory.value && activeCategory.value !== 'all') count++
  if (selectedMaterial.value) count++
  if (selectedGemstone.value) count++
  if (inStockOnly.value) count++
  if (searchInput.value) count++
  return count
})

const setCategory = (cat: string) => {
  activeCategory.value = cat
  currentPage.value = 1
}

const setPage = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 120, behavior: 'smooth' })
}

const onSortChange = () => {
  currentPage.value = 1
}

let debounceTimer: any = null
const onSearchInput = () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    currentPage.value = 1
  }, 350)
}

const clearSearch = () => {
  searchInput.value = ''
  currentPage.value = 1
}

const resetAllFilters = () => {
  activeCategory.value = 'all'
  selectedMaterial.value = ''
  selectedGemstone.value = ''
  inStockOnly.value = false
  searchInput.value = ''
  selectedSort.value = 'featured'
  currentPage.value = 1
}

// Page Titles & Descriptions for dynamic SEO
const categoryNames: Record<string, string> = {
  rings: 'Bespoke Rings & Solitaire Diamond Bands',
  necklaces: 'Fine Necklaces, Tennis Chains & Pendants',
  earrings: 'Pavé Huggie Earrings & Chandelier Drops',
  bracelets: 'Solid 18K Gold Cuffs & Diamond Tennis Bracelets',
}

const pageTitle = computed(() => {
  if (activeCategory.value && categoryNames[activeCategory.value]) {
    return categoryNames[activeCategory.value]
  }
  return 'The Fine Jewelry Collection'
})

const pageDescription = computed(() => {
  if (activeCategory.value === 'rings') {
    return 'Handcrafted solitaires, emerald-cut eternity bands, and bespoke engagement rings forged with ethical diamonds in 18k gold and platinum.'
  }
  return 'Explore our curated catalog of handcrafted fine jewelry. Certified recycled 18k solid gold, laboratory diamonds, and responsibly extracted gemstones.'
})

const breadcrumbItems = computed(() => {
  const items = [{ label: 'All Jewelry', to: '/products' }]
  if (activeCategory.value && activeCategory.value !== 'all') {
    items.push({ label: activeCategory.value.charAt(0).toUpperCase() + activeCategory.value.slice(1) })
  }
  return items
})

// Dynamic SEO Head & Open Graph
useSeoMeta({
  title: () => `${pageTitle.value} | AURELIA Fine Jewelry`,
  ogTitle: () => `${pageTitle.value} | AURELIA Fine Jewelry`,
  description: () => pageDescription.value,
  ogDescription: () => pageDescription.value,
  ogUrl: () => `${siteUrl}/products${activeCategory.value !== 'all' ? `?category=${activeCategory.value}` : ''}`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: () => `${siteUrl}/products${activeCategory.value !== 'all' ? `?category=${activeCategory.value}` : ''}`,
    },
  ],
})
</script>
