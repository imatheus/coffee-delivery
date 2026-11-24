import type { CartItem } from '../../types/cart'
import { CartActionTypes, type CartAction } from './actions'

export interface CartState {
  items: CartItem[]
}

export const initialCartState: CartState = {
  items: [],
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM: {
      const { coffee, quantity } = action.payload

      // RN-01: impedir quantidade <= 0 ou não inteira em operações de adição
      if (!Number.isInteger(quantity) || quantity <= 0) {
        return state
      }

      // RN-02: produto único no carrinho, acumulando quantidade de forma imutável
      const existingItem = state.items.find(
        (item) => item.coffee.id === coffee.id,
      )

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.coffee.id === coffee.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
        }
      }

      return {
        ...state,
        items: [...state.items, { coffee, quantity }],
      }
    }

    case CartActionTypes.INCREMENT_ITEM: {
      const { coffeeId } = action.payload
      const exists = state.items.some((item) => item.coffee.id === coffeeId)
      if (!exists) {
        return state
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.coffee.id === coffeeId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      }
    }

    case CartActionTypes.DECREMENT_ITEM: {
      const { coffeeId } = action.payload
      const existingItem = state.items.find(
        (item) => item.coffee.id === coffeeId,
      )

      // RN-01: manter mínimo de 1 unidade ao decrementar; exclusão ocorre pelo botão Remover
      if (!existingItem || existingItem.quantity <= 1) {
        return state
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.coffee.id === coffeeId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      }
    }

    case CartActionTypes.REMOVE_ITEM: {
      const { coffeeId } = action.payload
      const nextItems = state.items.filter(
        (item) => item.coffee.id !== coffeeId,
      )

      if (nextItems.length === state.items.length) {
        return state
      }

      return {
        ...state,
        items: nextItems,
      }
    }

    case CartActionTypes.CLEAR_CART: {
      if (state.items.length === 0) {
        return state
      }

      return {
        ...state,
        items: [],
      }
    }

    default:
      return state
  }
}
