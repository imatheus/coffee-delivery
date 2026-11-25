import { describe, expect, it, vi } from 'vitest'
import {
  CepLookupError,
  fetchAddressByCep,
  formatCepMask,
  normalizeCep,
} from '../services/viacep'

describe('Serviço ViaCEP (RF-08 e RN-07)', () => {
  it('normaliza e aplica máscara 00000-000 corretamente', () => {
    expect(normalizeCep('01310-100')).toBe('01310100')
    expect(formatCepMask('01310100')).toBe('01310-100')
    expect(formatCepMask('0131')).toBe('0131')
  })

  it('retorna endereço formatado quando ViaCEP encontra o CEP', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        cep: '01310-100',
        logradouro: 'Avenida Paulista',
        bairro: 'Bela Vista',
        localidade: 'São Paulo',
        uf: 'SP',
      }),
    } as Response)

    const address = await fetchAddressByCep('01310100')

    expect(fetchMock).toHaveBeenCalledWith(
      'https://viacep.com.br/ws/01310100/json/',
      expect.objectContaining({ method: 'GET' }),
    )
    expect(address).toEqual({
      cep: '01310-100',
      street: 'Avenida Paulista',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
    })
  })

  it('lança INVALID_CEP quando há menos de 8 dígitos sem chamar fetch', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')

    await expect(fetchAddressByCep('1234')).rejects.toMatchObject({
      name: 'CepLookupError',
      code: 'INVALID_CEP',
    })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('lança NOT_FOUND quando ViaCEP responde erro: true', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ erro: true }),
    } as Response)

    await expect(fetchAddressByCep('99999999')).rejects.toMatchObject({
      code: 'NOT_FOUND',
    })
  })

  it('lança NETWORK_ERROR quando ocorre falha de rede ou status HTTP inválido', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network down'))

    await expect(fetchAddressByCep('01310100')).rejects.toBeInstanceOf(
      CepLookupError,
    )
    await expect(fetchAddressByCep('01310100')).rejects.toMatchObject({
      code: 'NETWORK_ERROR',
    })
  })
})
