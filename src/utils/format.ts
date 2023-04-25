export const formatProductPrice = (price: number) => {
  return new Intl.NumberFormat('de-DE').format(price).replaceAll(',', '.')
}

export const formatSocialMediaNumber = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(amount)
    .replace('.', ',')
    .toLowerCase()
}
