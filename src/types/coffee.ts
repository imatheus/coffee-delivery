export const COFFEE_TAGS = [
  'Tradicional',
  'Gelado',
  'Com leite',
  'Especial',
  'Alcoólico',
] as const

export type CoffeeTag = (typeof COFFEE_TAGS)[number]

export interface Coffee {
  id: string
  name: string
  description: string
  tags: readonly CoffeeTag[]
  priceInCents: number
  image: string
  imageAlt: string
}
