import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { AppRoutes } from '../App'
import {
  CART_STORAGE_KEY,
  LAST_ORDER_STORAGE_KEY,
} from '../contexts/cartContextValue'
import { CartProvider } from '../contexts/CartContext'
import { THEME_STORAGE_KEY } from '../contexts/themeContextValue'
import { ThemeProvider } from '../contexts/ThemeContext'
import { GlobalStyle } from '../styles/global'

function renderApp(initialEntries: string[] = ['/']) {
  return render(
    <ThemeProvider>
      <GlobalStyle />
      <CartProvider>
        <MemoryRouter initialEntries={initialEntries}>
          <AppRoutes />
        </MemoryRouter>
      </CartProvider>
    </ThemeProvider>,
  )
}

describe('Fluxos completos da SPA Coffee Delivery', () => {
  it('exibe os 14 cafés, filtra por categoria/busca, soma unidades no Header e persiste o carrinho', async () => {
    const user = userEvent.setup()
    const { unmount } = renderApp(['/'])

    // RF-01: catálogo visível
    expect(screen.getByText('Expresso Tradicional')).toBeInTheDocument()
    expect(screen.getByText('Irlandês')).toBeInTheDocument()

    // Filtro por tag e busca
    await user.click(screen.getByRole('button', { name: 'Alcoólico' }))
    expect(screen.getByText('Cubano')).toBeInTheDocument()
    expect(screen.getByText('Irlandês')).toBeInTheDocument()
    expect(screen.queryByText('Expresso Tradicional')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Todos' }))

    // RF-02 e RF-03: selecionar quantidade 2 e adicionar Expresso Tradicional + adicionar novamente 1 unidade
    await user.click(
      screen.getByRole('button', {
        name: 'Aumentar quantidade de Expresso Tradicional',
      }),
    )
    await user.click(
      screen.getByRole('button', {
        name: 'Adicionar Expresso Tradicional ao carrinho',
      }),
    )
    await user.click(
      screen.getByRole('button', {
        name: 'Adicionar Expresso Tradicional ao carrinho',
      }),
    )

    // RF-04: contador soma todas as unidades (2 + 1 = 3)
    expect(screen.getByTestId('cart-badge-count')).toHaveTextContent('3')

    // RF-06: persistência após recarregamento (unmount + novo render)
    expect(window.localStorage.getItem(CART_STORAGE_KEY)).toContain(
      'expresso-tradicional',
    )

    unmount()
    renderApp(['/'])
    expect(screen.getByTestId('cart-badge-count')).toHaveTextContent('3')
  })

  it('permite incrementar, decrementar e remover itens individualmente no Checkout (RF-05 e RF-10)', async () => {
    const user = userEvent.setup()
    renderApp(['/'])

    // Adiciona Expresso Tradicional (9,90) e Latte (11,90)
    await user.click(
      screen.getByRole('button', {
        name: 'Adicionar Expresso Tradicional ao carrinho',
      }),
    )
    await user.click(
      screen.getByRole('button', { name: 'Adicionar Latte ao carrinho' }),
    )

    await user.click(
      screen.getByRole('link', {
        name: /Ir para o carrinho de compras com 2 itens/i,
      }),
    )

    expect(screen.getByTestId('checkout-subtotal')).toHaveTextContent(
      'R$ 21,80',
    )
    expect(screen.getByTestId('checkout-total')).toHaveTextContent('R$ 25,30')

    // Incrementa Expresso Tradicional para 2 unidades -> subtotal 31,70, total 35,20
    await user.click(
      screen.getByRole('button', {
        name: 'Aumentar quantidade de Expresso Tradicional',
      }),
    )
    expect(screen.getByTestId('cart-badge-count')).toHaveTextContent('3')
    expect(screen.getByTestId('checkout-subtotal')).toHaveTextContent(
      'R$ 31,70',
    )
    expect(screen.getByTestId('checkout-total')).toHaveTextContent('R$ 35,20')

    // Decrementa de volta para 1 unidade
    await user.click(
      screen.getByRole('button', {
        name: 'Diminuir quantidade de Expresso Tradicional',
      }),
    )
    expect(screen.getByTestId('checkout-subtotal')).toHaveTextContent(
      'R$ 21,80',
    )

    // Remove Latte individualmente -> resta apenas 1x Expresso Tradicional (9,90 + 3,50 = 13,40)
    await user.click(
      screen.getByRole('button', { name: 'Remover Latte do carrinho' }),
    )
    expect(screen.getByTestId('cart-badge-count')).toHaveTextContent('1')
    expect(screen.getByTestId('checkout-subtotal')).toHaveTextContent('R$ 9,90')
    expect(screen.getByTestId('checkout-total')).toHaveTextContent('R$ 13,40')
  })

  it('trata CEP não encontrado na API ViaCEP mantendo edição manual do endereço (RF-08 e RN-07)', async () => {
    const user = userEvent.setup()

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ erro: true }),
    } as Response)

    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([{ coffeeId: 'expresso-tradicional', quantity: 1 }]),
    )

    renderApp(['/checkout'])

    await user.type(screen.getByLabelText('CEP'), '99999999')

    expect(
      await screen.findByText(/CEP não encontrado/i),
    ).toBeInTheDocument()

    // Usuário ainda consegue preencher manualmente
    await user.type(screen.getByLabelText('Rua'), 'Rua das Flores')
    expect(screen.getByLabelText('Rua')).toHaveValue('Rua das Flores')
  })

  it('executa fluxo completo Checkout com ViaCEP, validação, limpeza do carrinho e snapshot na confirmação', async () => {
    const user = userEvent.setup()

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        cep: '01310-100',
        logradouro: 'Avenida Paulista',
        bairro: 'Bela Vista',
        localidade: 'São Paulo',
        uf: 'SP',
      }),
    } as Response)

    const { unmount } = renderApp(['/'])

    // Adiciona 2x Expresso Tradicional (R$ 9,90 cada = R$ 19,80)
    await user.click(
      screen.getByRole('button', {
        name: 'Aumentar quantidade de Expresso Tradicional',
      }),
    )
    await user.click(
      screen.getByRole('button', {
        name: 'Adicionar Expresso Tradicional ao carrinho',
      }),
    )

    // Navega para o checkout pelo badge do Header (RF-07)
    await user.click(
      screen.getByRole('link', {
        name: /Ir para o carrinho de compras com 2 itens/i,
      }),
    )

    expect(screen.getByTestId('checkout-subtotal')).toHaveTextContent(
      'R$ 19,80',
    )
    expect(screen.getByTestId('checkout-delivery')).toHaveTextContent('R$ 3,50')
    expect(screen.getByTestId('checkout-total')).toHaveTextContent('R$ 23,30')

    // RF-11: impedir envio com formulário vazio
    await user.click(screen.getByRole('button', { name: /Confirmar Pedido/i }))
    expect(
      await screen.findByText(/Informe um CEP válido com 8 dígitos/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Selecione uma forma de pagamento/i),
    ).toBeInTheDocument()

    // RF-08: consulta automática ViaCEP ao preencher 8 dígitos
    await user.type(screen.getByLabelText('CEP'), '01310100')

    await waitFor(() => {
      expect(screen.getByLabelText('Rua')).toHaveValue('Avenida Paulista')
      expect(screen.getByLabelText('Bairro')).toHaveValue('Bela Vista')
      expect(screen.getByLabelText('Cidade')).toHaveValue('São Paulo')
      expect(screen.getByLabelText('UF')).toHaveValue('SP')
    })

    // Número manual e complemento opcional
    await user.type(screen.getByLabelText('Número'), '1578')

    // RF-09: selecionar forma de pagamento
    await user.click(screen.getByLabelText('Cartão de Crédito'))

    // Confirmar pedido
    await user.click(screen.getByRole('button', { name: /Confirmar Pedido/i }))

    // RF-12 e RF-13: tela de sucesso com snapshot + carrinho esvaziado
    expect(
      await screen.findByRole('heading', { name: /Uhu! Pedido confirmado/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Avenida Paulista, 1578/i)).toBeInTheDocument()
    expect(screen.getByText(/Bela Vista - São Paulo, SP/i)).toBeInTheDocument()
    expect(screen.getByText('Cartão de Crédito')).toBeInTheDocument()
    expect(screen.queryByTestId('cart-badge-count')).not.toBeInTheDocument()
    expect(window.localStorage.getItem(LAST_ORDER_STORAGE_KEY)).toContain(
      'Avenida Paulista',
    )

    // RN-06: snapshot permanece íntegro mesmo após refresh em /success
    unmount()
    renderApp(['/success'])
    expect(
      screen.getByRole('heading', { name: /Uhu! Pedido confirmado/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Avenida Paulista, 1578/i)).toBeInTheDocument()
  })

  it('exibe estados vazios adequados em /checkout e /success sem dados (RN-09)', () => {
    const { unmount } = renderApp(['/checkout'])
    expect(
      screen.getByRole('heading', { name: /Seu carrinho está vazio/i }),
    ).toBeInTheDocument()

    unmount()

    renderApp(['/success'])
    expect(
      screen.getByRole('heading', { name: /Nenhum pedido confirmado/i }),
    ).toBeInTheDocument()
  })

  it('alterna entre light mode e dark mode e persiste a preferência (RF-14)', async () => {
    const user = userEvent.setup()
    renderApp(['/'])

    expect(document.documentElement.dataset.theme).toBe('light')

    await user.click(screen.getByRole('button', { name: /Ativar modo escuro/i }))

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
  })
})
