import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { CartSummary } from '../../components/CartSummary'
import { DeliveryAddressForm } from '../../components/DeliveryAddressForm'
import { EmptyCart } from '../../components/EmptyCart'
import { PaymentMethodSelector } from '../../components/PaymentMethodSelector'
import { useCart } from '../../hooks/useCart'
import {
  checkoutSchema,
  type CheckoutFormData,
} from '../../schemas/checkoutSchema'
import {
  CheckoutContainer,
  CheckoutForm,
  Column,
  ColumnHeading,
} from './styles'

export function Checkout() {
  const { items, confirmOrder } = useCart()
  const navigate = useNavigate()

  const methods = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onBlur',
    defaultValues: {
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
  })

  if (items.length === 0) {
    return (
      <CheckoutContainer>
        <EmptyCart />
      </CheckoutContainer>
    )
  }

  function handleConfirmOrder(data: CheckoutFormData) {
    const order = confirmOrder(
      {
        cep: data.cep,
        street: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
      },
      data.paymentMethod,
    )

    if (order) {
      navigate('/success')
    }
  }

  return (
    <CheckoutContainer>
      <FormProvider {...methods}>
        <CheckoutForm
          onSubmit={methods.handleSubmit(handleConfirmOrder)}
          noValidate
          aria-label="Formulário de finalização de pedido"
        >
          <Column>
            <ColumnHeading>Complete seu pedido</ColumnHeading>
            <DeliveryAddressForm />
            <PaymentMethodSelector />
          </Column>

          <Column>
            <ColumnHeading>Cafés selecionados</ColumnHeading>
            <CartSummary isSubmitting={methods.formState.isSubmitting} />
          </Column>
        </CheckoutForm>
      </FormProvider>
    </CheckoutContainer>
  )
}
