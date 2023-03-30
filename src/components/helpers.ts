export function formatNumber(num: number) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + 'B'
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K'
  } else {
    return num.toFixed(2)
  }
}

export const correctCryptoParam = (name: string) => {
  return (name.includes(' ') ? name.replace(/ /g, '-') : name).toLowerCase()
}

export function extractCurrencyName(currency: string): string {
  return currency.split('(')[0].slice(0, -1);
}