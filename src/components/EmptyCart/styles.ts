import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const EmptyWrapper = styled.section`
  max-width: 36rem;
  margin: 3rem auto;
  padding: 2.5rem 1.5rem;
  border-radius: ${({ theme }) => theme.radii.card};
  background-color: ${({ theme }) => theme.colors.surfaceCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

export const IconBadge = styled.span`
  width: 4rem;
  height: 4rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background-color: ${({ theme }) => theme.colors.purpleLight};
  color: ${({ theme }) => theme.colors.purple};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

export const EmptyTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.75rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.title};
`

export const EmptyDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  max-width: 28rem;
`

export const BackHomeLink = styled(Link)`
  margin-top: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
