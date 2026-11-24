import { Check, ShoppingCartSimple } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { useCart } from '../../hooks/useCart'
import type { Coffee } from '../../types/coffee'
import { formatPriceValueFromCents } from '../../utils/currency'
import { QuantityInput } from '../QuantityInput'
import {
  AddToCartButton,
  Card,
  CardFooter,
  CoffeeDescription,
  CoffeeImage,
  CoffeeName,
  ControlsGroup,
  CurrencyPrefix,
  PriceAmount,
  PriceDisplay,
  TagBadge,
  TagsList,
} from './styles'

interface CoffeeCardProps {
  coffee: Coffee
  onItemAdded?: (coffeeName: string, quantity: number) => void
}

export function CoffeeCard({ coffee, onItemAdded }: CoffeeCardProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    if (!justAdded) return
    const timer = window.setTimeout(() => setJustAdded(false), 1200)
    return () => window.clearTimeout(timer)
  }, [justAdded])

  function handleDecrease() {
    setQuantity((current) => Math.max(1, current - 1))
  }

  function handleIncrease() {
    setQuantity((current) => current + 1)
  }

  function handleAddToCart() {
    addItem(coffee, quantity)
    onItemAdded?.(coffee.name, quantity)
    setQuantity(1)
    setJustAdded(true)
  }

  return (
    <Card>
      <CoffeeImage
        src={coffee.image}
        alt={coffee.imageAlt}
        width={120}
        height={120}
        loading="lazy"
        decoding="async"
      />

      <TagsList aria-label={`Categorias de ${coffee.name}`}>
        {coffee.tags.map((tag) => (
          <TagBadge key={tag}>{tag}</TagBadge>
        ))}
      </TagsList>

      <CoffeeName>{coffee.name}</CoffeeName>
      <CoffeeDescription>{coffee.description}</CoffeeDescription>

      <CardFooter>
        <PriceDisplay
          aria-label={`Preço: R$ ${formatPriceValueFromCents(coffee.priceInCents)}`}
        >
          <CurrencyPrefix>R$</CurrencyPrefix>
          <PriceAmount>
            {formatPriceValueFromCents(coffee.priceInCents)}
          </PriceAmount>
        </PriceDisplay>

        <ControlsGroup>
          <QuantityInput
            quantity={quantity}
            onDecrease={handleDecrease}
            onIncrease={handleIncrease}
            itemName={coffee.name}
          />

          <AddToCartButton
            type="button"
            onClick={handleAddToCart}
            $added={justAdded}
            aria-label={`Adicionar ${coffee.name} ao carrinho`}
            title={`Adicionar ${coffee.name} ao carrinho`}
          >
            {justAdded ? (
              <Check size={20} weight="bold" aria-hidden="true" />
            ) : (
              <ShoppingCartSimple size={20} weight="fill" aria-hidden="true" />
            )}
          </AddToCartButton>
        </ControlsGroup>
      </CardFooter>
    </Card>
  )
}
