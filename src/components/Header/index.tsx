import { MapPin } from '@phosphor-icons/react'
import { useCart } from '../../hooks/useCart'
import { BrandLogo } from '../BrandLogo'
import { CartBadge } from '../CartBadge'
import { ThemeToggle } from '../ThemeToggle'
import {
  ActionsGroup,
  HeaderContainer,
  HeaderWrapper,
  LocationBadge,
  LogoLink,
} from './styles'

export function Header() {
  const { lastOrder } = useCart()

  const locationLabel = lastOrder
    ? `${lastOrder.address.city}, ${lastOrder.address.state}`
    : 'São Paulo, SP'

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <LogoLink to="/" aria-label="Coffee Delivery — Página inicial">
          <BrandLogo />
        </LogoLink>

        <ActionsGroup aria-label="Ações do cabeçalho">
          <LocationBadge title={`Entrega para ${locationLabel}`}>
            <MapPin size={20} weight="fill" aria-hidden="true" />
            <span>{locationLabel}</span>
          </LocationBadge>

          <ThemeToggle />
          <CartBadge />
        </ActionsGroup>
      </HeaderContainer>
    </HeaderWrapper>
  )
}
