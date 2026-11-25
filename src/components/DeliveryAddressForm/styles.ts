import styled from 'styled-components'

export const SectionCard = styled.section`
  background-color: ${({ theme }) => theme.colors.surfaceCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 1.25rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 2.5rem;
  }
`

export const SectionHeader = styled.header`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 1.75rem;

  svg {
    color: ${({ theme }) => theme.colors.yellowDark};
    flex-shrink: 0;
    margin-top: 0.125rem;
  }
`

export const SectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.subtitle};
`

export const SectionSubtitle = styled.p`
  margin-top: 0.125rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
`

export const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: 12.5rem minmax(0, 1fr) 4.5rem;
    gap: 1rem 0.75rem;
  }
`

interface FieldCellProps {
  $span?: 'full' | 'cep' | 'complement' | 'city' | 'state' | 'default'
}

export const FieldGroup = styled.div<FieldCellProps>`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  @media (min-width: 640px) {
    grid-column: ${({ $span }) => {
      switch ($span) {
        case 'full':
          return '1 / -1'
        case 'cep':
          return '1 / -1'
        case 'complement':
          return '2 / -1'
        case 'city':
          return '2 / 3'
        case 'state':
          return '3 / 4'
        default:
          return 'auto'
      }
    }};
  }
`

export const FieldLabel = styled.label`
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.subtitle};
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
`

export const OptionalTag = styled.span`
  font-size: 0.75rem;
  font-style: italic;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.label};
`

export const CepInputRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;

  input {
    width: 100%;
    max-width: 12.5rem;
  }
`

export const LookupButton = styled.button`
  height: 2.625rem;
  padding: 0 1rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: ${({ theme }) => theme.colors.purpleLight};
  color: ${({ theme }) => theme.colors.purpleText};
  font-size: 0.8125rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  border: 1px solid transparent;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.purple};
  }
`

export const TextInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  height: 2.625rem;
  padding: 0 0.75rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: ${({ theme }) => theme.colors.surfaceInput};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.borderStrong};
  color: ${({ theme }) => theme.colors.title};
  font-size: 0.875rem;
  transition: border-color 0.15s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.label};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.yellowDark};
  }
`

export const FieldError = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.error};
`

export const CepFeedbackBanner = styled.p<{
  $tone: 'info' | 'success' | 'error'
}>`
  margin-top: 0.25rem;
  padding: 0.5rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 0.8125rem;
  line-height: 1.4;
  background-color: ${({ theme, $tone }) => {
    if ($tone === 'success') return theme.colors.successBg
    if ($tone === 'error') return theme.colors.errorBg
    return theme.colors.purpleLight
  }};
  color: ${({ theme, $tone }) => {
    if ($tone === 'success') return theme.colors.success
    if ($tone === 'error') return theme.colors.error
    return theme.colors.purpleText
  }};
`
