# TECH_SPEC — Coffee Delivery (Technical Specification)

> **Projeto:** Projeto Final 05 — Coffee Delivery (React + TypeScript + IA)  
> **Documento Relacionado:** [PRD_SPEC.md](./PRD_SPEC.md) | [TASKS_SPEC.md](./TASKS_SPEC.md)  
> **Versão:** 1.0  
> **Data:** Novembro de 2026

---

## 1. Stack e Justificativa das Bibliotecas

| Tecnologia | Versão / Papel | Justificativa Técnica |
| :--- | :--- | :--- |
| **React 19 + TypeScript (strict)** | Framework SPA e tipagem estática | Componentização declarativa, Hooks nativos e segurança de tipos em tempo de compilação (sem uso de `any`). |
| **Vite** | Bundler e dev server | HMR instantâneo, suporte nativo a TypeScript/ESM e build de produção otimizado. |
| **React Router (`react-router-dom`)** | Roteamento SPA (`/`, `/checkout`, `/success`) | Navegação sem recarregamento completo, layout compartilhado via `<Outlet />` e tratamento de rotas inexistentes. |
| **styled-components** | Estilização CSS-in-JS + ThemeProvider | Alinhado diretamente ao desafio original do Figma, oferece escopo automático de estilos, tipagem forte dos tokens de tema (`styled.d.ts`) e troca reativa entre tema claro e escuro. |
| **React Hook Form + Zod + `@hookform/resolvers`** | Formulário de checkout e validação declarativa | Performance com inputs não controlados, validação por schema tipado (`z.infer`) e integração limpa com preenchimento assíncrono via `setValue`. |
| **`@phosphor-icons/react`** | Biblioteca de ícones | Conjunto oficial de ícones utilizado no protótipo do Figma do Coffee Delivery (suporta variantes `regular` e `fill`). |
| **ViaCEP API** | API pública REST de CEP | Serviço gratuito, sem chave de API, padrão brasileiro para preenchimento automático de logradouro, bairro, cidade e UF (`RF-08` / `RN-07`). |
| **Vitest + Testing Library + jsdom** | Testes unitários e de integração | Integração nativa com Vite, execução rápida e testes orientados ao comportamento real do usuário e acessibilidade. |

---

## 2. Arquitetura da SPA e Separação de Responsabilidades

A aplicação adota arquitetura em camadas bem definidas dentro de `src/`, evitando concentração de lógica em `App.tsx`:

- **Camada de Apresentação (`src/pages/` e `src/components/`):** Páginas orquestram seções e fluxos; componentes recebem props tipadas e mantêm responsabilidade única.
- **Camada de Estado Global (`src/contexts/` e `src/reducers/`):**
  - `ThemeContext` gerencia tema claro/escuro, persistência e sincronização com `data-theme`.
  - `CartContext` encapsula `useReducer` para operações imutáveis do carrinho, persistência local e armazenamento do snapshot `lastOrder`.
- **Camada de Hooks (`src/hooks/`):** Abstrações reutilizáveis (`useCart`, `useTheme`, `useLocalStorage`, `useCepLookup`) que desacoplam regras de consumo de contexto e efeitos colaterais dos componentes visuais.
- **Camada de Serviços e Validação (`src/services/`, `src/schemas/`, `src/utils/`):**
  - `viacep.ts`: comunicação HTTP com timeout e tipagem de erros.
  - `checkoutSchema.ts`: regras de validação Zod para endereço e pagamento.
  - `currency.ts`: cálculos financeiros em centavos e formatação BRL.
- **Camada de Dados e Domínio (`src/types/`, `src/data/`):** Interfaces centrais e catálogo estático tipado dos 14 cafés.

---

## 3. Estrutura de Diretórios e Componentes

```text
coffee-delivery/
├── public/
│   └── favicon.png
├── src/
│   ├── assets/
│   │   ├── logo-mark.png          # Logo original gerada com IA
│   │   ├── hero-coffee.png        # Ilustração principal da Home
│   │   ├── delivery-scooter.png   # Ilustração da página de confirmação
│   │   └── coffees/               # Imagens dos 14 cafés do catálogo
│   ├── components/
│   │   ├── BrandLogo/             # Logo IA + wordmark adaptável light/dark
│   │   ├── CartBadge/             # Botão/link do carrinho com soma de unidades
│   │   ├── CartItem/              # Linha de item editável no Checkout
│   │   ├── CartSummary/           # Resumo financeiro e botão de confirmação
│   │   ├── CoffeeCard/            # Card individual de café na Home
│   │   ├── CoffeeCatalog/         # Grid responsivo + busca e filtro por tags
│   │   ├── DeliveryAddressForm/   # Campos de endereço + consulta ViaCEP
│   │   ├── EmptyCart/             # Estado vazio acionável
│   │   ├── Header/                # Cabeçalho com marca, localização, tema e carrinho
│   │   ├── Hero/                  # Seção de destaque da Home com diferenciais
│   │   ├── OrderSuccess/          # Cartão de confirmação do pedido concluído
│   │   ├── PageLayout/            # Layout base com Header, skip-link e Outlet
│   │   ├── PaymentMethodSelector/ # Seletor acessível (radiogroup) de pagamento
│   │   ├── QuantityInput/         # Controle reutilizável (- / valor / +)
│   │   └── ThemeToggle/           # Botão acessível para alternar light/dark
│   ├── contexts/
│   │   ├── CartContext.tsx
│   │   └── ThemeContext.tsx
│   ├── data/
│   │   └── coffees.ts             # Catálogo tipado dos 14 cafés + taxa fixa
│   ├── hooks/
│   │   ├── useCart.ts
│   │   ├── useCepLookup.ts
│   │   ├── useLocalStorage.ts
│   │   └── useTheme.ts
│   ├── pages/
│   │   ├── Home/
│   │   ├── Checkout/
│   │   └── Success/
│   ├── reducers/
│   │   └── cart/
│   │       ├── actions.ts
│   │       └── reducer.ts
│   ├── schemas/
│   │   └── checkoutSchema.ts
│   ├── services/
│   │   └── viacep.ts
│   ├── styles/
│   │   ├── global.ts
│   │   ├── styled.d.ts
│   │   └── themes/
│   │       ├── light.ts
│   │       └── dark.ts
│   ├── types/
│   │   ├── cart.ts
│   │   ├── coffee.ts
│   │   ├── order.ts
│   │   └── theme.ts
│   ├── utils/
│   │   └── currency.ts
│   ├── tests/
│   │   ├── setup.ts
│   │   ├── currency.test.ts
│   │   ├── cartReducer.test.ts
│   │   ├── checkoutSchema.test.ts
│   │   ├── viacep.test.ts
│   │   └── appFlow.test.tsx
│   ├── App.tsx
│   └── main.tsx
├── docs/
│   ├── PRD_SPEC.md
│   ├── TECH_SPEC.md
│   ├── TASKS_SPEC.md
│   └── AI_USAGE.md
├── AGENTS.md
└── README.md
```

---

## 4. Tipos e Interfaces de Domínio

```ts
export type CoffeeTag =
  | 'Tradicional'
  | 'Gelado'
  | 'Com leite'
  | 'Especial'
  | 'Alcoólico'

export interface Coffee {
  id: string
  name: string
  description: string
  tags: readonly CoffeeTag[]
  priceInCents: number
  image: string
  imageAlt: string
}

export interface CartItem {
  coffee: Coffee
  quantity: number
}

export type PaymentMethod = 'credit' | 'debit' | 'cash'

export interface DeliveryAddress {
  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
}

export interface Order {
  id: string
  createdAt: string
  items: readonly CartItem[]
  address: DeliveryAddress
  paymentMethod: PaymentMethod
  subtotalInCents: number
  deliveryFeeInCents: number
  totalInCents: number
}

export type ThemeMode = 'light' | 'dark'
```

---

## 5. Modelo de Context API e `useReducer`

### 5.1 Estado e Ações do Carrinho (`src/reducers/cart/`)
```ts
export interface CartState {
  items: CartItem[]
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { coffee: Coffee; quantity: number } }
  | { type: 'INCREMENT_ITEM'; payload: { coffeeId: string } }
  | { type: 'DECREMENT_ITEM'; payload: { coffeeId: string } }
  | { type: 'REMOVE_ITEM'; payload: { coffeeId: string } }
  | { type: 'CLEAR_CART' }
```

### 5.2 Garantias de Imutabilidade
- `ADD_ITEM`: ignora quantidades inválidas (`!Number.isInteger(quantity) || quantity <= 0`); verifica duplicidade com `find`; atualiza via `map` criando novo objeto `{ ...item, quantity: item.quantity + quantity }` ou retorna novo array `[...state.items, { coffee, quantity }]`.
- `INCREMENT_ITEM`: retorna novo array via `map` somando `+1` ao item correspondente.
- `DECREMENT_ITEM`: respeita `RN-01` mantendo o mínimo de `1` unidade (`Math.max(1, item.quantity - 1)`); exclusão ocorre explicitamente via `REMOVE_ITEM`.
- `REMOVE_ITEM`: remove via `filter((item) => item.coffee.id !== coffeeId)`.
- `CLEAR_CART`: retorna `{ items: [] }`.

### 5.3 Valores Derivados no `CartContext`
- `totalItems`: `items.reduce((sum, item) => sum + item.quantity, 0)` (`RF-04`).
- `subtotalInCents`: `calculateSubtotalInCents(items)` (`RN-03`).
- `deliveryFeeInCents`: `items.length > 0 ? DELIVERY_FEE_IN_CENTS : 0`.
- `totalInCents`: `subtotalInCents + deliveryFeeInCents`.
- `confirmOrder(address, paymentMethod)`: cria snapshot imutável `Order`, grava em `lastOrder` (estado + `localStorage`), dispara `CLEAR_CART` e retorna o `Order` criado para navegação até `/success` (`RF-12`, `RF-13`, `RN-06`).

---

## 6. Hooks, Efeitos e Estratégia de Persistência

- `useLocalStorage<T>(key, initialValue, validator?)`: lê JSON com `try/catch`, aplica validador opcional para descartar dados corrompidos e persiste mudanças automaticamente.
- `useCart()`: expõe estado derivado, ações do carrinho, `lastOrder` e `confirmOrder`, lançando erro explícito se invocado fora de `CartProvider`.
- `useTheme()`: expõe `{ themeMode, toggleTheme, isDark }`. Na primeira carga sem preferência salva, lê `window.matchMedia('(prefers-color-scheme: dark)').matches`. Salva em `@coffee-delivery:theme-v1` e atualiza `document.documentElement.dataset.theme` e `color-scheme`.
- `useCepLookup()`: aplica máscara `00000-000`, cancela requisições anteriores com `AbortController` para evitar *race conditions*, consulta `fetchAddressByCep` ao atingir 8 dígitos e controla os estados `idle | loading | success | not_found | error`.

### Chaves de Persistência (`localStorage`)
- `@coffee-delivery:cart-v1` — lista de itens do carrinho (`CartItem[]`).
- `@coffee-delivery:last-order-v1` — snapshot do último pedido confirmado (`Order | null`).
- `@coffee-delivery:theme-v1` — preferência de tema (`'light' | 'dark'`).

---

## 7. Rotas, Consulta ViaCEP, Validação Zod e Cálculos

### 7.1 Rotas (`React Router`)
- `/` → `Home` (Hero + `CoffeeCatalog` com busca/filtros).
- `/checkout` → `Checkout` (`DeliveryAddressForm`, `PaymentMethodSelector`, `CartSummary` ou `EmptyCart`).
- `/success` → `Success` (`OrderSuccess` com snapshot do pedido ou estado vazio se não houver pedido).
- `*` → redirecionamento seguro para `/` (`<Navigate to="/" replace />`).

### 7.2 Consulta ViaCEP (`src/services/viacep.ts`)
- Normaliza entrada removendo não dígitos (`cep.replace(/\D/g, '')`).
- Valida comprimento exato de 8 dígitos antes da chamada.
- Requisita `https://viacep.com.br/ws/${digits}/json/` com `AbortSignal` e timeout de 8 segundos.
- Diferencia três cenários de falha:
  1. `INVALID_CEP`: formato fora de 8 dígitos.
  2. `NOT_FOUND`: resposta HTTP 200 com `{ erro: true }`.
  3. `NETWORK_ERROR`: timeout, offline ou erro HTTP `>= 400`.
- Em sucesso, preenche `street`, `neighborhood`, `city` e `state` (preservando edição manual caso algum campo venha vazio em CEPs únicos de cidade) e move o foco para o campo `number`.

### 7.3 Validação Zod (`src/schemas/checkoutSchema.ts`)
- `cep`: obrigatório, exatamente 8 dígitos após normalização (`^\d{5}-?\d{3}$`).
- `street`: obrigatório, mínimo 3 caracteres.
- `number`: obrigatório, mínimo 1 caractere.
- `complement`: opcional.
- `neighborhood`: obrigatório, mínimo 2 caracteres.
- `city`: obrigatório, mínimo 2 caracteres.
- `state`: obrigatório, UF brasileira válida com 2 letras maiúsculas (`AC`, `AL`, ..., `TO`).
- `paymentMethod`: enum obrigatório (`'credit' | 'debit' | 'cash'`).

### 7.4 Utilitários Monetários (`src/utils/currency.ts`)
- `DELIVERY_FEE_IN_CENTS = 350` (`R$ 3,50`).
- `calculateSubtotalInCents(items)`: somatório inteiro via `reduce`.
- `calculateTotalInCents(subtotalInCents, deliveryFeeInCents)`: soma inteira.
- `formatCurrencyFromCents(cents)`: `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)`.
- `formatPriceValueFromCents(cents)`: retorna apenas o valor numérico (`9,90`) para compor o padrão visual do card no Figma (`R$` menor + valor em `Baloo 2`).

---

## 8. Temas, Tokens, Breakpoints e Acessibilidade

### 8.1 Tokens Semânticos (Light vs. Dark)
| Token | Light Mode (Figma) | Dark Mode (Espresso AA) | Uso Principal |
| :--- | :--- | :--- | :--- |
| `background` | `#FAFAFA` | `#141113` | Fundo geral da aplicação |
| `surfaceCard` | `#F3F2F2` | `#1F1B1E` | Cards de café, blocos do checkout |
| `surfaceInput` | `#EDEDED` | `#262124` | Campos de texto e seletor de quantidade |
| `surfaceButton` | `#E6E5E5` | `#2E282C` | Botões secundários e opções de pagamento |
| `surfaceHover` | `#D7D5D5` | `#3B3438` | Hover de controles neutros |
| `title` | `#272221` | `#F5F2F0` | Títulos `Baloo 2` |
| `subtitle` | `#403937` | `#E2DCD9` | Subtítulos e destaques secundários |
| `text` | `#574F4D` | `#C7BFBB` | Corpo de texto |
| `label` | `#6B6563` | `#A89F9B` | Rótulos, placeholders e texto auxiliar (contraste AA) |
| `yellow` / `yellowDark` / `yellowLight` | `#DBAC2C` / `#C47F17` / `#F1E9C9` | `#E5B53B` / `#F5B82E` / `#3A2F18` | CTA principal, tags, ícone carrinho |
| `purple` / `purpleDark` / `purpleLight` | `#8047F8` / `#4B2995` / `#EBE5F9` | `#8B5CF6` / `#B197FC` / `#2D2246` | Ações de compra, seleção ativa, localização |
| `error` / `errorBg` | `#C92A2A` / `#FFF5F5` | `#FF6B6B` / `#3A1B1E` | Erros de formulário e consulta de CEP |

### 8.2 Breakpoints Responsivos
- **Extra Small Mobile:** `320px` – `479px` (1 coluna no catálogo, header compacto sem quebra).
- **Mobile:** `480px` – `767px` (1–2 colunas fluidas, checkout empilhado em coluna única).
- **Tablet:** `768px` – `1023px` (2–3 colunas no catálogo, hero empilhado).
- **Desktop:** `1024px` – `1440px+` (4 colunas no catálogo, checkout em 2 colunas `640px` + `448px`, container máximo `1120px`).

### 8.3 Acessibilidade (WCAG 2.2 AA)
- Link "Pular para o conteúdo principal" visível ao focar via teclado.
- `aria-label` descritivo em botões iconográficos (`ThemeToggle`, `QuantityInput`, `CartBadge`, botão de adicionar ao carrinho).
- Mensagens de erro ligadas aos inputs via `aria-describedby` e `aria-invalid`.
- Anúncios dinâmicos em `aria-live="polite"` ao adicionar item ao carrinho ou finalizar busca de CEP.
- Suporte a `@media (prefers-reduced-motion: reduce)` desabilitando transições/animações não essenciais.

---

## 9. Qualidade, Testes e Execução

### 9.1 Scripts NPM
- `npm run dev` — servidor de desenvolvimento Vite.
- `npm run build` — checagem TypeScript (`tsc -b`) + build de produção Vite.
- `npm run lint` — análise estática ESLint.
- `npm test` — execução da suíte Vitest em modo CI (`vitest run`).
- `npm run test:watch` — execução interativa de testes.

### 9.2 Cobertura de Testes Planejada
1. **Testes unitários de cálculos (`currency.test.ts`):** precisão em centavos (evitando `9.9 * 3 !== 29.7`), subtotal, frete fixo e formatação BRL.
2. **Testes unitários do reducer (`cartReducer.test.ts`):** adição, acúmulo sem duplicação, rejeição de quantidade `<= 0`, incremento, limite mínimo de decremento (`RN-01`), remoção individual, limpeza e verificação de imutabilidade por referência.
3. **Testes unitários do schema Zod (`checkoutSchema.test.ts`):** endereço completo válido, complemento opcional, CEP inválido, UF inválida e pagamento obrigatório.
4. **Testes unitários do serviço ViaCEP (`viacep.test.ts`):** preenchimento com sucesso, CEP não encontrado (`erro: true`), formato inválido e erro de rede.
5. **Testes de integração (`appFlow.test.tsx`):** catálogo + filtro, adição ao carrinho + soma no badge do Header, persistência em `localStorage`, preenchimento via ViaCEP mockado no checkout, bloqueio de envio inválido, confirmação do pedido + limpeza do carrinho + snapshot em `/success`, e alternância persistente de light/dark mode.

---

## 10. Rastreabilidade de Requisitos (`PRD_SPEC` → `TECH_SPEC`)

| Requisito | Implementação Principal |
| :--- | :--- |
| **RF-01, RN-08** | `src/data/coffees.ts`, `src/components/CoffeeCatalog/`, `src/components/CoffeeCard/` |
| **RF-02, RN-01** | `src/components/QuantityInput/`, `src/reducers/cart/reducer.ts` |
| **RF-03, RN-02** | `src/reducers/cart/reducer.ts` (`ADD_ITEM`), `src/contexts/CartContext.tsx` |
| **RF-04** | `src/components/CartBadge/`, `src/contexts/CartContext.tsx` (`totalItems`) |
| **RF-05, RN-01** | `src/components/CartItem/`, `src/reducers/cart/reducer.ts` |
| **RF-06, RN-06** | `src/contexts/CartContext.tsx`, `src/hooks/useLocalStorage.ts` |
| **RF-07** | `src/App.tsx`, `src/components/PageLayout/`, `src/pages/*` |
| **RF-08, RN-07** | `src/services/viacep.ts`, `src/hooks/useCepLookup.ts`, `src/schemas/checkoutSchema.ts`, `src/components/DeliveryAddressForm/` |
| **RF-09, RN-05** | `src/components/PaymentMethodSelector/`, `src/schemas/checkoutSchema.ts` |
| **RF-10, RN-03, RN-04** | `src/utils/currency.ts`, `src/components/CartSummary/` |
| **RF-11, RN-09, RN-10** | `src/pages/Checkout/`, `src/components/EmptyCart/`, `src/schemas/checkoutSchema.ts` |
| **RF-12, RF-13, RN-06, RN-09** | `src/contexts/CartContext.tsx` (`confirmOrder`, `lastOrder`), `src/pages/Success/`, `src/components/OrderSuccess/` |
| **RF-14** | `src/contexts/ThemeContext.tsx`, `src/styles/themes/`, `src/components/ThemeToggle/` |
| **RF-15** | Media queries mobile-first em todos os componentes estilizados e `src/styles/global.ts` |
| **RF-16** | `src/assets/logo-mark.png`, `public/favicon.png`, `src/components/BrandLogo/`, `docs/AI_USAGE.md`, `README.md` |
