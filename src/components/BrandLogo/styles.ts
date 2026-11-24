import styled from 'styled-components'

export const BrandContainer = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  user-select: none;
`

export const EmblemFrame = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  padding: 0.15rem;
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(245, 242, 240, 0.92)' : 'transparent'};
  box-shadow: ${({ theme }) =>
    theme.mode === 'dark'
      ? '0 2px 10px rgba(139, 92, 246, 0.25)'
      : 'none'};
  flex-shrink: 0;
  transition: background-color 0.2s ease, transform 0.2s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export const Wordmark = styled.span`
  display: flex;
  flex-direction: column;
  line-height: 1.05;
`

export const BrandPrimary = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 800;
  font-size: 1.25rem;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.title};
`

export const BrandSecondary = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.purpleText};
`
