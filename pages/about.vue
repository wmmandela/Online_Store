<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
    <!-- Breadcrumb -->
    <Breadcrumb :items="[{ label: 'Our Nairobi Atelier & Ethics' }]" />

    <!-- Hero Story Header -->
    <div class="text-center max-w-3xl mx-auto space-y-4">
      <span class="text-xs uppercase tracking-[0.35em] text-gold-600 font-medium block">
        The Aurelia Atelier · Nairobi, Kenya
      </span>
      <h1 class="font-serif text-4xl sm:text-5xl md:text-6xl text-zinc-900 font-normal leading-tight">
        East Africa’s Premier Ethical Haute Joaillerie
      </h1>
      <p class="text-sm sm:text-base text-zinc-600 leading-relaxed font-light">
        Founded in Nairobi on the belief that fine jewelry must celebrate African artisanal mastery while preserving our land. We unite Kenyan goldsmithing heritage with cutting-edge ethical metallurgy and native gems.
      </p>
    </div>

    <!-- Atelier Imagery Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div class="aspect-[4/5] bg-zinc-100 rounded-sm overflow-hidden shadow-subtle">
        <img
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
          alt="Aurelia Gold Necklace Crafting in Nairobi"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="space-y-6">
        <span class="text-xs uppercase tracking-[0.3em] text-gold-600 font-semibold block">
          Pillar I: Responsible Kenyan Gold
        </span>
        <h2 class="font-serif text-3xl text-zinc-900 font-normal">
          100% Recycled 18K Solid Gold & Platinum 950
        </h2>
        <p class="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          Traditional gold mining causes immense ecological damage. Aurelia exclusively utilizes certified post-consumer recycled gold refined and assayed with official 750 (18K) hallmarks right here in Kenya.
        </p>
        <p class="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          This results in a 99.8% reduction in carbon emissions, zero toxic cyanide or mercury runoff into Kenyan river basins, and uncompromised heirloom durability.
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
      <div class="space-y-6 order-2 md:order-1">
        <span class="text-xs uppercase tracking-[0.3em] text-gold-600 font-semibold block">
          Pillar II: East African Gemstones
        </span>
        <h2 class="font-serif text-3xl text-zinc-900 font-normal">
          Tsavorite, Tanzanite & Certified Diamonds
        </h2>
        <p class="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          We honor the geological wonders of our region: vivid green Tsavorite garnets mined from the Taita Hills of Kenya, royal blue Tanzanite, and conflict-free ethical diamonds cut to mathematical perfection (D–F color, VVS1–VS1 clarity).
        </p>
        <p class="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          Every centerpiece gemstone is laser-inscribed and accompanied by an official certificate of authenticity verifying its origin and quality.
        </p>
      </div>
      <div class="aspect-[4/5] bg-zinc-100 rounded-sm overflow-hidden shadow-subtle order-1 md:order-2">
        <img
          src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80"
          alt="Aurelia Diamond Ring Handcrafted in Nairobi"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <!-- Ring Sizing Table & Guide -->
    <div class="bg-zinc-50 border border-zinc-200/80 rounded-sm p-8 space-y-6">
      <div class="text-center max-w-xl mx-auto">
        <span class="text-xs uppercase tracking-[0.3em] text-gold-600 font-semibold block mb-1">
          Complimentary Service in Kenya
        </span>
        <h3 class="font-serif text-2xl text-zinc-900 font-normal">
          Ring Sizing & Atelier Fitting
        </h3>
        <p class="text-xs text-zinc-500 mt-1">
          Visit our Westlands or Karen studios for complimentary bespoke ring measurement, or enjoy one free resizing within 60 days of purchase anywhere in Kenya.
        </p>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-xs text-left text-zinc-700 divide-y divide-zinc-200">
          <thead class="bg-zinc-100 uppercase tracking-wider text-[11px] font-semibold text-zinc-900">
            <tr>
              <th class="py-3 px-4">Standard Size</th>
              <th class="py-3 px-4">UK / Commonwealth</th>
              <th class="py-3 px-4">Circumference (mm)</th>
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
        Visit Our Nairobi Salons or Call Our Concierge
      </h3>
      <p class="text-xs text-zinc-500 max-w-md mx-auto mb-6">
        Private appointments available in Westlands and Karen. Call or WhatsApp our gemologist team for custom creations, bridal consultations, or M-PESA payment inquiries.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-semibold uppercase tracking-wider">
        <a
          href="tel:+254712345678"
          class="px-6 py-3 bg-zinc-900 text-white hover:bg-gold-500 transition-colors"
        >
          Call Atelier: +254 712 345 678
        </a>
        <NuxtLink
          to="/products"
          class="px-6 py-3 border border-zinc-300 text-zinc-800 hover:bg-zinc-50 transition-colors"
        >
          Explore Catalog
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || 'https://online-store-peach-three.vercel.app'

useSeoMeta({
  title: 'Our Nairobi Atelier & Sustainability Charter | AURELIA Fine Jewelry Kenya',
  ogTitle: 'Our Nairobi Atelier & Sustainability Charter | AURELIA Fine Jewelry Kenya',
  description: 'Handcrafted fine jewelry in Nairobi, Kenya. Recycled Kenyan 18k solid gold, Tsavorite from Taita Hills, and ethical conflict-free diamonds.',
  ogDescription: 'Handcrafted fine jewelry in Nairobi, Kenya. Recycled Kenyan 18k solid gold, Tsavorite from Taita Hills, and ethical conflict-free diamonds.',
  ogUrl: `${siteUrl}/about`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/about` }],
})
</script>
