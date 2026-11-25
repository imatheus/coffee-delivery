import { describe, expect, it } from 'vitest'
import { COFFEES } from '../data/coffees'
import type { CartItem } from '../types/cart'
import {
  DELIVERY_FEE_IN_CENTS,
  calculateDeliveryFeeInCents,
  calculateItemTotalInCents,
  calculateSubtotalInCents,
  calculateTotalInCents,
  formatCurrencyFromCents,
  formatPriceValueFromCents,
} from '../utils/currency'

describe('Utilitários monetários e cálculos em centavos (RN-03 e RN-04)', () => {
  it('evita erros de precisão de ponto flutuante ao multiplicar preço por quantidade', () => {
    // 9.90 * 3 em ponto flutuante seria 29.700000000000003; em centavos é exato
    expect(calculateItemTotalInCents(990, 3)).toBe(2970)
    expect(formatCurrencyFromCents(2970)).toBe('R$ 29,70')
  })

  it('calcula subtotal somando preço unitário × quantidade de todos os itens', () => {
    const items: CartItem[] = [
      { coffee: COFFEES[0], quantity: 2 }, // 990 * 2 = 1980
      { coffee: COFFEES[5], quantity: 1 }, // 1190 * 1 = 1190
    ]

    expect(calculateSubtotalInCents(items)).toBe(3170)
  })

  it('aplica taxa de entrega fixa apenas quando há itens no carrinho', () => {
    expect(calculateDeliveryFeeInCents([])).toBe(0)
    expect(
      calculateDeliveryFeeInCents([{ coffee: COFFEES[0], quantity: 1 }]),
    ).toBe(DELIVERY_FEE_IN_CENTS)
  })

  it('calcula total geral somando subtotal e taxa de entrega', () => {
    expect(calculateTotalInCents(3170, DELIVERY_FEE_IN_CENTS)).toBe(3520)
    expect(formatCurrencyFromCents(3520)).toBe('R$ 35,20')
    expect(formatPriceValueFromCents(990)).toBe('9,90')
  })
})
