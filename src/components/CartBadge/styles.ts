import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const CartLink = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.375rem;
  height: 2.375rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.yellowLight};
  color: ${({ theme }) => theme.colors.yellowDark};
  transition:
    filter 0.2s ease,
    transform 0.15s ease;

  &:hover {
    filter: brightness(0.95);
  }

  &:active {
    transform: scale(0.96);
  }
`

export const BadgeCount = styled.span`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.25rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background-color: ${({ theme }) => theme.colors.yellowDark};
  color: ${({ theme }) =>
    theme.mode === 'dark' ? '#141113' : theme.colors.white};
  font-size: 0.75rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`
