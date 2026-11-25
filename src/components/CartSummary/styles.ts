import styled from 'styled-components'

export const SummaryCard = styled.aside`
  background-color: ${({ theme }) => theme.colors.surfaceCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px 44px 6px 44px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 2.5rem;
  }
`

export const CartList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
`

export const TotalsSection = styled.dl`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const TotalRow = styled.div<{ $highlight?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme, $highlight }) =>
    $highlight ? theme.colors.subtitle : theme.colors.text};
  font-size: ${({ $highlight }) => ($highlight ? '1.25rem' : '0.875rem')};
  font-weight: ${({ $highlight }) => ($highlight ? 700 : 400)};

  dd {
    font-size: ${({ $highlight }) => ($highlight ? '1.25rem' : '1rem')};
  }
`

export const ConfirmButton = styled.button`
  margin-top: 1.5rem;
  width: 100%;
  min-height: 2.875rem;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.yellow};
  color: ${({ theme }) =>
    theme.mode === 'dark' ? '#141113' : theme.colors.white};
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  transition:
    background-color 0.2s ease,
    transform 0.15s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.yellowDark};
  }

  &:active:not(:disabled) {
    transform: scale(0.99);
  }
`
