import { describe, expect, it } from 'vitest'
import { checkoutSchema } from '../schemas/checkoutSchema'

describe('checkoutSchema (RF-08, RF-09 e RN-07)', () => {
  const validPayload = {
    cep: '01310-100',
    street: 'Avenida Paulista',
    number: '1000',
    complement: 'Conjunto 42',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'sp',
    paymentMethod: 'credit' as const,
  }

  it('valida endereço completo e normaliza UF para maiúsculas', () => {
    const result = checkoutSchema.safeParse(validPayload)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.state).toBe('SP')
    }
  })

  it('permite complemento vazio ou omitido', () => {
    const result = checkoutSchema.safeParse({
      ...validPayload,
      complement: '',
    })
    expect(result.success).toBe(true)
  })

  it('rejeita CEP com menos de 8 dígitos', () => {
    const result = checkoutSchema.safeParse({
      ...validPayload,
      cep: '01310',
    })
    expect(result.success).toBe(false)
  })

  it('rejeita UF inexistente e forma de pagamento ausente', () => {
    const invalidUf = checkoutSchema.safeParse({
      ...validPayload,
      state: 'XX',
    })
    expect(invalidUf.success).toBe(false)

    const missingPayment = checkoutSchema.safeParse({
      ...validPayload,
      paymentMethod: undefined,
    })
    expect(missingPayment.success).toBe(false)
  })
})
