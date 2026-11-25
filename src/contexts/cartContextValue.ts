import { createContext } from 'react'
import type { CartItem } from '../types/cart'
import type { Coffee } from '../types/coffee'
import type { DeliveryAddress, Order, PaymentMethod } from '../types/order'

export const CART_STORAGE_KEY = '@coffee-delivery:cart-v1'
export const LAST_ORDER_STORAGE_KEY = '@coffee-delivery:last-order-v1'

export interface CartContextValue {
  items: readonly CartItem[]
  totalItems: number
  subtotalInCents: number
  deliveryFeeInCents: number
  totalInCents: number
  lastOrder: Order | null
  addItem: (coffee: Coffee, quantity: number) => void
  incrementItem: (coffeeId: string) => void
  decrementItem: (coffeeId: string) => void
  removeItem: (coffeeId: string) => void
  clearCart: () => void
  confirmOrder: (
    address: DeliveryAddress,
    paymentMethod: PaymentMethod,
  ) => Order | null
}

export const CartContext = createContext<CartContextValue | null>(null)
