<template>
  <div class="min-h-screen flex flex-col bg-[#FCFBF9] text-zinc-900 selection:bg-gold-200 selection:text-gold-900">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content View -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Slide-over Cart Drawer -->
    <CartDrawer />

    <!-- Instant Quick View Modal -->
    <QuickViewModal />

    <!-- Reactive Toast Alerts -->
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || 'https://aurelia-jewelry.vercel.app'

// Global Organization and WebSite Structured Data Schema
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${siteUrl}/#organization`,
            name: 'AURELIA Fine Jewelry',
            url: siteUrl,
            logo: `${siteUrl}/favicon.svg`,
            sameAs: [
              'https://instagram.com/aureliafinejewelry',
              'https://pinterest.com/aureliafinejewelry',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+1-800-555-0199',
              contactType: 'customer service',
              areaServed: 'Worldwide',
              availableLanguage: ['English', 'French'],
            },
          },
          {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            url: siteUrl,
            name: 'AURELIA Fine Jewelry',
            publisher: {
              '@id': `${siteUrl}/#organization`,
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: `${siteUrl}/products?search={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          },
        ],
      }),
    },
  ],
})
</script>
