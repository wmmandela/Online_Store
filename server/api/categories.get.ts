import { categories, products } from '../data/products'

export default defineEventHandler(() => {
  // Compute up-to-date counts
  const categoriesWithCounts = categories.map(cat => ({
    ...cat,
    count: products.filter(p => p.category === cat.id).length,
  }))

  return categoriesWithCounts
})
