import styled from 'styled-components'

interface StepperProps {
  $size: 'sm' | 'md'
}

export const StepperContainer = styled.div<StepperProps>`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem;
  height: ${({ $size }) => ($size === 'sm' ? '2rem' : '2.375rem')};
  padding: 0 0.5rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.surfaceButton};
  min-width: 4.5rem;
`

export const StepperButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.purple};
  transition: color 0.15s ease;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.purpleDark};
  }
`

export const QuantityValue = styled.span`
  min-width: 1.25rem;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.title};
`
