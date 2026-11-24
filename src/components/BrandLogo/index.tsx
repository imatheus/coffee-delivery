import logoMark from '../../assets/logo-mark.png'
import {
  BrandContainer,
  BrandPrimary,
  BrandSecondary,
  EmblemFrame,
  Wordmark,
} from './styles'

export function BrandLogo() {
  return (
    <BrandContainer>
      <EmblemFrame aria-hidden="true">
        <img
          src={logoMark}
          alt=""
          width={40}
          height={40}
          decoding="async"
        />
      </EmblemFrame>
      <Wordmark>
        <BrandPrimary>Coffee</BrandPrimary>
        <BrandSecondary>Delivery</BrandSecondary>
      </Wordmark>
    </BrandContainer>
  )
}
