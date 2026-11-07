export const useCurrency = () => {
  const formatPrice = (amount: number, showCents = false): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: showCents ? 2 : 0,
      maximumFractionDigits: showCents ? 2 : 0,
    }).format(amount)
  }

  return {
    formatPrice,
  }
}
