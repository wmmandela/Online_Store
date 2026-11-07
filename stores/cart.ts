import { defineStore } from 'pinia'
import type { CartItem, Product } from '../types/product'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    isOpen: false,
    promoCode: '',
    discountRate: 0,
    fixedDiscount: 0,
    isHydrated: false,
  }),

  getters: {
    itemCount: (state): number => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0)
    },

    subtotal: (state): number => {
      return state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    },

    discount: (state): number => {
      const sub = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      if (state.discountRate > 0) {
        return Math.round(sub * state.discountRate)
      }
      return Math.min(sub, state.fixedDiscount)
    },

    freeShippingThreshold: (): number => 200,

    amountUntilFreeShipping(): number {
      return Math.max(0, this.freeShippingThreshold - this.subtotal)
    },

    freeShippingProgress(): number {
      if (this.subtotal <= 0) return 0
      return Math.min(100, Math.round((this.subtotal / this.freeShippingThreshold) * 100))
    },

    hasFreeShipping(): boolean {
      return this.subtotal >= this.freeShippingThreshold || this.promoCode === 'FREESHIP'
    },

    estimatedShipping(): number {
      if (this.subtotal === 0) return 0
      return this.hasFreeShipping ? 0 : 15
    },

    estimatedTax(): number {
      const taxable = Math.max(0, this.subtotal - this.discount)
      return Math.round(taxable * 0.08)
    },

    total(): number {
      if (this.subtotal === 0) return 0
      return Math.max(0, this.subtotal - this.discount + this.estimatedShipping + this.estimatedTax)
    },
  },

  actions: {
    init() {
      if (import.meta.client && !this.isHydrated) {
        try {
          const stored = localStorage.getItem('aurelia_cart')
          if (stored) {
            const parsed = JSON.parse(stored)
            this.items = parsed.items || []
            this.promoCode = parsed.promoCode || ''
            this.discountRate = parsed.discountRate || 0
            this.fixedDiscount = parsed.fixedDiscount || 0
          }
        } catch (e) {
          console.error('Failed to restore cart from localStorage', e)
        }
        this.isHydrated = true
      }
    },

    persist() {
      if (import.meta.client) {
        try {
          localStorage.setItem(
            'aurelia_cart',
            JSON.stringify({
              items: this.items,
              promoCode: this.promoCode,
              discountRate: this.discountRate,
              fixedDiscount: this.fixedDiscount,
            })
          )
        } catch (e) {
          console.error('Failed to persist cart to localStorage', e)
        }
      }
    },

    addToCart(product: Product, quantity = 1, selectedSize?: string, engravingText?: string) {
      this.init()

      // Generate composite id for items with different sizes or engravings
      const cleanSize = selectedSize ? selectedSize.trim() : ''
      const cleanEngraving = engravingText ? engravingText.trim() : ''
      const compositeId = `${product.id}__${cleanSize}__${cleanEngraving}`

      const existingIndex = this.items.findIndex(item => item.id === compositeId)

      if (existingIndex > -1) {
        this.items[existingIndex].quantity += quantity
      } else {
        this.items.push({
          id: compositeId,
          productId: product.id,
          product,
          quantity,
          selectedSize: cleanSize || undefined,
          engravingText: cleanEngraving || undefined,
        })
      }

      this.persist()
      this.openDrawer()
    },

    updateQuantity(itemId: string, quantity: number) {
      const item = this.items.find(i => i.id === itemId)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(itemId)
        } else {
          item.quantity = Math.min(item.product.inventory || 20, quantity)
          this.persist()
        }
      }
    },

    removeItem(itemId: string) {
      this.items = this.items.filter(i => i.id !== itemId)
      this.persist()
    },

    clearCart() {
      this.items = []
      this.promoCode = ''
      this.discountRate = 0
      this.fixedDiscount = 0
      this.persist()
    },

    openDrawer() {
      this.isOpen = true
    },

    closeDrawer() {
      this.isOpen = false
    },

    toggleDrawer() {
      this.isOpen = !this.isOpen
    },

    applyPromoCode(code: string): { success: boolean; message: string } {
      const normalized = code.trim().toUpperCase()

      if (normalized === 'AURELIA10' || normalized === 'WELCOME10') {
        this.promoCode = normalized
        this.discountRate = 0.10
        this.fixedDiscount = 0
        this.persist()
        return { success: true, message: '10% promotional discount applied!' }
      }

      if (normalized === 'FREESHIP') {
        this.promoCode = normalized
        this.discountRate = 0
        this.fixedDiscount = 0
        this.persist()
        return { success: true, message: 'Free shipping voucher applied!' }
      }

      if (normalized === 'VIP50') {
        if (this.subtotal < 500) {
          return { success: false, message: 'VIP50 requires a minimum order of $500.' }
        }
        this.promoCode = normalized
        this.discountRate = 0
        this.fixedDiscount = 50
        this.persist()
        return { success: true, message: '$50 VIP voucher applied!' }
      }

      return { success: false, message: 'Invalid or expired promotional code.' }
    },

    removePromoCode() {
      this.promoCode = ''
      this.discountRate = 0
      this.fixedDiscount = 0
      this.persist()
    },
  },
})
