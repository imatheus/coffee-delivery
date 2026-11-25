import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import { COFFEES } from '../data/coffees'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {
  addItemAction,
  clearCartAction,
  decrementItemAction,
  incrementItemAction,
  removeItemAction,
} from '../reducers/cart/actions'
import {
  cartReducer,
  initialCartState,
  type CartState,
} from '../reducers/cart/reducer'
import type { CartItem } from '../types/cart'
import type { Coffee } from '../types/coffee'
import type { DeliveryAddress, Order, PaymentMethod } from '../types/order'
import {
  calculateDeliveryFeeInCents,
  calculateSubtotalInCents,
  calculateTotalInCents,
} from '../utils/currency'
import {
  CART_STORAGE_KEY,
  CartContext,
  LAST_ORDER_STORAGE_KEY,
  type CartContextValue,
} from './cartContextValue'

interface StoredCartEntry {
  coffeeId: string
  quantity: number
}

function loadInitialCartState(): CartState {
  if (typeof window === 'undefined') {
    return initialCartState
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) {
      return initialCartState
    }

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return initialCartState
    }

    const catalogById = new Map(COFFEES.map((coffee) => [coffee.id, coffee]))
    const hydratedItems: CartItem[] = []

    for (const entry of parsed) {
      if (!entry || typeof entry !== 'object') continue

      const candidate = entry as Partial<StoredCartEntry> & {
        coffee?: { id?: string }
      }
      const id =
        typeof candidate.coffeeId === 'string'
          ? candidate.coffeeId
          : typeof candidate.coffee?.id === 'string'
            ? candidate.coffee.id
            : null

      const quantity = candidate.quantity

      if (
        id &&
        typeof quantity === 'number' &&
        Number.isInteger(quantity) &&
        quantity > 0
      ) {
        const coffee = catalogById.get(id)
        if (coffee) {
          hydratedItems.push({ coffee, quantity })
        }
      }
    }

    return { items: hydratedItems }
  } catch {
    return initialCartState
  }
}

function deserializeOrder(raw: unknown): Order | null {
  if (!raw || typeof raw !== 'object') {
    return null
  }

  const candidate = raw as Partial<Order>
  if (
    typeof candidate.id !== 'string' ||
    typeof candidate.createdAt !== 'string' ||
    !candidate.address ||
    typeof candidate.address.street !== 'string' ||
    typeof candidate.address.number !== 'string' ||
    typeof candidate.address.neighborhood !== 'string' ||
    typeof candidate.address.city !== 'string' ||
    typeof candidate.address.state !== 'string' ||
    (candidate.paymentMethod !== 'credit' &&
      candidate.paymentMethod !== 'debit' &&
      candidate.paymentMethod !== 'cash') ||
    !Array.isArray(candidate.items)
  ) {
    return null
  }

  return candidate as Order
}

function generateOrderId(): string {
  const randomChunk = Math.random().toString(36).slice(2, 6).toUpperCase()
  const timestampChunk = Date.now().toString().slice(-4)
  return `CD-${timestampChunk}-${randomChunk}`
}

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialCartState,
    loadInitialCartState,
  )

  const [lastOrder, setLastOrder] = useLocalStorage<Order | null>(
    LAST_ORDER_STORAGE_KEY,
    null,
    deserializeOrder,
  )

  useEffect(() => {
    try {
      const serializable: StoredCartEntry[] = state.items.map((item) => ({
        coffeeId: item.coffee.id,
        quantity: item.quantity,
      }))
      window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(serializable),
      )
    } catch {
      // Ignora erro caso localStorage esteja indisponível
    }
  }, [state.items])

  const totalItems = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items],
  )

  const subtotalInCents = useMemo(
    () => calculateSubtotalInCents(state.items),
    [state.items],
  )

  const deliveryFeeInCents = useMemo(
    () => calculateDeliveryFeeInCents(state.items),
    [state.items],
  )

  const totalInCents = useMemo(
    () => calculateTotalInCents(subtotalInCents, deliveryFeeInCents),
    [subtotalInCents, deliveryFeeInCents],
  )

  const addItem = useCallback((coffee: Coffee, quantity: number) => {
    dispatch(addItemAction(coffee, quantity))
  }, [])

  const incrementItem = useCallback((coffeeId: string) => {
    dispatch(incrementItemAction(coffeeId))
  }, [])

  const decrementItem = useCallback((coffeeId: string) => {
    dispatch(decrementItemAction(coffeeId))
  }, [])

  const removeItem = useCallback((coffeeId: string) => {
    dispatch(removeItemAction(coffeeId))
  }, [])

  const clearCart = useCallback(() => {
    dispatch(clearCartAction())
  }, [])

  const confirmOrder = useCallback(
    (address: DeliveryAddress, paymentMethod: PaymentMethod): Order | null => {
      if (state.items.length === 0) {
        return null
      }

      const itemsSnapshot: CartItem[] = state.items.map((item) => ({
        coffee: { ...item.coffee, tags: [...item.coffee.tags] },
        quantity: item.quantity,
      }))

      const snapshotSubtotal = calculateSubtotalInCents(itemsSnapshot)
      const snapshotDeliveryFee = calculateDeliveryFeeInCents(itemsSnapshot)
      const snapshotTotal = calculateTotalInCents(
        snapshotSubtotal,
        snapshotDeliveryFee,
      )

      const order: Order = {
        id: generateOrderId(),
        createdAt: new Date().toISOString(),
        items: itemsSnapshot,
        address: {
          cep: address.cep.trim(),
          street: address.street.trim(),
          number: address.number.trim(),
          complement: address.complement?.trim() || undefined,
          neighborhood: address.neighborhood.trim(),
          city: address.city.trim(),
          state: address.state.trim().toUpperCase(),
        },
        paymentMethod,
        subtotalInCents: snapshotSubtotal,
        deliveryFeeInCents: snapshotDeliveryFee,
        totalInCents: snapshotTotal,
      }

      // RN-06 e RF-13: salvar snapshot independente antes de esvaziar o carrinho
      setLastOrder(order)
      dispatch(clearCartAction())

      return order
    },
    [state.items, setLastOrder],
  )

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      totalItems,
      subtotalInCents,
      deliveryFeeInCents,
      totalInCents,
      lastOrder,
      addItem,
      incrementItem,
      decrementItem,
      removeItem,
      clearCart,
      confirmOrder,
    }),
    [
      state.items,
      totalItems,
      subtotalInCents,
      deliveryFeeInCents,
      totalInCents,
      lastOrder,
      addItem,
      incrementItem,
      decrementItem,
      removeItem,
      clearCart,
      confirmOrder,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
