import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const SuccessContainer = styled.section`
  max-width: 72rem;
  margin: 0 auto;
  padding: 2.5rem 1rem 4rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 4rem 2rem 5rem;
  }
`

export const SuccessHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`

export const OrderBadge = styled.span`
  align-self: flex-start;
  margin-bottom: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background-color: ${({ theme }) => theme.colors.purpleLight};
  color: ${({ theme }) => theme.colors.purpleText};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
`

export const SuccessTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 800;
  font-size: clamp(1.625rem, 3.5vw, 2rem);
  color: ${({ theme }) => theme.colors.yellowDark};
`

export const SuccessSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: ${({ theme }) => theme.colors.subtitle};
`

export const ContentGrid = styled.div`
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: 4rem;
  }
`

export const DetailsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const GradientBorderCard = styled.div`
  padding: 1px;
  border-radius: ${({ theme }) => theme.radii.card};
  background: linear-gradient(
    102.89deg,
    ${({ theme }) => theme.colors.yellow} 2.61%,
    ${({ theme }) => theme.colors.purple} 98.76%
  );
`

export const CardInner = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 5px 35px 5px 35px;
  padding: 1.75rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 2.5rem;
    gap: 2rem;
  }
`

export const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`

type InfoTone = 'purple' | 'yellow' | 'yellowDark'

export const InfoIcon = styled.span<{ $tone: InfoTone }>`
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme, $tone }) => {
    switch ($tone) {
      case 'purple':
        return theme.colors.purple
      case 'yellow':
        return theme.mode === 'dark' ? '#B98A1A' : theme.colors.yellow
      case 'yellowDark':
        return theme.mode === 'dark' ? '#C47F17' : theme.colors.yellowDark
    }
  }};
`

export const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  font-size: 1rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.text};

  strong {
    color: ${({ theme }) => theme.colors.subtitle};
  }
`

export const OrderItemsBox = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const OrderItemsHeading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.label};
`

export const OrderItemsList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const OrderItemLine = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.text};

  strong {
    color: ${({ theme }) => theme.colors.subtitle};
    white-space: nowrap;
  }
`

export const OrderTotalLine = styled.div`
  padding-top: 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.title};
`

export const NewOrderLink = styled(Link)`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.purpleDark};
  }
`

export const IllustrationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    max-width: 30.75rem;
    height: auto;
    filter: drop-shadow(0 14px 24px ${({ theme }) => theme.colors.shadowColor});
  }
`
