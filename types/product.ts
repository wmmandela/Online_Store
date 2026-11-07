export interface ProductReview {
  id: string
  author: string
  rating: number
  date: string
  title: string
  comment: string
  verified: boolean
}

export interface Product {
  id: string
  name: string
  slug: string
  category: 'rings' | 'necklaces' | 'earrings' | 'bracelets'
  categoryLabel: string
  price: number
  compareAtPrice?: number
  images: string[]
  description: string
  shortDescription: string
  material: string
  gemstone: string
  carat?: number
  inStock: boolean
  inventory: number
  isNew?: boolean
  isBestseller?: boolean
  rating: number
  reviewCount: number
  sizes?: string[]
  customizable?: boolean
  specifications: Record<string, string>
  careGuide: string
  reviews?: ProductReview[]
}

export interface CartItem {
  id: string // composite key: productId-size-engraving
  productId: string
  product: Product
  quantity: number
  selectedSize?: string
  engravingText?: string
}

export interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  apartment?: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface Order {
  orderId: string
  items: CartItem[]
  subtotal: number
  shipping: number
  shippingTier: string
  tax: number
  discount: number
  discountCode?: string
  total: number
  shippingAddress: ShippingAddress
  paymentMethod: string
  status: 'confirmed' | 'processing' | 'shipped'
  createdAt: string
  estimatedDelivery: string
}

export interface ProductFilterQuery {
  category?: string
  material?: string
  gemstone?: string
  minPrice?: number
  maxPrice?: number
  inStockOnly?: boolean
  search?: string
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'
  page?: number
  limit?: number
}

export interface ProductListResponse {
  products: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
  availableMaterials: string[]
  availableGemstones: string[]
  priceRange: {
    min: number
    max: number
  }
}

export interface CategorySummary {
  id: string
  slug: string
  name: string
  tagline: string
  image: string
  count: number
}
