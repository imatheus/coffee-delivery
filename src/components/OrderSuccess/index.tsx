import {
  ArrowLeft,
  CurrencyDollar,
  MapPin,
  Timer,
} from '@phosphor-icons/react'
import deliveryScooterImg from '../../assets/delivery-scooter.png'
import { PAYMENT_METHOD_LABELS, type Order } from '../../types/order'
import {
  calculateItemTotalInCents,
  formatCurrencyFromCents,
} from '../../utils/currency'
import {
  CardInner,
  ContentGrid,
  DetailsColumn,
  GradientBorderCard,
  IllustrationWrapper,
  InfoIcon,
  InfoRow,
  InfoText,
  NewOrderLink,
  OrderBadge,
  OrderItemLine,
  OrderItemsBox,
  OrderItemsHeading,
  OrderItemsList,
  OrderTotalLine,
  SuccessContainer,
  SuccessHeader,
  SuccessSubtitle,
  SuccessTitle,
} from './styles'

interface OrderSuccessProps {
  order: Order
}

export function OrderSuccess({ order }: OrderSuccessProps) {
  const { address, paymentMethod, items, totalInCents, deliveryFeeInCents } =
    order

  const complementSuffix = address.complement ? `, ${address.complement}` : ''

  return (
    <SuccessContainer aria-labelledby="order-success-heading">
      <SuccessHeader>
        <OrderBadge>Pedido #{order.id}</OrderBadge>
        <SuccessTitle id="order-success-heading">
          Uhu! Pedido confirmado
        </SuccessTitle>
        <SuccessSubtitle>
          Agora é só aguardar que logo o café chegará até você
        </SuccessSubtitle>
      </SuccessHeader>

      <ContentGrid>
        <DetailsColumn>
          <GradientBorderCard>
            <CardInner>
              <InfoRow>
                <InfoIcon $tone="purple" aria-hidden="true">
                  <MapPin size={16} weight="fill" />
                </InfoIcon>
                <InfoText>
                  <span>
                    Entrega em{' '}
                    <strong>
                      {address.street}, {address.number}
                      {complementSuffix}
                    </strong>
                  </span>
                  <span>
                    {address.neighborhood} - {address.city}, {address.state} ·
                    CEP {address.cep}
                  </span>
                </InfoText>
              </InfoRow>

              <InfoRow>
                <InfoIcon $tone="yellow" aria-hidden="true">
                  <Timer size={16} weight="fill" />
                </InfoIcon>
                <InfoText>
                  <span>Previsão de entrega</span>
                  <strong>20 min - 30 min</strong>
                </InfoText>
              </InfoRow>

              <InfoRow>
                <InfoIcon $tone="yellowDark" aria-hidden="true">
                  <CurrencyDollar size={16} weight="bold" />
                </InfoIcon>
                <InfoText>
                  <span>Pagamento na entrega</span>
                  <strong>{PAYMENT_METHOD_LABELS[paymentMethod]}</strong>
                </InfoText>
              </InfoRow>
            </CardInner>
          </GradientBorderCard>

          <OrderItemsBox aria-label="Resumo dos itens confirmados">
            <OrderItemsHeading>Resumo do pedido concluído</OrderItemsHeading>
            <OrderItemsList>
              {items.map((item) => (
                <OrderItemLine key={item.coffee.id}>
                  <span>
                    {item.quantity}x {item.coffee.name}
                  </span>
                  <strong>
                    {formatCurrencyFromCents(
                      calculateItemTotalInCents(
                        item.coffee.priceInCents,
                        item.quantity,
                      ),
                    )}
                  </strong>
                </OrderItemLine>
              ))}
              <OrderItemLine>
                <span>Taxa de entrega</span>
                <strong>{formatCurrencyFromCents(deliveryFeeInCents)}</strong>
              </OrderItemLine>
            </OrderItemsList>

            <OrderTotalLine>
              <span>Total pago na entrega</span>
              <span>{formatCurrencyFromCents(totalInCents)}</span>
            </OrderTotalLine>
          </OrderItemsBox>

          <NewOrderLink to="/">
            <ArrowLeft size={16} weight="bold" aria-hidden="true" />
            <span>Fazer novo pedido</span>
          </NewOrderLink>
        </DetailsColumn>

        <IllustrationWrapper>
          <img
            src={deliveryScooterImg}
            alt="Entregador em moto roxa e amarela levando seu pedido do Coffee Delivery"
            width={492}
            height={354}
          />
        </IllustrationWrapper>
      </ContentGrid>
    </SuccessContainer>
  )
}
