import { products } from '../../data/products'
import type { Product, ProductListResponse } from '../../../types/product'

export default defineEventHandler((event): ProductListResponse => {
  const query = getQuery(event)

  const category = query.category ? String(query.category).toLowerCase().trim() : undefined
  const material = query.material ? String(query.material).trim() : undefined
  const gemstone = query.gemstone ? String(query.gemstone).trim() : undefined
  const search = query.search ? String(query.search).toLowerCase().trim() : undefined
  const sort = query.sort ? String(query.sort).toLowerCase().trim() : 'featured'
  const inStockOnly = query.inStockOnly === 'true' || query.inStockOnly === '1'
  const minPrice = query.minPrice ? Number(query.minPrice) : undefined
  const maxPrice = query.maxPrice ? Number(query.maxPrice) : undefined
  const page = Math.max(1, query.page ? Number(query.page) : 1)
  const limit = Math.max(1, query.limit ? Number(query.limit) : 12)

  let filtered: Product[] = [...products]

  // Category filter
  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category || p.slug.includes(category))
  }

  // Material filter
  if (material && material !== 'all') {
    filtered = filtered.filter(p => p.material.toLowerCase().includes(material.toLowerCase()))
  }

  // Gemstone filter
  if (gemstone && gemstone !== 'all') {
    filtered = filtered.filter(p => p.gemstone.toLowerCase().includes(gemstone.toLowerCase()))
  }

  // In Stock filter
  if (inStockOnly) {
    filtered = filtered.filter(p => p.inStock)
  }

  // Price Range filter
  if (minPrice !== undefined && !isNaN(minPrice)) {
    filtered = filtered.filter(p => p.price >= minPrice)
  }
  if (maxPrice !== undefined && !isNaN(maxPrice)) {
    filtered = filtered.filter(p => p.price <= maxPrice)
  }

  // Text search filter
  if (search) {
    const searchTerms = search.split(/\s+/).filter(Boolean)
    filtered = filtered.filter(p => {
      const target = `${p.name} ${p.shortDescription} ${p.description} ${p.material} ${p.gemstone} ${p.categoryLabel}`.toLowerCase()
      return searchTerms.every(term => target.includes(term))
    })
  }

  // Sorting
  switch (sort) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
      break
    case 'newest':
      filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
      break
    case 'featured':
    default:
      filtered.sort((a, b) => {
        if (a.isBestseller && !b.isBestseller) return -1
        if (!a.isBestseller && b.isBestseller) return 1
        return b.rating - a.rating
      })
      break
  }

  const total = filtered.length
  const totalPages = Math.ceil(total / limit)
  const offset = (page - 1) * limit
  const paginatedProducts = filtered.slice(offset, offset + limit)

  // Extract unique materials & gemstones for dynamic filter chips
  const availableMaterials = Array.from(new Set(products.map(p => p.material))).sort()
  const availableGemstones = Array.from(new Set(products.map(p => p.gemstone).filter(g => g !== 'None'))).sort()

  const allPrices = products.map(p => p.price)
  const minStorePrice = Math.min(...allPrices)
  const maxStorePrice = Math.max(...allPrices)

  return {
    products: paginatedProducts,
    total,
    page,
    limit,
    totalPages,
    availableMaterials,
    availableGemstones,
    priceRange: {
      min: minStorePrice,
      max: maxStorePrice,
    },
  }
})
