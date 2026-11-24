import { ShoppingCart } from '@phosphor-icons/react'
import { useCart } from '../../hooks/useCart'
import { BadgeCount, CartLink } from './styles'

export function CartBadge() {
  const { totalItems } = useCart()

  const ariaLabel =
    totalItems === 0
      ? 'Ir para o carrinho de compras (vazio)'
      : totalItems === 1
        ? 'Ir para o carrinho de compras com 1 item'
        : `Ir para o carrinho de compras com ${totalItems} itens`

  return (
    <CartLink to="/checkout" aria-label={ariaLabel} title={ariaLabel}>
      <ShoppingCart size={22} weight="fill" aria-hidden="true" />
      {totalItems > 0 && (
        <BadgeCount data-testid="cart-badge-count">{totalItems}</BadgeCount>
      )}
    </CartLink>
  )
}
