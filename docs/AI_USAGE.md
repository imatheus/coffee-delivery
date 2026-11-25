# AI_USAGE — Registro de Uso de IA e Branding com IA

Este documento registra o uso crítico e documentado de ferramentas de Inteligência Artificial ao longo do planejamento, identidade visual, desenvolvimento incremental, revisão e validação do projeto **Coffee Delivery — React + TypeScript + IA**.

---

## 1. Branding com IA (Identidade Visual Original — RF-16)

### 1.1 Conceito da Marca
Mantivemos o nome comercial **Coffee Delivery**, criando uma identidade visual própria centrada na agilidade de entrega artesanal de cafés especiais. A paleta homenageia a referência do Figma — **Roxo Real (`#8047F8`)** e **Amarelo Dourado (`#DBAC2C`)** — complementada por neutros inspirados em café torrado e creme no tema claro (`#FAFAFA` / `#F3F2F2`) e espresso profundo com contraste WCAG 2.2 AA no tema escuro (`#141113` / `#1F1B1E`).

### 1.2 Ferramenta Utilizada e Prompts Aplicados
- **Ferramenta de geração de imagem:** Modelo generativo de imagens integrado ao ambiente de desenvolvimento (subagente `image-generator` / geração de imagens via IA).
- **Pós-processamento e curadoria:** Recorte de fundo branco puro para PNG transparente com anti-aliasing (garantindo integração limpa tanto no tema claro quanto no tema escuro) e geração do favicon em `public/favicon.png`.

| Asset | Prompt Utilizado | Resultado e Motivo da Escolha |
| :--- | :--- | :--- |
| **Logo Original (`src/assets/logo-mark.png` e `public/favicon.png`)** | *"Generate a minimalist, modern, original logo emblem (icon only, NO text or letters) for an artisanal specialty coffee delivery brand called 'Coffee Delivery'. Design a sleek geometric flat-vector coffee takeaway cup blended subtly with a sleek upward delivery rocket flame / aromatic steam swirl in vibrant royal purple (#8047F8) and warm golden amber (#DBAC2C) accents with deep espresso (#4B2995) outline balance. Centered on pure white, high legibility even at 32x32 favicon size."* | Escolhida pela síntese imediata entre cafeteria (copo + grão dourado) e entrega expressa (aletas e propulsão em formato de vapor/chama). Por ser um emblema sem texto embutido, mantém nitidez em `16x16`/`32x32` no favicon e combina perfeitamente com o wordmark `Baloo 2` em temas claro e escuro (com base suave iluminada no modo escuro). |
| **Ilustração Hero (`src/assets/hero-coffee.png`)** | *"Modern editorial product visual for a coffee delivery website hero section: sleek matte-cream and deep-purple insulated takeaway coffee cup with dark espresso lid tilted dynamically at 12 degrees, surrounded by whole roasted coffee beans and subtle golden-amber aroma swirls on solid pure white background."* | Harmoniza com a paleta roxa/dourada da Home e cria profundidade editorial ao lado dos 4 benefícios principais. |
| **Ilustração Confirmação (`src/assets/delivery-scooter.png`)** | *"Clean, modern flat editorial vector illustration for an order confirmation page: cheerful delivery courier wearing a helmet riding a stylish purple (#8047F8) and golden-yellow (#DBAC2C) scooter with insulated coffee delivery box on the back, subtle horizontal speed lines, on pure white background."* | Mantém fidelidade visual ao frame de confirmação do Figma (`222:824`) com traço moderno e fundo transparente funcional em ambos os temas. |
| **Catálogo de Cafés (`src/assets/coffees/*.png`)** | Prompts padronizados em perspectiva *top-down* (xícara de porcelana branca sobre pires redondo branco) para cafés base (`Expresso Tradicional`, `Expresso Americano`, `Expresso Cremoso`, `Expresso Gelado`, `Café com Leite`, `Latte`) e padronização circular com coberturas específicas para os demais sabores (`Capuccino`, `Macchiato`, `Mocaccino`, `Chocolate Quente`, `Cubano`, `Havaiano`, `Árabe`, `Irlandês`). | Garante consistência de proporção, iluminação e recorte circular transparente em todos os 14 cards, sem distorções nem bordas brancas no Dark Mode. |

### 1.3 Verificação de Legibilidade e Direitos
- Legibilidade verificada em `40x40px` no Header e em escala reduzida no favicon (`public/favicon.png`).
- Assets gerados especificamente para fins educacionais deste projeto acadêmico, sem uso de marcas registradas de terceiros.

---

## 2. Evidências de Interações Relevantes com o Assistente de IA

### Interação 1 — Planejamento SPEC Antes do Código
- **Objetivo:** Estruturar `PRD_SPEC.md`, `TECH_SPEC.md`, `TASKS_SPEC.md` e `AGENTS.md` alinhando os 16 requisitos funcionais (`RF-01`..`RF-16`), 10 regras de negócio (`RN-01`..`RN-10`) e referências do Figma antes de escrever código.
- **Prompt (resumo):** *"Analise a especificação completa do Projeto Final Coffee Delivery e o protótipo do Figma. Estruture PRD, TECH SPEC, TASKS SPEC e AGENTS.md definindo arquitetura, decisões de frete, quantidades, ViaCEP, Dark Mode e estratégia de testes antes de codificar."*
- **Resposta resumida:** Mapeou a arquitetura em camadas (`pages`, `components`, `contexts`, `reducers`, `hooks`, `services`, `schemas`, `utils`, `styles`), definiu cálculo inteiro em centavos (`RN-04`), taxa fixa centralizada (`DELIVERY_FEE_IN_CENTS = 350`), regra de quantidade mínima no carrinho (`RN-01`) e chaves versionadas de `localStorage`.
- **Decisão tomada:** Adotar `styled-components` (alinhado ao desafio original) com tokens semânticos light/dark e incluir busca + filtro por categoria como melhoria opcional na Home sem alterar o fluxo principal.
- **Evidência:** Commit `Adiciona especificacoes iniciais do projeto e diretrizes de IA` (`docs/PRD_SPEC.md`, `docs/TECH_SPEC.md`, `docs/TASKS_SPEC.md`, `AGENTS.md`).

### Interação 2 — Modelagem Imutável do Carrinho e Snapshot Independente de Pedido
- **Objetivo:** Garantir que `useReducer` + `Context API` sigam estritamente imutabilidade, evitem duplicação de produtos e preservem o pedido confirmado após esvaziar o carrinho (`RF-03`, `RF-06`, `RF-13`, `RN-01`..`RN-06`).
- **Prompt (resumo):** *"Implemente o reducer imutável do carrinho com map/filter/find, validação contra quantidades inválidas, persistência segura em localStorage e um snapshot independente do último pedido confirmado para a tela /success."*
- **Resposta resumida:** Implementou `cartReducer` puro rejeitando quantidades `<= 0` ou decimais, acumulando quantidades por `coffee.id`, mantendo mínimo `1` no decremento (delegando exclusão ao botão `Remover`) e salvando um objeto `Order` imutável em `@coffee-delivery:last-order-v1` antes de disparar `CLEAR_CART`.
- **Decisão tomada:** Persistir apenas `{ coffeeId, quantity }` no storage do carrinho e re-hidratar contra o catálogo tipado `COFFEES`, evitando falhas caso o JSON salvo esteja corrompido ou desatualizado.
- **Evidência:** Commit `Implementa tipos, catalogo de cafes, calculos em centavos, reducer e contexto do carrinho` e testes aprovados em `src/tests/cartReducer.test.ts` e `src/tests/currency.test.ts`.

### Interação 3 — Integração Obrigatória com ViaCEP e Validação com React Hook Form + Zod
- **Objetivo:** Integrar a API pública ViaCEP no Checkout tratando estados de carregamento, CEP inválido, CEP inexistente (`erro: true`) e falhas de rede sem bloquear o preenchimento manual (`RF-08`, `RN-07`).
- **Prompt (resumo):** *"Crie o serviço tipado ViaCEP com AbortController e timeout, o hook useCepLookup e o formulário de checkout validado por Zod que preenche rua, bairro, cidade e UF automaticamente mantendo número manual e complemento opcional."*
- **Resposta resumida:** Criou `src/services/viacep.ts` com erro tipado `CepLookupError` (`INVALID_CEP`, `NOT_FOUND`, `NETWORK_ERROR`), `src/hooks/useCepLookup.ts` cancelando consultas concorrentes, máscara `00000-000` e foco automático no campo `Número` após retorno positivo.
- **Decisão tomada:** Manter todos os campos de endereço editáveis mesmo após consulta ViaCEP (cobrindo CEPs gerais de municípios sem logradouro e eventuais indisponibilidades da API), com botão explícito "Buscar CEP" adicional para acessibilidade.
- **Evidência:** Commit `Implementa checkout com consulta ViaCEP, validacao Zod, pagamento e resumo do carrinho` e testes em `src/tests/viacep.test.ts` e `src/tests/checkoutSchema.test.ts`.

### Interação 4 — Depuração Orientada por Testes e Acessibilidade do Seletor de Pagamento
- **Objetivo:** Validar toda a aplicação com testes automatizados (Vitest + Testing Library), ESLint e build de produção, corrigindo qualquer falha descoberta.
- **Prompt (resumo):** *"Crie testes unitários e de integração cobrindo Home, carrinho, persistência, ViaCEP, bloqueio de checkout inválido, tela de sucesso e Dark Mode; execute lint e build e corrija os problemas apontados."*
- **Resposta resumida:** A suíte de testes identificou três melhorias concretas: (1) `pointer-events: none` no `<input type="radio">` oculto do `PaymentMethodSelector` impedia interação direta por ferramentas assistivas; (2) `vi.restoreAllMocks()` resetava o mock global de `window.matchMedia` entre testes; (3) avisos de Fast Refresh no ESLint ao exportar contextos e componentes no mesmo arquivo.
- **Decisão tomada:** Substituir `pointer-events: none` por técnica acessível de ocultação visual (`.sr-only`), adicionar guarda defensiva em `ThemeContext`, separar definições de contexto (`cartContextValue.ts` / `themeContextValue.ts`) e configurar code-splitting em `vite.config.ts`.
- **Evidência:** Commits `Ajusta acessibilidade do pagamento, separa contextos e otimiza chunks do Vite` e `Adiciona testes unitarios e de integracao dos fluxos principais` — resultado final: **24/24 testes aprovados**, **0 erros/avisos no ESLint** e **build de produção limpo**.
