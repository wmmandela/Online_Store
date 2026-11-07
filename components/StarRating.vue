<template>
  <div class="inline-flex items-center gap-1.5" :aria-label="`Rating: ${rating} out of 5 stars`">
    <div class="flex items-center text-amber-500">
      <template v-for="starIndex in 5" :key="starIndex">
        <!-- Full star -->
        <svg
          v-if="rating >= starIndex"
          class="w-3.5 h-3.5 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <!-- Half star -->
        <svg
          v-else-if="rating >= starIndex - 0.5"
          class="w-3.5 h-3.5 fill-current"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient :id="`half-star-${starIndex}-${uid}`">
              <stop offset="50%" stop-color="currentColor" />
              <stop offset="50%" stop-color="#D4D4D8" stop-opacity="1" />
            </linearGradient>
          </defs>
          <path
            :fill="`url(#half-star-${starIndex}-${uid})`"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
        <!-- Empty star -->
        <svg
          v-else
          class="w-3.5 h-3.5 text-zinc-300 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </template>
    </div>
    <span v-if="showCount && count" class="text-xs text-zinc-500 font-medium tracking-tight">
      ({{ count }})
    </span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    rating: number
    count?: number
    showCount?: boolean
  }>(),
  {
    rating: 5,
    count: 0,
    showCount: true,
  }
)

const uid = Math.random().toString(36).substring(2, 7)
</script>
