export type CepLookupErrorCode = 'INVALID_CEP' | 'NOT_FOUND' | 'NETWORK_ERROR'

export class CepLookupError extends Error {
  readonly code: CepLookupErrorCode

  constructor(code: CepLookupErrorCode, message: string) {
    super(message)
    this.name = 'CepLookupError'
    this.code = code
  }
}

export interface ViaCepAddress {
  cep: string
  street: string
  neighborhood: string
  city: string
  state: string
}

interface ViaCepRawResponse {
  cep?: string
  logradouro?: string
  bairro?: string
  localidade?: string
  uf?: string
  erro?: boolean | string
}

export function normalizeCep(rawCep: string): string {
  return rawCep.replace(/\D/g, '').slice(0, 8)
}

export function formatCepMask(rawCep: string): string {
  const digits = normalizeCep(rawCep)
  if (digits.length <= 5) {
    return digits
  }
  return `${digits.slice(0, 5)}-${digits.slice(5)}`
}

export async function fetchAddressByCep(
  rawCep: string,
  externalSignal?: AbortSignal,
): Promise<ViaCepAddress> {
  const digits = normalizeCep(rawCep)

  if (digits.length !== 8) {
    throw new CepLookupError(
      'INVALID_CEP',
      'Informe um CEP válido com 8 dígitos.',
    )
  }

  const timeoutController = new AbortController()
  const timeoutId = globalThis.setTimeout(
    () => timeoutController.abort(),
    8000,
  )

  const handleExternalAbort = () => timeoutController.abort()
  externalSignal?.addEventListener('abort', handleExternalAbort, { once: true })

  try {
    const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: timeoutController.signal,
    })

    if (!response.ok) {
      throw new CepLookupError(
        'NETWORK_ERROR',
        'Não foi possível consultar o CEP no momento. Preencha o endereço manualmente ou tente novamente.',
      )
    }

    const data = (await response.json()) as ViaCepRawResponse

    if (data.erro === true || data.erro === 'true') {
      throw new CepLookupError(
        'NOT_FOUND',
        'CEP não encontrado. Verifique os dígitos informados ou preencha o endereço manualmente.',
      )
    }

    return {
      cep: formatCepMask(data.cep ?? digits),
      street: (data.logradouro ?? '').trim(),
      neighborhood: (data.bairro ?? '').trim(),
      city: (data.localidade ?? '').trim(),
      state: (data.uf ?? '').trim().toUpperCase(),
    }
  } catch (error) {
    if (error instanceof CepLookupError) {
      throw error
    }

    if (externalSignal?.aborted) {
      throw error
    }

    throw new CepLookupError(
      'NETWORK_ERROR',
      'Não foi possível consultar o CEP no momento. Preencha o endereço manualmente ou tente novamente.',
    )
  } finally {
    globalThis.clearTimeout(timeoutId)
    externalSignal?.removeEventListener('abort', handleExternalAbort)
  }
}
