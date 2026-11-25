import { useContext } from 'react'
import {
  CartContext,
  type CartContextValue,
} from '../contexts/cartContextValue'

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart deve ser utilizado dentro de um CartProvider.')
  }
  return context
}
