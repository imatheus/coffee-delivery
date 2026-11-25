import styled from 'styled-components'

export const CheckoutContainer = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 2rem 1rem 4rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 2.5rem 2rem 4.5rem;
  }
`

export const CheckoutForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: minmax(0, 1.42fr) minmax(0, 1fr);
    gap: 2rem;
  }
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`

export const ColumnHeading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.subtitle};
`
