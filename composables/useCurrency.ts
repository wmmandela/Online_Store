export const useCurrency = () => {
  const formatPrice = (amount: number, showCents = false): string => {
    if (typeof amount !== 'number' || isNaN(amount)) return 'KSh 0'
    const formatted = new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: showCents ? 2 : 0,
      maximumFractionDigits: showCents ? 2 : 0,
    }).format(amount)

    // Standardize to clean "KSh 185,000" without irregular spacing
    return formatted
      .replace(/^Ksh\s*/i, 'KSh ')
      .replace(/\u00A0/g, ' ')
      .trim()
  }

  return {
    formatPrice,
  }
}
