import styled from 'styled-components'

export const CatalogSection = styled.section`
  max-width: 72rem;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 2rem 2rem 4rem;
  }
`

export const CatalogHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 3rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
`

export const CatalogTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 800;
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: ${({ theme }) => theme.colors.subtitle};
`

export const FilterToolbar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    align-items: flex-end;
  }
`

export const SearchBox = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 22rem;
  }

  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.label};
    pointer-events: none;
  }
`

export const SearchInput = styled.input`
  width: 100%;
  height: 2.5rem;
  padding: 0 2.25rem 0 2.25rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  background-color: ${({ theme }) => theme.colors.surfaceInput};
  color: ${({ theme }) => theme.colors.title};
  font-size: 0.875rem;
  transition: border-color 0.15s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.label};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.purple};
  }
`

export const ClearSearchButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.label};

  &:hover {
    color: ${({ theme }) => theme.colors.title};
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`

export const TagFilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

export const FilterChip = styled.button<{ $active: boolean }>`
  padding: 0.375rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.yellowDark : theme.colors.yellow};
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.yellowLight : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.yellowText : theme.colors.yellowDark};
  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.yellowLight};
    color: ${({ theme }) => theme.colors.yellowText};
  }
`

export const CoffeeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem 1.5rem;

  @media (min-width: 560px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 880px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 1120px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 2.5rem 2rem;
  }
`

export const EmptyFilterState = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 2.5rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  p {
    color: ${({ theme }) => theme.colors.text};
  }
`

export const ResetFilterButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.875rem;
  font-weight: 700;

  &:hover {
    background-color: ${({ theme }) => theme.colors.purpleDark};
  }
`
