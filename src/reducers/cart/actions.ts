import type { Coffee } from '../../types/coffee'

export const CartActionTypes = {
  ADD_ITEM: 'ADD_ITEM',
  INCREMENT_ITEM: 'INCREMENT_ITEM',
  DECREMENT_ITEM: 'DECREMENT_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_CART: 'CLEAR_CART',
} as const

export type CartAction =
  | {
      type: typeof CartActionTypes.ADD_ITEM
      payload: { coffee: Coffee; quantity: number }
    }
  | {
      type: typeof CartActionTypes.INCREMENT_ITEM
      payload: { coffeeId: string }
    }
  | {
      type: typeof CartActionTypes.DECREMENT_ITEM
      payload: { coffeeId: string }
    }
  | {
      type: typeof CartActionTypes.REMOVE_ITEM
      payload: { coffeeId: string }
    }
  | {
      type: typeof CartActionTypes.CLEAR_CART
    }

export function addItemAction(coffee: Coffee, quantity: number): CartAction {
  return {
    type: CartActionTypes.ADD_ITEM,
    payload: { coffee, quantity },
  }
}

export function incrementItemAction(coffeeId: string): CartAction {
  return {
    type: CartActionTypes.INCREMENT_ITEM,
    payload: { coffeeId },
  }
}

export function decrementItemAction(coffeeId: string): CartAction {
  return {
    type: CartActionTypes.DECREMENT_ITEM,
    payload: { coffeeId },
  }
}

export function removeItemAction(coffeeId: string): CartAction {
  return {
    type: CartActionTypes.REMOVE_ITEM,
    payload: { coffeeId },
  }
}

export function clearCartAction(): CartAction {
  return {
    type: CartActionTypes.CLEAR_CART,
  }
}
