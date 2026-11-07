import { products } from '../data/products'
import type { Order, CartItem, ShippingAddress } from '../../types/product'

interface CheckoutBody {
  items: CartItem[]
  shippingAddress: ShippingAddress
  shippingTier: 'standard' | 'express'
  discountCode?: string
  paymentMethod: string
}

export default defineEventHandler(async (event): Promise<{ success: boolean; order: Order }> => {
  const body = await readBody<CheckoutBody>(event)

  if (!body || !body.items || body.items.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Cart is empty. Cannot process checkout.',
    })
  }

  if (!body.shippingAddress || !body.shippingAddress.email || !body.shippingAddress.firstName) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Incomplete shipping details.',
    })
  }

  // Recalculate and validate prices against server-side data to prevent tampering
  let subtotal = 0
  const validatedItems: CartItem[] = []

  for (const item of body.items) {
    const serverProduct = products.find(p => p.id === item.productId || p.id === item.product.id)
    if (!serverProduct) {
      throw createError({
        statusCode: 404,
        statusMessage: `Product ${item.product.name} is no longer available.`,
      })
    }

    if (!serverProduct.inStock) {
      throw createError({
        statusCode: 400,
        statusMessage: `Item "${serverProduct.name}" is currently out of stock.`,
      })
    }

    const itemTotal = serverProduct.price * item.quantity
    subtotal += itemTotal

    validatedItems.push({
      ...item,
      product: serverProduct,
    })
  }

  // Discount voucher logic
  let discount = 0
  const code = (body.discountCode || '').trim().toUpperCase()
  if (code === 'AURELIA10' || code === 'WELCOME10') {
    discount = Math.round(subtotal * 0.10)
  } else if (code === 'VIP50' && subtotal >= 500) {
    discount = 50
  }

  // Shipping calculation
  let shippingCost = 0
  if (body.shippingTier === 'express') {
    shippingCost = code === 'FREESHIP' ? 0 : 35
  } else {
    // Standard insured: free above $200
    shippingCost = subtotal >= 200 || code === 'FREESHIP' ? 0 : 15
  }

  // Estimated tax (8% on taxable subtotal minus discount)
  const taxableAmount = Math.max(0, subtotal - discount)
  const tax = Math.round(taxableAmount * 0.08)

  const total = Math.max(0, subtotal - discount + shippingCost + tax)

  // Order reference generation
  const randomSuffix = Math.floor(1000 + Math.random() * 9000)
  const orderId = `AUR-2026-${randomSuffix}`

  // Delivery estimate calculation (3-5 business days for standard, 1-2 for express)
  const now = new Date()
  const deliveryDays = body.shippingTier === 'express' ? 2 : 5
  const deliveryDate = new Date(now.setDate(now.getDate() + deliveryDays))
  const estimatedDelivery = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  const order: Order = {
    orderId,
    items: validatedItems,
    subtotal,
    shipping: shippingCost,
    shippingTier: body.shippingTier === 'express' ? 'Priority Concierge Express' : 'Insured Standard Delivery',
    tax,
    discount,
    discountCode: code || undefined,
    total,
    shippingAddress: body.shippingAddress,
    paymentMethod: body.paymentMethod || 'Credit Card (Mocked)',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    estimatedDelivery,
  }

  return {
    success: true,
    order,
  }
})
