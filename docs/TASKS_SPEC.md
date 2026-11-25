# TASKS_SPEC — Plano de Implementação (Coffee Delivery)

> Checklist sequencial de tarefas pequenas, rastreáveis aos requisitos do [PRD_SPEC.md](./PRD_SPEC.md) e decisões técnicas do [TECH_SPEC.md](./TECH_SPEC.md).  
> Cada bloco concluído foi validado e versionado com commit descritivo em português (`pt-BR`), sem prefixos de tipo.

---

## Quadro de Tarefas

| ID | Objetivo | Requisitos | Arquivos Afetados | Critério de Pronto | Teste / Validação | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **T-01** | Especificações obrigatórias e diretrizes de IA | Todos (`RF-01`..`RF-16`, `RN-01`..`RN-10`) | `docs/PRD_SPEC.md`, `docs/TECH_SPEC.md`, `docs/TASKS_SPEC.md`, `AGENTS.md` | Documentos completos, coerentes e revisados antes do código | Revisão cruzada com rubrica oficial do projeto | `[x]` |
| **T-02** | Scaffold Vite + React + TypeScript + dependências | Base técnica SPA | `package.json`, `tsconfig*.json`, `vite.config.ts`, `vitest.config.ts`, `eslint.config.js`, `index.html`, `.gitignore` | Projeto instala, executa build e lint sem erros | `npm install` concluído sem erros | `[x]` |
| **T-03** | Identidade visual criada com IA e sistema de temas Light/Dark | `RF-14`, `RF-16` | `src/assets/*`, `public/favicon.png`, `src/styles/*`, `src/contexts/ThemeContext.tsx`, `src/hooks/useTheme.ts`, `src/components/BrandLogo/` | Logo IA nítida, favicon ativo e tokens claros/escuros tipados com persistência | Inspeção visual dos 17 assets PNG transparentes e temas tipados | `[x]` |
| **T-04** | Tipos, catálogo dos 14 cafés, cálculos em centavos, reducer imutável e `CartContext` | `RF-01`, `RF-03`, `RF-04`, `RF-05`, `RF-06`, `RN-01`..`RN-06`, `RN-08` | `src/types/*`, `src/data/coffees.ts`, `src/utils/currency.ts`, `src/reducers/cart/*`, `src/hooks/useLocalStorage.ts`, `src/hooks/useCart.ts`, `src/contexts/CartContext.tsx` | Estado global imutável com persistência segura e snapshot de pedido | `currency.test.ts` (4/4) e `cartReducer.test.ts` (5/5) aprovados | `[x]` |
| **T-05** | Layout base, Header, ThemeToggle, CartBadge, Hero e Catálogo responsivo | `RF-01`, `RF-02`, `RF-03`, `RF-04`, `RF-14`, `RF-15`, `RF-16` | `src/components/PageLayout/`, `Header/`, `ThemeToggle/`, `CartBadge/`, `QuantityInput/`, `Hero/`, `CoffeeCard/`, `CoffeeCatalog/`, `src/pages/Home/` | Home completa, responsiva, acessível, com busca/filtro por tag e adição ao carrinho | Testes de catálogo, filtro e badge em `appFlow.test.tsx` aprovados | `[x]` |
| **T-06** | Serviço ViaCEP, validação Zod e página de Checkout completa | `RF-05`, `RF-08`, `RF-09`, `RF-10`, `RF-11`, `RN-01`, `RN-03`..`RN-07`, `RN-09`, `RN-10` | `src/services/viacep.ts`, `src/hooks/useCepLookup.ts`, `src/schemas/checkoutSchema.ts`, `src/components/DeliveryAddressForm/`, `PaymentMethodSelector/`, `CartItem/`, `CartSummary/`, `EmptyCart/`, `src/pages/Checkout/` | Consulta CEP automática com tratamento de erros, pagamento obrigatório, resumo financeiro e estado vazio | `viacep.test.ts` (5/5), `checkoutSchema.test.ts` (4/4) e testes de checkout em `appFlow.test.tsx` aprovados | `[x]` |
| **T-07** | Página de Confirmação (`/success`) e roteamento SPA completo | `RF-07`, `RF-12`, `RF-13`, `RN-06`, `RN-09` | `src/components/OrderSuccess/`, `src/pages/Success/`, `src/App.tsx`, `src/main.tsx` | Snapshot preservado após limpeza do carrinho, estado vazio em acesso direto e rotas completas | Fluxo completo + refresh de `/success` validado em `appFlow.test.tsx` | `[x]` |
| **T-08** | Suíte de testes automatizados (unitários + integração) e auditoria final | Todos | `src/tests/*`, `src/contexts/*Value.ts`, `src/components/PaymentMethodSelector/styles.ts`, `vite.config.ts` | Todos os testes de cálculo, reducer, Zod, ViaCEP e fluxo de integração passando; zero erros de lint/build | `npm test` (24/24), `npm run lint` (0 erros/avisos), `npm run build` (0 erros/avisos) | `[x]` |
| **T-09** | Documentação final: evidências de IA, Branding com IA, deploy config e README | `RF-16`, Seções 4, 8 e 11 | `docs/AI_USAGE.md`, `docs/TASKS_SPEC.md`, `docs/TECH_SPEC.md`, `README.md`, `vercel.json`, `public/_redirects` | Evidências documentadas (4 interações + Branding com IA) e checklist final completo | Revisão integral contra checklist final do Notion | `[x]` |

---

## Histórico de Execução em Blocos

1. **T-01:** Especificações iniciais (`PRD_SPEC.md`, `TECH_SPEC.md`, `TASKS_SPEC.md`, `AGENTS.md`).
2. **T-02:** Configuração Vite + React + TypeScript + Vitest + ESLint + dependências.
3. **T-03:** Identidade visual original gerada com IA (logo, favicon, hero, entrega e 14 cafés) e sistema de temas claro/escuro.
4. **T-04:** Tipos de domínio, catálogo tipado, utilitários monetários em centavos, reducer imutável e `CartContext` persistente.
5. **T-05:** Layout base, Header, ThemeToggle, CartBadge, Hero e Catálogo responsivo com busca e filtros por tag.
6. **T-06:** Integração obrigatória ViaCEP, schema Zod, formulário de endereço, seletor de pagamento acessível e resumo do carrinho.
7. **T-07:** Tela de confirmação (`/success`) com snapshot independente e roteamento completo SPA.
8. **T-08:** Suíte de 24 testes automatizados (unitários e de integração), correção de acessibilidade no radio de pagamento e code-splitting no Vite.
9. **T-09:** Documentação final (`docs/AI_USAGE.md`, `README.md`, atualização dos SPECs) e configuração de rewrite SPA para Vercel/Netlify.
