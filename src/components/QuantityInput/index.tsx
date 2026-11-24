import { Minus, Plus } from '@phosphor-icons/react'
import { QuantityValue, StepperButton, StepperContainer } from './styles'

interface QuantityInputProps {
  quantity: number
  onDecrease: () => void
  onIncrease: () => void
  itemName: string
  min?: number
  size?: 'sm' | 'md'
}

export function QuantityInput({
  quantity,
  onDecrease,
  onIncrease,
  itemName,
  min = 1,
  size = 'md',
}: QuantityInputProps) {
  return (
    <StepperContainer $size={size}>
      <StepperButton
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        aria-label={`Diminuir quantidade de ${itemName}`}
      >
        <Minus size={14} weight="bold" aria-hidden="true" />
      </StepperButton>

      <QuantityValue aria-live="off">{quantity}</QuantityValue>

      <StepperButton
        type="button"
        onClick={onIncrease}
        aria-label={`Aumentar quantidade de ${itemName}`}
      >
        <Plus size={14} weight="bold" aria-hidden="true" />
      </StepperButton>
    </StepperContainer>
  )
}
