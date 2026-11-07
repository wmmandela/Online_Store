<template>
  <div v-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Breadcrumb with Schema -->
    <Breadcrumb :items="breadcrumbItems" />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-4">
      <!-- Left Column: Multi-Image Gallery (7 cols on lg) -->
      <div class="lg:col-span-7 space-y-4">
        <!-- Main Large Image Container -->
        <div class="relative aspect-[4/5] bg-zinc-50 rounded-sm overflow-hidden border border-zinc-100 shadow-subtle group">
          <img
            :src="selectedImage || product.images[0]"
            :alt="product.name"
            width="900"
            height="1125"
            fetchpriority="high"
            decoding="async"
            class="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          />

          <!-- Bestseller / New Badge -->
          <div class="absolute top-4 left-4 flex flex-col gap-2 z-10">
            <span
              v-if="product.isBestseller"
              class="px-3 py-1 text-[10px] uppercase font-semibold tracking-widest bg-zinc-900 text-white"
            >
              Bestseller
            </span>
            <span
              v-else-if="product.isNew"
              class="px-3 py-1 text-[10px] uppercase font-semibold tracking-widest bg-gold-500 text-white"
            >
              New Arrival
            </span>
            <span
              v-if="discountPercentage"
              class="px-3 py-1 text-[10px] uppercase font-semibold tracking-widest bg-rose-900 text-rose-50"
            >
              -{{ discountPercentage }}%
            </span>
          </div>

          <!-- Image Counter -->
          <div class="absolute bottom-4 right-4 px-2.5 py-1 text-[11px] bg-white/80 backdrop-blur-sm text-zinc-700 font-mono rounded">
            {{ activeImageIndex + 1 }} / {{ product.images.length }}
          </div>
        </div>

        <!-- Thumbnail Strip -->
        <div v-if="product.images.length > 1" class="grid grid-cols-4 sm:grid-cols-5 gap-3">
          <button
            v-for="(img, idx) in product.images"
            :key="idx"
            type="button"
            @click="selectedImage = img"
            class="relative aspect-[4/5] bg-zinc-50 rounded-sm overflow-hidden border transition-all"
            :class="selectedImage === img || (!selectedImage && idx === 0) ? 'border-zinc-900 ring-2 ring-zinc-900/10' : 'border-zinc-200 hover:border-zinc-400 opacity-70 hover:opacity-100'"
            :aria-label="`View image ${idx + 1}`"
          >
            <img
              :src="img"
              :alt="`${product.name} view ${idx + 1}`"
              loading="lazy"
              class="w-full h-full object-cover object-center"
            />
          </button>
        </div>
      </div>

      <!-- Right Column: Product Details & Purchase Controls (5 cols on lg) -->
      <div class="lg:col-span-5 flex flex-col justify-start space-y-6">
        <!-- Collection Subheading & Rating -->
        <div>
          <div class="flex items-center justify-between text-xs text-zinc-500 mb-2">
            <NuxtLink
              :to="`/products?category=${product.category}`"
              class="uppercase tracking-[0.25em] text-gold-600 font-medium hover:underline"
            >
              {{ product.categoryLabel }}
            </NuxtLink>
            <a href="#reviews" class="flex items-center gap-1.5 hover:text-zinc-900 transition-colors">
              <StarRating :rating="product.rating" :count="product.reviewCount" />
            </a>
          </div>

          <h1 class="font-serif text-3xl sm:text-4xl text-zinc-900 font-normal leading-tight">
            {{ product.name }}
          </h1>

          <!-- Price & Installments -->
          <div class="mt-3 flex items-baseline gap-3">
            <span class="font-sans text-2xl sm:text-3xl font-medium text-zinc-900">
              {{ formatPrice(product.price) }}
            </span>
            <span v-if="product.compareAtPrice" class="text-base text-zinc-400 line-through">
              {{ formatPrice(product.compareAtPrice) }}
            </span>
          </div>
          <p class="text-[11px] text-zinc-500 mt-1">
            Or 4 interest-free payments of {{ formatPrice(Math.round(product.price / 4)) }} with <strong class="text-zinc-700">Klarna</strong>
          </p>
        </div>

        <!-- Description -->
        <div class="text-xs sm:text-sm text-zinc-600 leading-relaxed space-y-2 border-t border-b border-zinc-100 py-4">
          <p>{{ product.description }}</p>
        </div>

        <!-- Variant Options (Size / Length) -->
        <div v-if="product.sizes && product.sizes.length > 0" class="space-y-2.5">
          <div class="flex items-center justify-between text-xs">
            <label class="uppercase tracking-wider font-semibold text-zinc-900">
              Select {{ product.category === 'rings' ? 'Ring Size' : 'Chain Length' }}:
              <span class="text-gold-700 font-bold ml-1">{{ selectedSize }}</span>
            </label>
            <button
              type="button"
              @click="sizingGuideOpen = !sizingGuideOpen"
              class="text-zinc-500 hover:text-zinc-900 underline text-[11px]"
            >
              Sizing Guide
            </button>
          </div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="size in product.sizes"
              :key="size"
              type="button"
              @click="selectedSize = size"
              class="px-4 py-2 text-xs font-medium border transition-all"
              :class="selectedSize === size ? 'border-zinc-900 bg-zinc-900 text-white shadow-subtle' : 'border-zinc-200 text-zinc-800 hover:border-zinc-400 bg-white'"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <!-- Complimentary Custom Engraving Field (if customizable) -->
        <div v-if="product.customizable" class="space-y-1.5 p-3.5 bg-zinc-50 border border-zinc-200/80 rounded-sm">
          <div class="flex items-center justify-between text-xs">
            <label class="font-medium text-zinc-900 flex items-center gap-1.5">
              <span>Complimentary Engraving</span>
              <span class="text-[10px] text-gold-600 uppercase font-semibold">Free</span>
            </label>
            <span class="text-[10px] text-zinc-400 font-mono">{{ 24 - engravingText.length }} chars left</span>
          </div>
          <input
            v-model="engravingText"
            maxlength="24"
            type="text"
            placeholder="e.g. Always & Forever (or Initials / Date)"
            class="w-full text-xs bg-white border border-zinc-300 rounded-sm px-3 py-2 focus:outline-none focus:border-zinc-900"
          />
          <p class="text-[10px] text-zinc-500">
            Precision laser-engraved inside the band prior to final inspection.
          </p>
        </div>

        <!-- Stock Indicator -->
        <div class="flex items-center gap-2 text-xs">
          <span class="w-2 h-2 rounded-full" :class="product.inStock ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'"></span>
          <span v-if="product.inStock" class="text-zinc-700">
            <strong>In Stock</strong> — ships within 24 hours with insured courier
          </span>
          <span v-else class="text-rose-600 font-medium">
            Currently backordered. Made to order (3-4 weeks).
          </span>
        </div>

        <!-- Add to Bag CTA & Quantity Stepper -->
        <div class="space-y-3 pt-2">
          <div class="flex items-center gap-3">
            <!-- Quantity Stepper -->
            <div class="flex items-center border border-zinc-300 rounded-sm bg-white h-12 px-2">
              <button
                type="button"
                @click="quantity = Math.max(1, quantity - 1)"
                class="px-2.5 py-1 text-zinc-600 hover:text-zinc-900 text-sm"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span class="w-8 text-center text-xs font-semibold text-zinc-900 font-mono">
                {{ quantity }}
              </span>
              <button
                type="button"
                @click="quantity = Math.min(product.inventory, quantity + 1)"
                class="px-2.5 py-1 text-zinc-600 hover:text-zinc-900 text-sm"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <!-- Add to Bag Button -->
            <button
              type="button"
              @click="handleAddToCart"
              :disabled="!product.inStock || addingToCart"
              class="flex-1 h-12 bg-zinc-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-gold-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-subtle"
            >
              <svg v-if="addingToCart" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ product.inStock ? 'Add to Shopping Bag' : 'Out of Stock' }}</span>
            </button>
          </div>

          <NuxtLink
            to="/cart"
            class="block w-full py-2.5 text-center text-xs uppercase tracking-wider text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-300 bg-white transition-colors"
          >
            View Bag & Checkout ({{ cartStore.itemCount }} items)
          </NuxtLink>
        </div>

        <!-- Service Highlights Strip -->
        <div class="grid grid-cols-3 gap-2 py-4 border-t border-b border-zinc-100 text-center text-[10px] text-zinc-500 uppercase tracking-wider">
          <div class="p-2 bg-zinc-50 rounded-sm">
            <span class="block font-serif text-sm text-zinc-900 mb-0.5">✦ Free Express</span>
            Insured Worldwide
          </div>
          <div class="p-2 bg-zinc-50 rounded-sm">
            <span class="block font-serif text-sm text-zinc-900 mb-0.5">✦ 30 Days</span>
            Bespoke Returns
          </div>
          <div class="p-2 bg-zinc-50 rounded-sm">
            <span class="block font-serif text-sm text-zinc-900 mb-0.5">✦ Velvet Case</span>
            Included Free
          </div>
        </div>

        <!-- Expandable Detail Accordions -->
        <div class="divide-y divide-zinc-200 border-b border-zinc-200 pt-2 text-xs">
          <!-- Accordion 1: Specifications -->
          <div>
            <button
              type="button"
              @click="openAccordion = openAccordion === 'specs' ? '' : 'specs'"
              class="w-full py-3.5 flex items-center justify-between text-left font-semibold text-zinc-900 uppercase tracking-wider hover:text-gold-600 transition-colors"
            >
              <span>Gemstone & Metal Specifications</span>
              <span class="text-zinc-400 font-mono">{{ openAccordion === 'specs' ? '−' : '+' }}</span>
            </button>
            <div v-show="openAccordion === 'specs'" class="pb-4 space-y-2">
              <dl class="divide-y divide-zinc-100 text-zinc-600">
                <div
                  v-for="(val, key) in product.specifications"
                  :key="key"
                  class="py-1.5 flex justify-between gap-4"
                >
                  <dt class="font-medium text-zinc-800">{{ key }}</dt>
                  <dd class="text-right">{{ val }}</dd>
                </div>
              </dl>
            </div>
          </div>

          <!-- Accordion 2: Sourcing & Sustainability -->
          <div>
            <button
              type="button"
              @click="openAccordion = openAccordion === 'sustainability' ? '' : 'sustainability'"
              class="w-full py-3.5 flex items-center justify-between text-left font-semibold text-zinc-900 uppercase tracking-wider hover:text-gold-600 transition-colors"
            >
              <span>Ethical Sourcing & Sustainability</span>
              <span class="text-zinc-400 font-mono">{{ openAccordion === 'sustainability' ? '−' : '+' }}</span>
            </button>
            <div v-show="openAccordion === 'sustainability'" class="pb-4 space-y-2 text-zinc-600 leading-relaxed">
              <p>
                100% of the precious metals used in this piece are refined from recycled post-consumer jewelry and electronic contact scrap, generating 99.8% less greenhouse emissions than mined gold.
              </p>
              <p>
                All laboratory-grown and natural diamonds conform strictly to the Kimberley Process and RJC (Responsible Jewellery Council) code of practices.
              </p>
            </div>
          </div>

          <!-- Accordion 3: Care Instructions -->
          <div>
            <button
              type="button"
              @click="openAccordion = openAccordion === 'care' ? '' : 'care'"
              class="w-full py-3.5 flex items-center justify-between text-left font-semibold text-zinc-900 uppercase tracking-wider hover:text-gold-600 transition-colors"
            >
              <span>Lifetime Care & Maintenance</span>
              <span class="text-zinc-400 font-mono">{{ openAccordion === 'care' ? '−' : '+' }}</span>
            </button>
            <div v-show="openAccordion === 'care'" class="pb-4 text-zinc-600 leading-relaxed">
              <p>{{ product.careGuide }}</p>
              <p class="mt-2 text-gold-700 font-medium">
                Aurelia provides complimentary annual ultrasonic cleaning, prong retipping, and rhodium plating for life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Customer Reviews Section -->
    <section id="reviews" class="mt-20 pt-14 border-t border-zinc-200">
      <div class="max-w-4xl mx-auto">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-zinc-100 gap-4">
          <div>
            <span class="text-xs uppercase tracking-[0.3em] text-gold-600 font-medium block mb-1">
              Client Feedback
            </span>
            <h2 class="font-serif text-2xl sm:text-3xl text-zinc-900 font-normal">
              Customer Reviews ({{ product.reviewCount }})
            </h2>
          </div>
          <div class="flex items-center gap-3">
            <span class="font-serif text-3xl font-medium text-zinc-900">{{ product.rating }}</span>
            <div>
              <StarRating :rating="product.rating" :show-count="false" />
              <span class="text-[11px] text-zinc-500">Based on {{ product.reviewCount }} verified reviews</span>
            </div>
          </div>
        </div>

        <!-- Reviews List -->
        <div v-if="product.reviews && product.reviews.length > 0" class="divide-y divide-zinc-100 py-6">
          <div v-for="rev in product.reviews" :key="rev.id" class="py-6 space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <StarRating :rating="rev.rating" :show-count="false" />
                <span class="text-xs font-semibold text-zinc-900">{{ rev.title }}</span>
              </div>
              <span class="text-xs text-zinc-400">{{ rev.date }}</span>
            </div>
            <p class="text-xs text-zinc-600 leading-relaxed">{{ rev.comment }}</p>
            <div class="flex items-center gap-1.5 text-[11px] text-zinc-500 pt-1">
              <span class="font-medium text-zinc-800">{{ rev.author }}</span>
              <span v-if="rev.verified" class="inline-flex items-center text-emerald-600 gap-0.5">
                ✓ Verified Purchaser
              </span>
            </div>
          </div>
        </div>

        <div v-else class="py-8 text-center text-xs text-zinc-500">
          Be the first client to submit a review for this bespoke piece.
        </div>
      </div>
    </section>

    <!-- Complete The Look / Related Products Carousel -->
    <section v-if="relatedProducts.length > 0" class="mt-20 pt-14 border-t border-zinc-200">
      <div class="flex items-center justify-between mb-8">
        <div>
          <span class="text-xs uppercase tracking-[0.3em] text-gold-600 font-medium block mb-1">
            Harmonious Pairings
          </span>
          <h2 class="font-serif text-2xl sm:text-3xl text-zinc-900 font-normal">
            Complete the Look
          </h2>
        </div>
        <NuxtLink
          :to="`/products?category=${product.category}`"
          class="text-xs uppercase tracking-wider font-semibold text-zinc-900 hover:text-gold-600"
        >
          View Collection →
        </NuxtLink>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <ProductCard
          v-for="rel in relatedProducts"
          :key="rel.id"
          :product="rel"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../../types/product'

const route = useRoute()
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || 'https://aurelia-jewelry.vercel.app'
const slug = computed(() => route.params.slug as string)

const cartStore = useCartStore()
const { formatPrice } = useCurrency()
const { showToast } = useToast()

// Fetch product & related items from server API
const { data, error } = await useFetch<{ product: Product; relatedProducts: Product[] }>(
  `/api/products/${slug.value}`
)

if (error.value || !data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Product "${slug.value}" does not exist.`,
  })
}

const product = computed(() => data.value.product)
const relatedProducts = computed(() => data.value.relatedProducts || [])

// Interactive State
const selectedImage = ref<string>('')
const selectedSize = ref<string>('')
const engravingText = ref<string>('')
const quantity = ref<number>(1)
const addingToCart = ref<boolean>(false)
const openAccordion = ref<string>('specs')
const sizingGuideOpen = ref<boolean>(false)

watch(
  product,
  (p) => {
    if (p) {
      selectedImage.value = p.images[0] || ''
      selectedSize.value = p.sizes?.[0] || ''
    }
  },
  { immediate: true }
)

const activeImageIndex = computed(() => {
  if (!selectedImage.value) return 0
  const idx = product.value.images.indexOf(selectedImage.value)
  return idx >= 0 ? idx : 0
})

const discountPercentage = computed(() => {
  if (product.value.compareAtPrice && product.value.compareAtPrice > product.value.price) {
    return Math.round(((product.value.compareAtPrice - product.value.price) / product.value.compareAtPrice) * 100)
  }
  return 0
})

const handleAddToCart = async () => {
  if (!product.value.inStock || addingToCart.value) return
  addingToCart.value = true

  try {
    cartStore.addToCart(
      product.value,
      quantity.value,
      selectedSize.value,
      engravingText.value.trim() || undefined
    )
    showToast({
      title: 'Added to Bag',
      message: `${quantity.value}x ${product.value.name} (${selectedSize.value ? `Size ${selectedSize.value}` : ''})`,
      type: 'success',
    })
  } finally {
    setTimeout(() => {
      addingToCart.value = false
    }, 400)
  }
}

const breadcrumbItems = computed(() => [
  { label: 'All Jewelry', to: '/products' },
  {
    label: product.value.categoryLabel,
    to: `/products?category=${product.value.category}`,
  },
  { label: product.value.name },
])

const productCanonicalUrl = computed(() => `${siteUrl}/products/${product.value.slug}`)

// Complete SEO Meta & Open Graph Tags
useSeoMeta({
  title: () => `${product.value.name} | AURELIA Fine Jewelry`,
  ogTitle: () => `${product.value.name} — Handcrafted Fine Jewelry`,
  description: () => product.value.shortDescription,
  ogDescription: () => product.value.shortDescription,
  ogImage: () => product.value.images[0],
  ogUrl: () => productCanonicalUrl.value,
  ogType: 'product',
  twitterCard: 'summary_large_image',
  twitterTitle: () => product.value.name,
  twitterDescription: () => product.value.shortDescription,
  twitterImage: () => product.value.images[0],
})

useHead({
  link: [{ rel: 'canonical', href: productCanonicalUrl.value }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.value.name,
        image: product.value.images,
        description: product.value.description,
        sku: product.value.id,
        mpn: product.value.id,
        brand: {
          '@type': 'Brand',
          name: 'AURELIA',
        },
        offers: {
          '@type': 'Offer',
          url: productCanonicalUrl.value,
          priceCurrency: 'USD',
          price: product.value.price,
          priceValidUntil: '2027-12-31',
          itemCondition: 'https://schema.org/NewCondition',
          availability: product.value.inStock
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          seller: {
            '@type': 'Organization',
            name: 'AURELIA Fine Jewelry',
          },
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            applicableCountry: 'US',
            returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
            merchantReturnDays: 30,
            returnMethod: 'https://schema.org/ReturnByMail',
            returnFees: 'https://schema.org/FreeReturn',
          },
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: {
              '@type': 'MonetaryAmount',
              value: 0,
              currency: 'USD',
            },
            shippingDestination: {
              '@type': 'DefinedRegion',
              addressCountry: 'US',
            },
            deliveryTime: {
              '@type': 'ShippingDeliveryTime',
              handlingTime: {
                '@type': 'QuantitativeValue',
                minValue: 1,
                maxValue: 2,
                unitCode: 'd',
              },
              transitTime: {
                '@type': 'QuantitativeValue',
                minValue: 2,
                maxValue: 4,
                unitCode: 'd',
              },
            },
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.value.rating,
          reviewCount: product.value.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
      }),
    },
  ],
})
</script>
