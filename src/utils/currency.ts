import type { CartItem } from '../types/cart'

/**
 * Taxa de entrega fixa fictícia centralizada em centavos (R$ 3,50),
 * conforme RN-03 e RN-04 do PRD_SPEC.md.
 */
export const DELIVERY_FEE_IN_CENTS = 350

const brlCurrencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const brlDecimalFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function calculateItemTotalInCents(
  priceInCents: number,
  quantity: number,
): number {
  if (!Number.isFinite(priceInCents) || !Number.isFinite(quantity)) {
    return 0
  }
  const safePrice = Math.max(0, Math.round(priceInCents))
  const safeQuantity = Math.max(0, Math.floor(quantity))
  return safePrice * safeQuantity
}

export function calculateSubtotalInCents(items: readonly CartItem[]): number {
  return items.reduce(
    (accumulator, item) =>
      accumulator +
      calculateItemTotalInCents(item.coffee.priceInCents, item.quantity),
    0,
  )
}

export function calculateDeliveryFeeInCents(
  items: readonly CartItem[],
): number {
  return items.length > 0 ? DELIVERY_FEE_IN_CENTS : 0
}

export function calculateTotalInCents(
  subtotalInCents: number,
  deliveryFeeInCents: number,
): number {
  return Math.max(0, subtotalInCents) + Math.max(0, deliveryFeeInCents)
}

export function formatCurrencyFromCents(cents: number): string {
  const safeCents = Number.isFinite(cents) ? Math.round(cents) : 0
  return brlCurrencyFormatter.format(safeCents / 100).replace(/\u00A0/g, ' ')
}

export function formatPriceValueFromCents(cents: number): string {
  const safeCents = Number.isFinite(cents) ? Math.round(cents) : 0
  return brlDecimalFormatter.format(safeCents / 100)
}
