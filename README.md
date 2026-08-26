# MesaCheia

Plataforma que conecta famílias, cooperativas e produtores locais para transformar materiais recicláveis em alimentos frescos.

## Visão do projeto

 O MesaCheia digitaliza iniciativas de troca de recicláveis por alimentos. A plataforma registra a pesagem no ponto de compra de itens reciclaveis, converte materiais em pontos, sem capitar e repassar fundos, controla o estoque disponível pelos produtores locais e mostra o impacto gerado pela operação.

 ### Problema

 Programas de troca já existem no Brasil, mas frequentemente dependem de papel, planilhas e pontos de atendimento limitados. Isso dificulta:

 - acompanhar o saldo e o histórico das famílias;
 - aplicar taxas de conversão com consistência;
 - administrar o estoque de alimentos;
 - medir o impacto para ONGs, prefeituras e patrocinadores.

 ### Proposta de valor

 | Público | Benefício principal |
 | --- | --- |
 | Famílias | Consultar pontos, locais de troca, alimentos disponíveis e histórico. |
 | Cooperativas e pontos de coleta | Registrar pesagens e controlar as trocas sem depender de papel. |
 | ONGs e prefeituras | Acompanhar famílias atendidas, materiais reciclados e alimentos distribuídos. |
 | Produtores e empresas parceiras | Destinar excedentes e apoiar uma iniciativa com impacto mensurável. |

 ## MVP

 ### Funcionalidades incluídas

 #### Aplicativo da família

 - cadastro simples e autenticação;
 - mapa de pontos de troca ativos;
 - carteira com saldo de pontos;
 - tabela de conversão;
 - consulta de alimentos disponíveis;
 - histórico de entregas e resgates;
 - indicador de impacto individual.

 #### Interface do ponto de coleta

 - registro do usuário e da entrega;
 - pesagem por tipo de material;
 - cálculo automático dos pontos;
 - registro do resgate de alimentos;
 - atualização do estoque disponível.

 #### Painel administrativo

 - cadastro e gestão de pontos de troca;
 - configuração das taxas de conversão;
 - acompanhamento de estoque;
 - relatórios de impacto.

 ### Fora do MVP

 Pagamentos, delivery, gamificação e integração com carrinhos de supermercado ficam para uma etapa posterior apos equipe .

 ## Fluxo principal

 1. A família cria uma conta e consulta um ponto de troca.
 2. A família leva os materiais recicláveis até o ponto.
 3. O operador pesa e registra os materiais no sistema.
 4. O sistema converte o peso em pontos e atualiza o saldo da família.
 5. A família resgata frutas, legumes ou verduras disponíveis.
 6. O sistema registra a troca, atualiza o estoque e consolida o impacto.

 ## Parcerias estratégicas

 - **Cooperativas de catadores:** pesagem, classificação e recebimento dos materiais.
 - **Hortas, produtores locais, Armazem do campo no ultimo caso a CEASA:** fornecimento de alimentos, inclusive excedentes e produtos fora do padrão comercial.
 - **ONGs e prefeituras:** legitimidade, divulgação e apoio institucional.
 - **Empresas com agenda ESG:** financiamento e apoio à operação.

 ## Arquitetura inicial

 A arquitetura deve priorizar baixo custo e velocidade de validação:

 - **Cliente:** React Native ou PWA responsivo;
 - **Backend:** Node.js com Firebase ou Supabase;
 - **Painéis:** interfaces específicas para operadores e administradores, usando o mesmo backend;
 - **Pontuação:** saldo simples em banco de dados relacional, sem blockchain.

 As tecnologias definitivas devem ser escolhidas no Sprint 0, considerando experiência da equipe, custo e velocidade de entrega.

 ## Roadmap de sprints

 Os sprints têm duração sugerida de duas semanas. No Trello, cada sprint pode ser uma lista ou quadro com as colunas **A Fazer**, **Em progresso**, **Em revisão** e **Concluído**.

 ### Sprint 0 — Descoberta e validação

 - contatar uma cooperativa e uma horta, feira ou produtor para o piloto;
 - executar uma operação manual com planilha ou WhatsApp por uma ou duas semanas;
 - mapear as jornadas da família e do operador;
 - pesquisar stack, custos e referências de iniciativas semelhantes;
 - levantar regras básicas de segurança, privacidade e operação.

 **Entrega:** hipótese validada, parceiros potenciais e critérios do MVP.

 ### Sprint 1 — Definição e protótipo

 - criar wireframes do aplicativo e dos painéis;
 - definir a taxa de conversão com o parceiro piloto;
 - modelar usuários, pontos, materiais, pontos e estoque;
 - iniciar o projeto e o design system;
 - definir critérios de aceite das funcionalidades do MVP.

 **Entrega:** protótipo navegável, modelo de dados e backlog priorizado.

 ### Sprint 2 — Aplicativo da família

 - implementar cadastro e login;
 - criar a tela de saldo de pontos;
 - implementar a API de autenticação e saldo;
 - refinar as telas com testes com três a cinco usuários;
 - preparar a comunicação do piloto.

 **Entrega:** família autenticada consegue consultar seu saldo.

 ### Sprint 3 — Operação do ponto de troca

 - implementar o registro da entrega e da pesagem;
 - calcular pontos automaticamente;
 - implementar a baixa de estoque;
 - simplificar a experiência para operadores com pouca familiaridade digital;
 - treinar o operador do ponto piloto.

 **Entrega:** fluxo de entrega e crédito de pontos funcionando ponta a ponta.

 ### Sprint 4 — Painel administrativo e mapa

 - criar dashboard com materiais reciclados, famílias atendidas e alimentos distribuídos;
 - implementar o mapa de pontos de troca;
 - permitir o cadastro de pontos e taxas de conversão;
 - revisar gráficos e indicadores;
 - preparar o relatório de impacto.

 **Entrega:** operação administrável e métricas básicas disponíveis.

 ### Sprint 5 — Integração e testes

 - testar o fluxo completo entre família, operador e administrador;
 - corrigir bugs e realizar testes de carga básicos;
 - revisar acessibilidade e usabilidade;
 - alinhar a logística do lançamento piloto;
 - documentar o procedimento operacional.

 **Entrega:** versão candidata ao piloto real.

 ### Sprint 6 — Piloto real e aprendizado

 - operar com usuários reais em um ou dois pontos;
 - coletar feedback de famílias e operadores;
 - medir adesão, recorrência, materiais recebidos e alimentos distribuídos;
 - ajustar a taxa de conversão e o fluxo conforme os dados;
 - consolidar resultados para um pitch de expansão.

 **Entrega:** relatório do piloto e backlog da próxima versão.

 ## Como validar o modelo

 Antes de desenvolver todo o aplicativo, recomenda-se executar um piloto manual com uma cooperativa e uma horta ou produtor. Durante duas a quatro semanas, medir:

 - número de famílias participantes e recorrentes;
 - volume e tipos de materiais recebidos;
 - quantidade e tipos de alimentos distribuídos;
 - tempo de atendimento por troca;
 - divergências de pesagem e estoque;
 - aceitação da taxa de conversão.

 ## Riscos

 - **Oferta irregular:** alimentos sazonais e excedentes podem variar bastante.
 - **Fraude ou erro de pesagem:** exige procedimento padronizado e, quando possível, conferência.
 - **Dependência de financiamento:** a operação provavelmente precisará de parceiros, patrocínio ou verba pública.
 - **Privacidade:** coletar apenas os dados necessários e definir permissões por tipo de usuário.
 - **Adoção:** a experiência precisa ser simples para famílias e operadores com diferentes níveis de acesso digital.

 ## Organização da equipe

 Uma divisão inicial para quatro pessoas:

 1. **Produto e parcerias:** validação, requisitos, parceiros e piloto.
 2. **UX/UI:** pesquisa, protótipo, design system e testes de usabilidade.
 3. **Desenvolvimento do cliente:** aplicativo, mapa e interfaces.
 4. **Backend e dados:** API, autenticação, regras de pontuação, estoque e métricas.

 As responsabilidades podem ser compartilhadas durante integração, testes e operação do piloto.

 ## Sugestões de nome

 1. **MesaCheia** — destaca o resultado social da iniciativa.
 2. **Trocaverde** — comunica a troca e a reciclagem.
 3. **ColheCerto** — associa alimento, colheita e impacto positivo.
 4. **Boa Troca** — simples, acessível e comunitário.
 5. **PontoVerde** — aproxima o produto do conceito conhecido de ecoponto.

 > O nome definitivo deve passar por verificação de disponibilidade de domínio, redes sociais e registro de marca.
