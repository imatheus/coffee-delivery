import styled from 'styled-components'

export const ItemRow = styled.li`
  list-style: none;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:first-child {
    padding-top: 0;
  }
`

export const ItemMain = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;

  img {
    width: 3.75rem;
    height: 3.75rem;
    object-fit: contain;
    flex-shrink: 0;
  }
`

export const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
`

export const ItemTitle = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.subtitle};
  font-weight: 500;
`

export const ItemActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
`

export const RemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  height: 2rem;
  padding: 0 0.5rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.surfaceButton};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  text-transform: uppercase;
  transition: background-color 0.15s ease;

  svg {
    color: ${({ theme }) => theme.colors.purple};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.subtitle};
  }
`

export const ItemPrice = styled.strong`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
`
