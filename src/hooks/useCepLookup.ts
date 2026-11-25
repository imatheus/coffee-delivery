import { useCallback, useEffect, useRef, useState } from 'react'
import {
  CepLookupError,
  fetchAddressByCep,
  type ViaCepAddress,
} from '../services/viacep'

export type CepLookupStatus =
  | 'idle'
  | 'loading'
  | 'success'
  | 'not_found'
  | 'error'

export interface UseCepLookupResult {
  status: CepLookupStatus
  feedbackMessage: string | null
  lookupCep: (rawCep: string) => Promise<ViaCepAddress | null>
  resetStatus: () => void
}

export function useCepLookup(): UseCepLookupResult {
  const [status, setStatus] = useState<CepLookupStatus>('idle')
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  const resetStatus = useCallback(() => {
    abortControllerRef.current?.abort()
    setStatus('idle')
    setFeedbackMessage(null)
  }, [])

  const lookupCep = useCallback(
    async (rawCep: string): Promise<ViaCepAddress | null> => {
      abortControllerRef.current?.abort()
      const controller = new AbortController()
      abortControllerRef.current = controller

      setStatus('loading')
      setFeedbackMessage('Consultando endereço pelo CEP...')

      try {
        const address = await fetchAddressByCep(rawCep, controller.signal)
        if (controller.signal.aborted) {
          return null
        }

        const hasPartialOnly = !address.street || !address.neighborhood
        setStatus('success')
        setFeedbackMessage(
          hasPartialOnly
            ? 'Cidade e UF preenchidas via ViaCEP. Complete os campos restantes manualmente.'
            : 'Endereço preenchido automaticamente via ViaCEP. Informe apenas o número.',
        )
        return address
      } catch (error) {
        if (controller.signal.aborted) {
          return null
        }

        if (error instanceof CepLookupError) {
          if (error.code === 'NOT_FOUND') {
            setStatus('not_found')
          } else {
            setStatus('error')
          }
          setFeedbackMessage(error.message)
          return null
        }

        setStatus('error')
        setFeedbackMessage(
          'Não foi possível consultar o CEP no momento. Preencha o endereço manualmente.',
        )
        return null
      }
    },
    [],
  )

  return {
    status,
    feedbackMessage,
    lookupCep,
    resetStatus,
  }
}
