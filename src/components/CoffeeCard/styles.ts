import styled from 'styled-components'

export const Card = styled.article`
  background-color: ${({ theme }) => theme.colors.surfaceCard};
  border-radius: ${({ theme }) => theme.radii.card};
  padding: 0 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px ${({ theme }) => theme.colors.shadowColor};
  }
`

export const CoffeeImage = styled.img`
  width: 7.5rem;
  height: 7.5rem;
  margin-top: -1.5rem;
  object-fit: contain;
  filter: drop-shadow(0 8px 14px ${({ theme }) => theme.colors.shadowColor});
`

export const TagsList = styled.div`
  margin-top: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`

export const TagBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background-color: ${({ theme }) => theme.colors.yellowLight};
  color: ${({ theme }) => theme.colors.yellowText};
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
`

export const CoffeeName = styled.h3`
  margin-top: 1rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 700;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.subtitle};
`

export const CoffeeDescription = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.label};
  flex: 1;
`

export const CardFooter = styled.div`
  width: 100%;
  margin-top: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`

export const PriceDisplay = styled.div`
  display: inline-flex;
  align-items: baseline;
  gap: 0.2rem;
  color: ${({ theme }) => theme.colors.text};
`

export const CurrencyPrefix = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
`

export const PriceAmount = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 800;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.subtitle};
`

export const ControlsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const AddToCartButton = styled.button<{ $added: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.375rem;
  height: 2.375rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme, $added }) =>
    $added ? theme.colors.success : theme.colors.purpleDark};
  color: ${({ theme }) => theme.colors.white};
  transition:
    background-color 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background-color: ${({ theme, $added }) =>
      $added ? theme.colors.success : theme.colors.purple};
  }

  &:active {
    transform: scale(0.95);
  }
`
