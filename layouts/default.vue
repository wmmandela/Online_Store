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
            name: 'AURELIA Fine Jewelry Kenya',
            url: siteUrl,
            logo: `${siteUrl}/favicon.svg`,
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Westlands Commercial Centre, Ring Road',
              addressLocality: 'Nairobi',
              addressRegion: 'Nairobi County',
              postalCode: '00100',
              addressCountry: 'KE',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+254-712-345-678',
              contactType: 'customer service',
              areaServed: ['Kenya', 'Worldwide'],
              availableLanguage: ['English', 'Swahili'],
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
