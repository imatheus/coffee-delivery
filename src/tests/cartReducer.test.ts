import { describe, expect, it } from 'vitest'
import { COFFEES } from '../data/coffees'
import {
  addItemAction,
  clearCartAction,
  decrementItemAction,
  incrementItemAction,
  removeItemAction,
} from '../reducers/cart/actions'
import { cartReducer, initialCartState } from '../reducers/cart/reducer'

describe('cartReducer (RF-02, RF-03, RF-05, RN-01 e RN-02)', () => {
  const expresso = COFFEES[0]
  const latte = COFFEES[5]

  it('adiciona um novo café ao carrinho mantendo imutabilidade', () => {
    const nextState = cartReducer(initialCartState, addItemAction(expresso, 2))

    expect(nextState).not.toBe(initialCartState)
    expect(nextState.items).toHaveLength(1)
    expect(nextState.items[0]).toEqual({ coffee: expresso, quantity: 2 })
    expect(initialCartState.items).toHaveLength(0)
  })

  it('acumula quantidade ao adicionar o mesmo café sem gerar linha duplicada', () => {
    const state1 = cartReducer(initialCartState, addItemAction(expresso, 1))
    const state2 = cartReducer(state1, addItemAction(expresso, 3))

    expect(state2.items).toHaveLength(1)
    expect(state2.items[0].quantity).toBe(4)
    expect(state1.items[0].quantity).toBe(1)
  })

  it('ignora quantidades iguais a zero, negativas ou decimais na adição', () => {
    expect(cartReducer(initialCartState, addItemAction(expresso, 0))).toBe(
      initialCartState,
    )
    expect(cartReducer(initialCartState, addItemAction(expresso, -2))).toBe(
      initialCartState,
    )
    expect(cartReducer(initialCartState, addItemAction(expresso, 1.5))).toBe(
      initialCartState,
    )
  })

  it('incrementa e decrementa um item respeitando mínimo de 1 unidade (RN-01)', () => {
    const state1 = cartReducer(initialCartState, addItemAction(expresso, 1))
    const state2 = cartReducer(state1, incrementItemAction(expresso.id))
    expect(state2.items[0].quantity).toBe(2)

    const state3 = cartReducer(state2, decrementItemAction(expresso.id))
    expect(state3.items[0].quantity).toBe(1)

    const state4 = cartReducer(state3, decrementItemAction(expresso.id))
    expect(state4).toBe(state3)
    expect(state4.items[0].quantity).toBe(1)
  })

  it('remove item individual e limpa o carrinho completamente', () => {
    const state1 = cartReducer(initialCartState, addItemAction(expresso, 2))
    const state2 = cartReducer(state1, addItemAction(latte, 1))

    const afterRemove = cartReducer(state2, removeItemAction(expresso.id))
    expect(afterRemove.items).toHaveLength(1)
    expect(afterRemove.items[0].coffee.id).toBe(latte.id)

    const afterClear = cartReducer(afterRemove, clearCartAction())
    expect(afterClear.items).toHaveLength(0)
  })
})
