import { EmptyCart } from '../../components/EmptyCart'
import { OrderSuccess } from '../../components/OrderSuccess'
import { useCart } from '../../hooks/useCart'

export function Success() {
  const { lastOrder } = useCart()

  if (!lastOrder) {
    return (
      <div style={{ padding: '1rem' }}>
        <EmptyCart
          title="Nenhum pedido confirmado"
          description="Ainda não encontramos um pedido concluído nesta sessão. Escolha seus cafés no catálogo para finalizar uma nova entrega."
          ctaLabel="Voltar para a Home"
        />
      </div>
    )
  }

  return <OrderSuccess order={lastOrder} />
}
