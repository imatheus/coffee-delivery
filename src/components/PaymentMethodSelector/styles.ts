import styled from 'styled-components'

export const PaymentCard = styled.section`
  background-color: ${({ theme }) => theme.colors.surfaceCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 1.25rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 2.5rem;
  }
`

export const PaymentHeader = styled.header`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 1.75rem;

  svg {
    color: ${({ theme }) => theme.colors.purple};
    flex-shrink: 0;
    margin-top: 0.125rem;
  }
`

export const PaymentTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.subtitle};
`

export const PaymentSubtitle = styled.p`
  margin-top: 0.125rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
`

export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

export const PaymentOptionLabel = styled.label<{ $selected: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.purpleLight : theme.colors.surfaceButton};
  border: 1px solid
    ${({ theme, $selected }) =>
      $selected ? theme.colors.purple : 'transparent'};
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.purpleText : theme.colors.text};
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    background-color: ${({ theme, $selected }) =>
      $selected ? theme.colors.purpleLight : theme.colors.surfaceHover};
  }

  &:has(input:focus-visible) {
    outline: 2px solid ${({ theme }) => theme.colors.purple};
    outline-offset: 2px;
  }

  input {
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }

  svg {
    color: ${({ theme }) => theme.colors.purple};
    flex-shrink: 0;
  }
`

export const PaymentError = styled.p`
  margin-top: 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.error};
`

export const FictionalNotice = styled.p`
  margin-top: 0.875rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.label};
`
