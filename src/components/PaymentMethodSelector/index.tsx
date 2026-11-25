import { Bank, CreditCard, CurrencyDollar, Money } from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import type { CheckoutFormData } from '../../schemas/checkoutSchema'
import { PAYMENT_METHOD_LABELS, type PaymentMethod } from '../../types/order'
import {
  FictionalNotice,
  OptionsGrid,
  PaymentCard,
  PaymentError,
  PaymentHeader,
  PaymentOptionLabel,
  PaymentSubtitle,
  PaymentTitle,
} from './styles'

const PAYMENT_OPTIONS: readonly {
  value: PaymentMethod
  label: string
  icon: ReactNode
}[] = [
  {
    value: 'credit',
    label: PAYMENT_METHOD_LABELS.credit,
    icon: <CreditCard size={18} aria-hidden="true" />,
  },
  {
    value: 'debit',
    label: PAYMENT_METHOD_LABELS.debit,
    icon: <Bank size={18} aria-hidden="true" />,
  },
  {
    value: 'cash',
    label: PAYMENT_METHOD_LABELS.cash,
    icon: <Money size={18} aria-hidden="true" />,
  },
]

export function PaymentMethodSelector() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<CheckoutFormData>()

  const selectedMethod = watch('paymentMethod')

  return (
    <PaymentCard aria-labelledby="payment-method-heading">
      <PaymentHeader>
        <CurrencyDollar size={22} aria-hidden="true" />
        <div>
          <PaymentTitle id="payment-method-heading">Pagamento</PaymentTitle>
          <PaymentSubtitle>
            O pagamento é feito na entrega. Escolha a forma que deseja pagar
          </PaymentSubtitle>
        </div>
      </PaymentHeader>

      <OptionsGrid
        role="radiogroup"
        aria-labelledby="payment-method-heading"
        aria-describedby={
          errors.paymentMethod ? 'payment-method-error' : undefined
        }
      >
        {PAYMENT_OPTIONS.map((option) => (
          <PaymentOptionLabel
            key={option.value}
            $selected={selectedMethod === option.value}
          >
            <input
              type="radio"
              value={option.value}
              {...register('paymentMethod')}
            />
            {option.icon}
            <span>{option.label}</span>
          </PaymentOptionLabel>
        ))}
      </OptionsGrid>

      {errors.paymentMethod && (
        <PaymentError id="payment-method-error" role="alert">
          {errors.paymentMethod.message}
        </PaymentError>
      )}

      <FictionalNotice>
        Simulação de pedido — nenhuma transação financeira real será realizada.
      </FictionalNotice>
    </PaymentCard>
  )
}
