<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
    <!-- Breadcrumb -->
    <Breadcrumb :items="[{ label: 'Our Atelier & Ethics' }]" />

    <!-- Hero Story Header -->
    <div class="text-center max-w-3xl mx-auto space-y-4">
      <span class="text-xs uppercase tracking-[0.35em] text-gold-600 font-medium block">
        The Aurelia Atelier
      </span>
      <h1 class="font-serif text-4xl sm:text-5xl md:text-6xl text-zinc-900 font-normal leading-tight">
        Sculpting the Future of Fine Jewelry
      </h1>
      <p class="text-sm sm:text-base text-zinc-600 leading-relaxed font-light">
        Founded on the belief that enduring luxury must never cost the earth. We unite classical European goldsmithing heritage with cutting-edge ethical metallurgy.
      </p>
    </div>

    <!-- Atelier Imagery Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div class="aspect-[4/5] bg-zinc-100 rounded-sm overflow-hidden shadow-subtle">
        <img
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
          alt="Aurelia Gold Necklace Crafting"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="space-y-6">
        <span class="text-xs uppercase tracking-[0.3em] text-gold-600 font-semibold block">
          Pillar I: Pure Recycled Gold
        </span>
        <h2 class="font-serif text-3xl text-zinc-900 font-normal">
          100% Recycled 18K Solid Gold & Platinum 950
        </h2>
        <p class="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          Traditional gold mining extracts up to 20 tons of toxic mine waste for a single plain wedding band. Aurelia exclusively utilizes certified post-consumer recycled gold and platinum refined in Switzerland and Germany.
        </p>
        <p class="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          This results in a 99.8% reduction in carbon emissions, zero toxic cyanide or mercury runoff, and identical molecular purity with official 750 (18k) and 950 hallmarks.
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
      <div class="space-y-6 order-2 md:order-1">
        <span class="text-xs uppercase tracking-[0.3em] text-gold-600 font-semibold block">
          Pillar II: Conflict-Free Diamonds
        </span>
        <h2 class="font-serif text-3xl text-zinc-900 font-normal">
          Optical, Physical & Chemical Perfection
        </h2>
        <p class="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          Whether lab-grown with 100% solar energy or sustainably mined under strict Fairmined criteria, every diamond we set is classified within the top 1% of the world’s cut, color, and clarity tiers (D–F color, VVS1–VS1 clarity).
        </p>
        <p class="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          Each centerpiece diamond comes laser-inscribed and accompanied by an official IGI (International Gemological Institute) certificate verifying its heritage.
        </p>
      </div>
      <div class="aspect-[4/5] bg-zinc-100 rounded-sm overflow-hidden shadow-subtle order-1 md:order-2">
        <img
          src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80"
          alt="Aurelia Solitaire Diamond Setting"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <!-- Ring Sizing Table & Guide -->
    <div class="bg-zinc-50 border border-zinc-200/80 rounded-sm p-8 space-y-6">
      <div class="text-center max-w-xl mx-auto">
        <span class="text-xs uppercase tracking-[0.3em] text-gold-600 font-semibold block mb-1">
          Complimentary Service
        </span>
        <h3 class="font-serif text-2xl text-zinc-900 font-normal">
          International Ring Sizing Reference
        </h3>
        <p class="text-xs text-zinc-500 mt-1">
          We provide one complimentary resizing within 60 days of purchase for all solitaire and band rings.
        </p>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-xs text-left text-zinc-700 divide-y divide-zinc-200">
          <thead class="bg-zinc-100 uppercase tracking-wider text-[11px] font-semibold text-zinc-900">
            <tr>
              <th class="py-3 px-4">US / Canada</th>
              <th class="py-3 px-4">UK / Australia</th>
              <th class="py-3 px-4">Europe (Inside Circ.)</th>
              <th class="py-3 px-4">Diameter (mm)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100">
            <tr>
              <td class="py-2.5 px-4 font-semibold">Size 5</td>
              <td class="py-2.5 px-4">J 1/2</td>
              <td class="py-2.5 px-4">49.3 mm</td>
              <td class="py-2.5 px-4 font-mono">15.7 mm</td>
            </tr>
            <tr>
              <td class="py-2.5 px-4 font-semibold">Size 6</td>
              <td class="py-2.5 px-4">L 1/2</td>
              <td class="py-2.5 px-4">51.9 mm</td>
              <td class="py-2.5 px-4 font-mono">16.5 mm</td>
            </tr>
            <tr>
              <td class="py-2.5 px-4 font-semibold">Size 7</td>
              <td class="py-2.5 px-4">N 1/2</td>
              <td class="py-2.5 px-4">54.4 mm</td>
              <td class="py-2.5 px-4 font-mono">17.3 mm</td>
            </tr>
            <tr>
              <td class="py-2.5 px-4 font-semibold">Size 8</td>
              <td class="py-2.5 px-4">P 1/2</td>
              <td class="py-2.5 px-4">57.0 mm</td>
              <td class="py-2.5 px-4 font-mono">18.1 mm</td>
            </tr>
            <tr>
              <td class="py-2.5 px-4 font-semibold">Size 9</td>
              <td class="py-2.5 px-4">R 1/2</td>
              <td class="py-2.5 px-4">59.5 mm</td>
              <td class="py-2.5 px-4 font-mono">18.9 mm</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Concierge Contact Strip -->
    <div class="text-center py-10 border-t border-zinc-200">
      <h3 class="font-serif text-2xl text-zinc-900 font-normal mb-2">
        Speak With a Private Atelier Concierge
      </h3>
      <p class="text-xs text-zinc-500 max-w-md mx-auto mb-6">
        Have questions about custom diamond sizing, engraving, or bespoke heirloom redesigns? Our master gemologists are at your service.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-semibold uppercase tracking-wider">
        <a
          href="mailto:concierge@aureliafinejewelry.com"
          class="px-6 py-3 bg-zinc-900 text-white hover:bg-gold-500 transition-colors"
        >
          Email Concierge Salon
        </a>
        <NuxtLink
          to="/products"
          class="px-6 py-3 border border-zinc-300 text-zinc-800 hover:bg-zinc-50 transition-colors"
        >
          Browse Current Catalog
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || 'https://aurelia-jewelry.vercel.app'

useSeoMeta({
  title: 'Our Atelier & Sustainability Charter | AURELIA Fine Jewelry',
  ogTitle: 'Our Atelier & Sustainability Charter | AURELIA Fine Jewelry',
  description: 'Learn about our 100% recycled 18k solid gold, conflict-free diamond certification, and European artisan craftsmanship.',
  ogDescription: 'Learn about our 100% recycled 18k solid gold, conflict-free diamond certification, and European artisan craftsmanship.',
  ogUrl: `${siteUrl}/about`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/about` }],
})
</script>
