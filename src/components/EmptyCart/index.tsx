import { ArrowLeft, ShoppingCart } from '@phosphor-icons/react'
import {
  BackHomeLink,
  EmptyDescription,
  EmptyTitle,
  EmptyWrapper,
  IconBadge,
} from './styles'

interface EmptyCartProps {
  title?: string
  description?: string
  ctaLabel?: string
}

export function EmptyCart({
  title = 'Seu carrinho está vazio',
  description = 'Adicione alguns cafés especiais do nosso catálogo para preencher seu endereço e finalizar o pedido.',
  ctaLabel = 'Explorar cafés',
}: EmptyCartProps) {
  return (
    <EmptyWrapper aria-labelledby="empty-state-heading">
      <IconBadge aria-hidden="true">
        <ShoppingCart size={32} weight="fill" />
      </IconBadge>
      <EmptyTitle id="empty-state-heading">{title}</EmptyTitle>
      <EmptyDescription>{description}</EmptyDescription>
      <BackHomeLink to="/">
        <ArrowLeft size={18} weight="bold" aria-hidden="true" />
        <span>{ctaLabel}</span>
      </BackHomeLink>
    </EmptyWrapper>
  )
}
