import type { Product } from '../types/product'

const activeProduct = ref<Product | null>(null)
const isOpen = ref(false)

export const useQuickView = () => {
  const openQuickView = (product: Product) => {
    activeProduct.value = product
    isOpen.value = true
  }

  const closeQuickView = () => {
    isOpen.value = false
    setTimeout(() => {
      activeProduct.value = null
    }, 200)
  }

  return {
    isOpen: readonly(isOpen),
    product: readonly(activeProduct),
    openQuickView,
    closeQuickView,
  }
}
