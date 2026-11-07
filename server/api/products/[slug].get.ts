import { products } from '../../data/products'
import type { Product } from '../../../types/product'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Product slug is required',
    })
  }

  const product = products.find(p => p.slug === slug || p.id === slug)

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: `Product with slug "${slug}" was not found`,
    })
  }

  // Find related products in same category (excluding current)
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.material === product.material))
    .slice(0, 4)

  return {
    product,
    relatedProducts,
  }
})
