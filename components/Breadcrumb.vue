<template>
  <nav aria-label="Breadcrumb" class="py-3 text-xs tracking-wider uppercase">
    <ol class="flex items-center flex-wrap gap-2 text-zinc-500">
      <li class="flex items-center gap-2">
        <NuxtLink to="/" class="hover:text-zinc-900 transition-colors">
          Home
        </NuxtLink>
        <span class="text-zinc-300">/</span>
      </li>
      <li v-for="(item, index) in items" :key="index" class="flex items-center gap-2">
        <NuxtLink
          v-if="item.to && index < items.length - 1"
          :to="item.to"
          class="hover:text-zinc-900 transition-colors"
        >
          {{ item.label }}
        </NuxtLink>
        <span
          v-else
          class="text-zinc-900 font-medium truncate max-w-[200px] sm:max-w-none"
          aria-current="page"
        >
          {{ item.label }}
        </span>
        <span v-if="index < items.length - 1" class="text-zinc-300">/</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  to?: string
}

const props = defineProps<{
  items: BreadcrumbItem[]
}>()

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || 'https://aurelia-jewelry.vercel.app'

// Inject JSON-LD Schema for BreadcrumbList
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          ...props.items.map((item, idx) => ({
            '@type': 'ListItem',
            position: idx + 2,
            name: item.label,
            item: item.to ? `${siteUrl}${item.to}` : undefined,
          })),
        ],
      }),
    },
  ],
})
</script>
