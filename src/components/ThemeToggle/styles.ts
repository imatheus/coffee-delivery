import styled from 'styled-components'

export const ToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.375rem;
  height: 2.375rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.surfaceButton};
  color: ${({ theme }) => theme.colors.subtitle};
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.title};
  }

  &:active {
    transform: scale(0.96);
  }
`
