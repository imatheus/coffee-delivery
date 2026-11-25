import { z } from 'zod'
import { normalizeCep } from '../services/viacep'

export const BRAZILIAN_STATES = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
] as const

export const checkoutSchema = z.object({
  cep: z
    .string()
    .trim()
    .refine(
      (value) => normalizeCep(value).length === 8,
      'Informe um CEP válido com 8 dígitos.',
    ),
  street: z
    .string()
    .trim()
    .min(3, 'Informe o nome da rua com pelo menos 3 caracteres.'),
  number: z.string().trim().min(1, 'Informe o número do endereço.'),
  complement: z.string().trim().optional(),
  neighborhood: z
    .string()
    .trim()
    .min(2, 'Informe o bairro com pelo menos 2 caracteres.'),
  city: z
    .string()
    .trim()
    .min(2, 'Informe a cidade com pelo menos 2 caracteres.'),
  state: z
    .string()
    .trim()
    .transform((value) => value.toUpperCase())
    .refine(
      (value) =>
        BRAZILIAN_STATES.includes(value as (typeof BRAZILIAN_STATES)[number]),
      'Informe uma UF válida (ex.: SP).',
    ),
  paymentMethod: z.enum(['credit', 'debit', 'cash'], {
    errorMap: () => ({ message: 'Selecione uma forma de pagamento.' }),
  }),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
