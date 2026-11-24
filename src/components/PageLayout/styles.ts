import styled from 'styled-components'

export const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export const SkipLink = styled.a`
  position: absolute;
  left: -9999px;
  top: 0.75rem;
  z-index: 100;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;

  &:focus {
    left: 1rem;
  }
`

export const MainContent = styled.main`
  flex: 1;
`

export const Footer = styled.footer`
  margin-top: 4rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surfaceCard};
`

export const FooterContainer = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.label};
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    padding: 1.5rem 2rem;
    text-align: left;
  }
`
