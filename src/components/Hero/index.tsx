import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react'
import heroCoffeeImg from '../../assets/hero-coffee.png'
import {
  BenefitIcon,
  BenefitItem,
  BenefitsGrid,
  HeroContainer,
  HeroSection,
  HeroSubtitle,
  HeroTextColumn,
  HeroTitle,
  HeroVisual,
} from './styles'

export function Hero() {
  return (
    <HeroSection aria-labelledby="hero-heading">
      <HeroContainer>
        <HeroTextColumn>
          <HeroTitle id="hero-heading">
            Encontre o café perfeito para qualquer hora do dia
          </HeroTitle>
          <HeroSubtitle>
            Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
            hora
          </HeroSubtitle>

          <BenefitsGrid>
            <BenefitItem>
              <BenefitIcon $tone="yellowDark" aria-hidden="true">
                <ShoppingCart size={16} weight="fill" />
              </BenefitIcon>
              <span>Compra simples e segura</span>
            </BenefitItem>

            <BenefitItem>
              <BenefitIcon $tone="espresso" aria-hidden="true">
                <Package size={16} weight="fill" />
              </BenefitIcon>
              <span>Embalagem mantém o café intacto</span>
            </BenefitItem>

            <BenefitItem>
              <BenefitIcon $tone="yellow" aria-hidden="true">
                <Timer size={16} weight="fill" />
              </BenefitIcon>
              <span>Entrega rápida e rastreada</span>
            </BenefitItem>

            <BenefitItem>
              <BenefitIcon $tone="purple" aria-hidden="true">
                <Coffee size={16} weight="fill" />
              </BenefitIcon>
              <span>O café chega fresquinho até você</span>
            </BenefitItem>
          </BenefitsGrid>
        </HeroTextColumn>

        <HeroVisual>
          <img
            src={heroCoffeeImg}
            alt="Copo térmico artesanal da Coffee Delivery rodeado por grãos de café torrados"
            width={476}
            height={360}
          />
        </HeroVisual>
      </HeroContainer>
    </HeroSection>
  )
}
