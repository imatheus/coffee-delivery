import { useCart } from '../../hooks/useCart'
import { formatCurrencyFromCents } from '../../utils/currency'
import { CartItem } from '../CartItem'
import {
  CartList,
  ConfirmButton,
  SummaryCard,
  TotalRow,
  TotalsSection,
} from './styles'

interface CartSummaryProps {
  isSubmitting?: boolean
}

export function CartSummary({ isSubmitting = false }: CartSummaryProps) {
  const { items, subtotalInCents, deliveryFeeInCents, totalInCents } = useCart()

  return (
    <SummaryCard aria-label="Resumo do pedido">
      <CartList>
        {items.map((item) => (
          <CartItem key={item.coffee.id} item={item} />
        ))}
      </CartList>

      <TotalsSection>
        <TotalRow>
          <dt>Total de itens</dt>
          <dd data-testid="checkout-subtotal">
            {formatCurrencyFromCents(subtotalInCents)}
          </dd>
        </TotalRow>

        <TotalRow>
          <dt>Entrega</dt>
          <dd data-testid="checkout-delivery">
            {formatCurrencyFromCents(deliveryFeeInCents)}
          </dd>
        </TotalRow>

        <TotalRow $highlight>
          <dt>Total</dt>
          <dd data-testid="checkout-total">
            {formatCurrencyFromCents(totalInCents)}
          </dd>
        </TotalRow>
      </TotalsSection>

      <ConfirmButton type="submit" disabled={isSubmitting || items.length === 0}>
        {isSubmitting ? 'Confirmando...' : 'Confirmar Pedido'}
      </ConfirmButton>
    </SummaryCard>
  )
}
