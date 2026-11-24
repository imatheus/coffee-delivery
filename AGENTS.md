# AGENTS.md — Diretrizes para Assistentes de IA (Coffee Delivery)

Este arquivo orienta assistentes de IA que colaboram no desenvolvimento, revisão e testes do projeto **Coffee Delivery — React + TypeScript + IA**.

---

## 1. Contexto do Projeto

- **Objetivo:** Construir uma SPA de cafeteria artesanal com catálogo de 14 cafés, carrinho persistente, checkout com consulta obrigatória de CEP (ViaCEP), seleção de pagamento fictício, página de confirmação com snapshot independente, identidade visual autoral criada com IA, tema claro/escuro e responsividade mobile-first.
- **Referência Visual:** [Figma — Coffee Delivery • Projeto Final React](https://www.figma.com/design/yGPNTA0Yczb183EikXGIiA/Coffee-Delivery-%E2%80%A2-Projeto-Final-React?node-id=2-1297) (Home `2:1550`, Checkout `217:511`, Confirmação `222:824` e Style Guide).
- **Documentação Obrigatória (leia antes de alterar código):**
  1. [`docs/PRD_SPEC.md`](./docs/PRD_SPEC.md) — requisitos funcionais (`RF-01`..`RF-16`), regras de negócio (`RN-01`..`RN-10`) e critérios de aceite.
  2. [`docs/TECH_SPEC.md`](./docs/TECH_SPEC.md) — stack, arquitetura, tipos, reducer, hooks, tokens de tema e rastreabilidade.
  3. [`docs/TASKS_SPEC.md`](./docs/TASKS_SPEC.md) — ordem incremental de tarefas e status de entrega.

---

## 2. Regras de Atuação do Assistente

1. **Ler os SPECs antes de codificar:** Nunca propor alterações que violem `PRD_SPEC.md` ou `TECH_SPEC.md` sem atualizar a especificação correspondente.
2. **Trabalhar em blocos incrementais:** Implementar por tarefas pequenas de `TASKS_SPEC.md`, validando cada entrega antes de avançar e registrando commits semânticos em `pt-BR`.
3. **Respeitar limites de escopo:** Não criar backend, autenticação, banco de dados ou cobrança real. A única API externa obrigatória é a consulta pública de CEP (ViaCEP).
4. **Manter a documentação sincronizada:** Atualizar `docs/TASKS_SPEC.md`, `docs/AI_USAGE.md` e `README.md` sempre que uma tarefa ou decisão relevante for concluída.

---

## 3. Padrões Técnicos Obrigatórios

- **TypeScript Strict:** Proibido usar `any` como atalho de tipagem. Todos os dados, props, ações do reducer, serviços e retornos de hooks devem ser tipados explicitamente.
- **Imutabilidade e Arrays:** No reducer do carrinho e manipulações de lista, usar exclusivamente operações imutáveis (`map`, `filter`, `find`, `reduce`, spread); nunca mutar `state` ou arrays diretamente (`push`, `splice`, atribuição direta em itens).
- **Precisão Monetária (`RN-04`):** Armazenar e calcular todos os preços e totais como inteiros em centavos (`priceInCents`, `DELIVERY_FEE_IN_CENTS = 350`). Converter para BRL somente na exibição.
- **Estilização e Temas:** Utilizar `styled-components` com tokens semânticos definidos em `src/styles/themes/light.ts` e `src/styles/themes/dark.ts`. Nunca fixar cores de texto ou fundo hardcoded que quebrem o modo escuro.
- **Acessibilidade (WCAG 2.2 AA):** Garantir contraste adequado nos dois temas, foco visível (`:focus-visible`), labels associados (`htmlFor`/`id`), `role="alert"` em erros de formulário, `aria-live="polite"` para feedbacks assíncronos e respeito a `prefers-reduced-motion`.
- **Responsividade:** Evitar larguras fixas que causem scroll horizontal em `320px` e `375px`; testar mobile, tablet e desktop.

---

## 4. Padrão de Commits (em `pt-BR`)

Utilizar mensagens diretas, claras e descritivas em português, agrupadas em blocos lógicos (sem prefixos como `feat:` ou `style:`):

- Exemplo: `Adiciona especificacoes iniciais do projeto e diretrizes de IA`
- Exemplo: `Configura projeto Vite com React, TypeScript e dependencias`
- Exemplo: `Implementa checkout com consulta ViaCEP e validacao Zod`
- Exemplo: `Adiciona testes unitarios e de integracao dos fluxos principais`

---

## 5. Critérios de Validação Antes de Concluir uma Tarefa

- `npm run build` finaliza sem erros de TypeScript ou empacotamento.
- `npm run lint` não reporta erros.
- `npm test` executa toda a suíte com 100% de aprovação.
- Console livre de erros/warnings em tempo de execução e sem código morto ou `console.log` de depuração.
