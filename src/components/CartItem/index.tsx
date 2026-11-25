import { Trash } from '@phosphor-icons/react'
import { useCart } from '../../hooks/useCart'
import type { CartItem as CartItemType } from '../../types/cart'
import {
  calculateItemTotalInCents,
  formatCurrencyFromCents,
} from '../../utils/currency'
import { QuantityInput } from '../QuantityInput'
import {
  ItemActions,
  ItemDetails,
  ItemMain,
  ItemPrice,
  ItemRow,
  ItemTitle,
  RemoveButton,
} from './styles'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { incrementItem, decrementItem, removeItem } = useCart()
  const { coffee, quantity } = item

  const itemTotalInCents = calculateItemTotalInCents(
    coffee.priceInCents,
    quantity,
  )

  return (
    <ItemRow>
      <ItemMain>
        <img
          src={coffee.image}
          alt={coffee.imageAlt}
          width={60}
          height={60}
          decoding="async"
        />

        <ItemDetails>
          <ItemTitle>{coffee.name}</ItemTitle>
          <ItemActions>
            <QuantityInput
              quantity={quantity}
              onDecrease={() => decrementItem(coffee.id)}
              onIncrease={() => incrementItem(coffee.id)}
              itemName={coffee.name}
              size="sm"
              min={1}
            />

            <RemoveButton
              type="button"
              onClick={() => removeItem(coffee.id)}
              aria-label={`Remover ${coffee.name} do carrinho`}
            >
              <Trash size={16} aria-hidden="true" />
              <span>Remover</span>
            </RemoveButton>
          </ItemActions>
        </ItemDetails>
      </ItemMain>

      <ItemPrice>{formatCurrencyFromCents(itemTotalInCents)}</ItemPrice>
    </ItemRow>
  )
}
