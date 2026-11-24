import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
`

export const HeaderContainer = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 1.25rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1.5rem 2rem;
  }
`

export const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.md};
`

export const ActionsGroup = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.75rem;
  }
`

export const LocationBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  height: 2.375rem;
  padding: 0 0.625rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.purpleLight};
  color: ${({ theme }) => theme.colors.purpleText};
  font-size: 0.875rem;
  font-weight: 500;
  max-width: 11rem;

  svg {
    color: ${({ theme }) => theme.colors.purple};
    flex-shrink: 0;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 390px) {
    display: none;
  }
`
