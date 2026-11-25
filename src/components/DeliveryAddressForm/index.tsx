import { MagnifyingGlass, MapPinLine, SpinnerGap } from '@phosphor-icons/react'
import { useRef, type ChangeEvent } from 'react'
import { useFormContext } from 'react-hook-form'
import { useCepLookup } from '../../hooks/useCepLookup'
import type { CheckoutFormData } from '../../schemas/checkoutSchema'
import { formatCepMask, normalizeCep } from '../../services/viacep'
import {
  CepFeedbackBanner,
  CepInputRow,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldsGrid,
  LookupButton,
  OptionalTag,
  SectionCard,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
  TextInput,
} from './styles'

export function DeliveryAddressForm() {
  const {
    register,
    setValue,
    getValues,
    setError,
    clearErrors,
    setFocus,
    formState: { errors },
  } = useFormContext<CheckoutFormData>()

  const { status, feedbackMessage, lookupCep, resetStatus } = useCepLookup()
  const lastFetchedCepRef = useRef<string>('')

  const cepRegister = register('cep')

  async function executeCepLookup(rawValue: string) {
    const digits = normalizeCep(rawValue)
    if (digits.length !== 8) {
      setError('cep', {
        type: 'manual',
        message: 'Informe um CEP válido com 8 dígitos.',
      })
      return
    }

    clearErrors('cep')
    lastFetchedCepRef.current = digits
    const address = await lookupCep(digits)

    if (!address) {
      return
    }

    if (address.street) {
      setValue('street', address.street, {
        shouldValidate: true,
        shouldDirty: true,
      })
    }
    if (address.neighborhood) {
      setValue('neighborhood', address.neighborhood, {
        shouldValidate: true,
        shouldDirty: true,
      })
    }
    if (address.city) {
      setValue('city', address.city, {
        shouldValidate: true,
        shouldDirty: true,
      })
    }
    if (address.state) {
      setValue('state', address.state, {
        shouldValidate: true,
        shouldDirty: true,
      })
    }

    if (address.street) {
      setFocus('number')
    } else {
      setFocus('street')
    }
  }

  function handleCepChange(event: ChangeEvent<HTMLInputElement>) {
    const masked = formatCepMask(event.target.value)
    event.target.value = masked
    cepRegister.onChange(event)

    const digits = normalizeCep(masked)
    if (digits.length < 8) {
      lastFetchedCepRef.current = ''
      if (status !== 'idle') {
        resetStatus()
      }
      return
    }

    if (digits.length === 8 && digits !== lastFetchedCepRef.current) {
      void executeCepLookup(digits)
    }
  }

  function handleManualLookupClick() {
    void executeCepLookup(getValues('cep') ?? '')
  }

  const bannerTone =
    status === 'success'
      ? 'success'
      : status === 'not_found' || status === 'error'
        ? 'error'
        : 'info'

  return (
    <SectionCard aria-labelledby="delivery-address-heading">
      <SectionHeader>
        <MapPinLine size={22} aria-hidden="true" />
        <div>
          <SectionTitle id="delivery-address-heading">
            Endereço de Entrega
          </SectionTitle>
          <SectionSubtitle>
            Informe o CEP para preenchimento automático do endereço onde deseja
            receber seu pedido
          </SectionSubtitle>
        </div>
      </SectionHeader>

      <FieldsGrid>
        <FieldGroup $span="cep">
          <FieldLabel htmlFor="checkout-cep">CEP</FieldLabel>
          <CepInputRow>
            <TextInput
              id="checkout-cep"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={9}
              placeholder="00000-000"
              $hasError={Boolean(errors.cep)}
              aria-invalid={Boolean(errors.cep)}
              aria-describedby={
                errors.cep
                  ? 'checkout-cep-error'
                  : feedbackMessage
                    ? 'checkout-cep-status'
                    : undefined
              }
              {...cepRegister}
              onChange={handleCepChange}
            />

            <LookupButton
              type="button"
              onClick={handleManualLookupClick}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <SpinnerGap size={16} aria-hidden="true" />
              ) : (
                <MagnifyingGlass size={16} weight="bold" aria-hidden="true" />
              )}
              <span>
                {status === 'loading' ? 'Buscando...' : 'Buscar CEP'}
              </span>
            </LookupButton>
          </CepInputRow>

          {errors.cep && (
            <FieldError id="checkout-cep-error" role="alert">
              {errors.cep.message}
            </FieldError>
          )}

          {feedbackMessage && (
            <CepFeedbackBanner
              id="checkout-cep-status"
              $tone={bannerTone}
              role={bannerTone === 'error' ? 'alert' : 'status'}
              aria-live="polite"
            >
              {feedbackMessage}
            </CepFeedbackBanner>
          )}
        </FieldGroup>

        <FieldGroup $span="full">
          <FieldLabel htmlFor="checkout-street">Rua</FieldLabel>
          <TextInput
            id="checkout-street"
            type="text"
            autoComplete="street-address"
            placeholder="Ex.: Avenida Paulista"
            $hasError={Boolean(errors.street)}
            aria-invalid={Boolean(errors.street)}
            aria-describedby={
              errors.street ? 'checkout-street-error' : undefined
            }
            {...register('street')}
          />
          {errors.street && (
            <FieldError id="checkout-street-error" role="alert">
              {errors.street.message}
            </FieldError>
          )}
        </FieldGroup>

        <FieldGroup>
          <FieldLabel htmlFor="checkout-number">Número</FieldLabel>
          <TextInput
            id="checkout-number"
            type="text"
            placeholder="Ex.: 1000"
            $hasError={Boolean(errors.number)}
            aria-invalid={Boolean(errors.number)}
            aria-describedby={
              errors.number ? 'checkout-number-error' : undefined
            }
            {...register('number')}
          />
          {errors.number && (
            <FieldError id="checkout-number-error" role="alert">
              {errors.number.message}
            </FieldError>
          )}
        </FieldGroup>

        <FieldGroup $span="complement">
          <FieldLabel htmlFor="checkout-complement">
            Complemento <OptionalTag>(Opcional)</OptionalTag>
          </FieldLabel>
          <TextInput
            id="checkout-complement"
            type="text"
            placeholder="Apto, bloco, referência..."
            {...register('complement')}
          />
        </FieldGroup>

        <FieldGroup>
          <FieldLabel htmlFor="checkout-neighborhood">Bairro</FieldLabel>
          <TextInput
            id="checkout-neighborhood"
            type="text"
            placeholder="Ex.: Bela Vista"
            $hasError={Boolean(errors.neighborhood)}
            aria-invalid={Boolean(errors.neighborhood)}
            aria-describedby={
              errors.neighborhood ? 'checkout-neighborhood-error' : undefined
            }
            {...register('neighborhood')}
          />
          {errors.neighborhood && (
            <FieldError id="checkout-neighborhood-error" role="alert">
              {errors.neighborhood.message}
            </FieldError>
          )}
        </FieldGroup>

        <FieldGroup $span="city">
          <FieldLabel htmlFor="checkout-city">Cidade</FieldLabel>
          <TextInput
            id="checkout-city"
            type="text"
            autoComplete="address-level2"
            placeholder="Ex.: São Paulo"
            $hasError={Boolean(errors.city)}
            aria-invalid={Boolean(errors.city)}
            aria-describedby={errors.city ? 'checkout-city-error' : undefined}
            {...register('city')}
          />
          {errors.city && (
            <FieldError id="checkout-city-error" role="alert">
              {errors.city.message}
            </FieldError>
          )}
        </FieldGroup>

        <FieldGroup $span="state">
          <FieldLabel htmlFor="checkout-state">UF</FieldLabel>
          <TextInput
            id="checkout-state"
            type="text"
            maxLength={2}
            autoComplete="address-level1"
            placeholder="SP"
            $hasError={Boolean(errors.state)}
            aria-invalid={Boolean(errors.state)}
            aria-describedby={
              errors.state ? 'checkout-state-error' : undefined
            }
            {...register('state', {
              onChange: (event: ChangeEvent<HTMLInputElement>) => {
                event.target.value = event.target.value
                  .replace(/[^a-zA-Z]/g, '')
                  .toUpperCase()
                  .slice(0, 2)
              },
            })}
          />
          {errors.state && (
            <FieldError id="checkout-state-error" role="alert">
              {errors.state.message}
            </FieldError>
          )}
        </FieldGroup>
      </FieldsGrid>
    </SectionCard>
  )
}
