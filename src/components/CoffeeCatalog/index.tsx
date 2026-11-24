import { MagnifyingGlass, X } from '@phosphor-icons/react'
import { useMemo, useState } from 'react'
import { COFFEES } from '../../data/coffees'
import { COFFEE_TAGS, type CoffeeTag } from '../../types/coffee'
import { CoffeeCard } from '../CoffeeCard'
import {
  CatalogHeader,
  CatalogSection,
  CatalogTitle,
  ClearSearchButton,
  CoffeeGrid,
  EmptyFilterState,
  FilterChip,
  FilterToolbar,
  ResetFilterButton,
  SearchBox,
  SearchInput,
  TagFilterRow,
} from './styles'

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function CoffeeCatalog() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<CoffeeTag | 'Todos'>('Todos')
  const [announcement, setAnnouncement] = useState('')

  const filteredCoffees = useMemo(() => {
    const normalizedQuery = normalizeText(searchTerm)

    return COFFEES.filter((coffee) => {
      const matchesTag =
        selectedTag === 'Todos' || coffee.tags.includes(selectedTag)

      if (!matchesTag) {
        return false
      }

      if (!normalizedQuery) {
        return true
      }

      return (
        normalizeText(coffee.name).includes(normalizedQuery) ||
        normalizeText(coffee.description).includes(normalizedQuery)
      )
    })
  }, [searchTerm, selectedTag])

  function handleItemAdded(coffeeName: string, quantity: number) {
    const unitLabel = quantity === 1 ? 'unidade' : 'unidades'
    setAnnouncement(
      `${quantity} ${unitLabel} de ${coffeeName} adicionada ao carrinho.`,
    )
  }

  function handleResetFilters() {
    setSearchTerm('')
    setSelectedTag('Todos')
  }

  return (
    <CatalogSection aria-labelledby="catalog-heading">
      <CatalogHeader>
        <CatalogTitle id="catalog-heading">Nossos cafés</CatalogTitle>

        <FilterToolbar>
          <SearchBox>
            <MagnifyingGlass size={18} aria-hidden="true" />
            <label htmlFor="coffee-search" className="sr-only">
              Buscar café por nome ou descrição
            </label>
            <SearchInput
              id="coffee-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar café por nome..."
            />
            {searchTerm && (
              <ClearSearchButton
                type="button"
                onClick={() => setSearchTerm('')}
                aria-label="Limpar busca"
              >
                <X size={14} weight="bold" aria-hidden="true" />
              </ClearSearchButton>
            )}
          </SearchBox>

          <TagFilterRow role="group" aria-label="Filtrar cafés por categoria">
            <FilterChip
              type="button"
              $active={selectedTag === 'Todos'}
              aria-pressed={selectedTag === 'Todos'}
              onClick={() => setSelectedTag('Todos')}
            >
              Todos
            </FilterChip>
            {COFFEE_TAGS.map((tag) => (
              <FilterChip
                key={tag}
                type="button"
                $active={selectedTag === tag}
                aria-pressed={selectedTag === tag}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </FilterChip>
            ))}
          </TagFilterRow>
        </FilterToolbar>
      </CatalogHeader>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {filteredCoffees.length > 0 ? (
        <CoffeeGrid>
          {filteredCoffees.map((coffee) => (
            <CoffeeCard
              key={coffee.id}
              coffee={coffee}
              onItemAdded={handleItemAdded}
            />
          ))}
        </CoffeeGrid>
      ) : (
        <EmptyFilterState>
          <p>
            Nenhum café encontrado para os filtros aplicados. Tente outro termo
            ou categoria.
          </p>
          <ResetFilterButton type="button" onClick={handleResetFilters}>
            Limpar filtros
          </ResetFilterButton>
        </EmptyFilterState>
      )}
    </CatalogSection>
  )
}
