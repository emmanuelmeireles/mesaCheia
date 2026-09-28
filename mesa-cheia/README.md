# Mesa Cheia

Aplicativo de incentivo à reciclagem e troca por alimentos frescos. O objetivo central é transformar resíduos recicláveis em pontos, que podem ser trocados por itens de alimentação de hortas e parceiros locais.

## Visão geral

Este projeto foi estruturado como uma base mobile-first com Expo + React Native, com foco em:

- cadastro e autenticação de usuário
- registro de materiais recicláveis
- cálculo automático de pontos
- dashboard de saldo e evolução
- troca de pontos por benefícios
- visualização de parceiros e mapa de pontos de coleta

## Stack

- React Native
- Expo
- TypeScript
- Node.js / npm

## Requisitos

- Node.js 18+
- npm
- Expo CLI
- Android Studio / emulator ou dispositivo físico

## Como rodar

No diretório do projeto:

```bash
npm install
npm start
```

Para abrir em emissor Android:

```bash
npm run android
```

Para web:

```bash
npm run web
```

## Estrutura de pastas

```text
mesa-cheia/
├── App.tsx
├── src/
│   ├── components/
│   │   ├── Goal.tsx
│   │   ├── sections/
│   │   └── ui/
│   ├── data/
│   │   ├── appContent.ts
│   │   └── mockData.ts
│   ├── features/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── home/
│   │   ├── map/
│   │   ├── materials/
│   │   ├── partners/
│   │   ├── profile/
│   │   └── trade/
│   ├── styles.ts
│   ├── theme.ts
│   ├── types.ts
│   └── utils/
│       └── points.ts
├── package.json
├── tsconfig.json
├── README.md
└── node_modules/
```

## Arquitetura de desenvolvimento

### 1. camada de dados
- `src/data/mockData.ts` concentra os dados iniciais de usuários, materiais, parceiros e entradas.
- Isso permite simular o produto mesmo sem backend ainda.

### 2. camada de lógica
- `src/features/*` concentra telas e comportamentos por domínio.
- `src/features/home/useHomeScreen.ts` guarda a lógica do formulário e navegação da home.
- `src/utils/points.ts` centraliza o cálculo de pontos.

### 3. camada de apresentação
- `src/components/sections/*` organiza blocos de tela reutilizáveis.
- `src/components/ui/*` concentra ações e botões padronizados.
- `src/styles.ts` e `src/theme.ts` definem padrão visual da aplicação.

## Fluxos implementados

### Autenticação
- Tela de login e cadastro
- campos de e-mail, senha e cidade
- estrutura pronta para integração com backend real

### Cadastro de material reciclável
- seleção de tipo de material
- definição de peso em kg
- preview de pontos calculados
- histórico de registros

### Pontuação
- cálculo por material e peso
- regra baseada em `pointsPerKg`
- centralização em `calculatePoints()`

### Dashboard
- saldo total
- pontos no mês
- número de envios
- resumo de métricas

### Perfil / troca / mapa / parceiros
- perfil do usuário com cidade, e-mail e saldo
- ofertas de troca por alimentos
- painel de parceiros e distância
- mapa base com pontos próximos

## Regras de negócio atuais

Os dados estão mockados e representam uma versão inicial do produto. As regras atuais são:

- cada material tem valor fixo por quilo
- pontos são arredondados com `Math.round`
- usuário tem saldo acumulado de pontos
- trocas são simulações visuais e não persistem em backend ainda

## Como evoluir com segurança

### Futuras mudanças recomendadas
1. mover dados para backend ou Supabase/Firebase
2. adicionar armazenamento persistente com AsyncStorage
3. criar autenticação real com JWT ou sessão
4. conectar cálculo de pontos ao banco de dados
5. implementar mapa real com geolocalização
6. adicionar testes de unidade para `calculatePoints`

### Boas práticas
- manter todos os cálculos em `src/utils`
- não misturar lógica de negócio com componentes visuais
- documentar qualquer regra nova no README
- manter os dados mockados separados da lógica

## Checklist para manutenção

- [ ] validar que todas as telas respeitam a paleta do app
- [ ] revisar regras de negócio antes de cada release
- [ ] manter mocks e dados de exemplo atualizados
- [ ] registrar migração de backend quando ele existir
- [ ] documentar novos fluxos no README

## Observações

Este projeto ainda está em fase de protótipo funcional. O objetivo atual é validar a experiência do usuário e a estrutura de produto antes de conectar sistemas reais.

## Contribuição

Para contribuir:

1. criar branch por feature
2. manter foco em domínio específico
3. validar com TypeScript antes de integrar
4. atualizar README quando houver mudança de arquitetura ou fluxo

## Estado atual

Versão base com fluxo principal estruturado, pronto para evoluir para backend real, autenticação persistente e integrações de dados reais.
