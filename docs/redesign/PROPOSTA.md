# PhaifferTech: evolução da identidade digital

Proposta de 23/10/2026. Cobre as Etapas 1 a 4 do briefing (auditoria, direção criativa, protótipo e avaliação) e o plano da Etapa 5. A aplicação Next.js não foi alterada; tudo o que está aqui fica em `docs/redesign/`.

## Como abrir o protótipo

O protótipo usa caminhos relativos para `public/` e para a fonte em `node_modules/`, então precisa ser servido a partir da raiz do repositório:

```
python3 -m http.server 4300
```

Depois abra `http://localhost:4300/docs/redesign/prototipo/index.html`.

Páginas: início, soluções, projetos, estudo de caso (NYC TLC), como trabalhamos e contato. É HTML, CSS e JavaScript puros (`assets/proto.css`, `assets/proto.js`), sem dependências novas.

---

## 1. Auditoria do site atual

### Pontos fortes (a preservar)

- **Conteúdo honesto e verificado.** Estágios declarados, dados fictícios identificados, números lidos do registro de cada execução, contribuição individual no EGC separada da empresa. É o maior ativo do site e a base do novo posicionamento.
- **Tokens de marca já derivados do Sistema de Identidade Visual** (`globals.css`): navy, azul, `--action` com contraste AA, raios inspirados no símbolo.
- **Demonstrações técnicas com profundidade real**: tabelas, gráficos, `run_id`, commits e limites escritos. Poucos sites de consultoria têm isso.
- **Base técnica sólida**: exportação estática, testes de saída (`tests/static-output.test.mjs`), metadados e sitemap por página, `DemoShell` comum.

### Problemas visuais

1. **O hero repete o padrão que o briefing quer evitar**: fundo escuro, painel com grade e caixas conectadas por linhas finas ("mapa de conexão"). Bem executado, mas lido como template de startup.
2. **Três diagramas de fluxo com a mesma ideia** (hero, "Conexões" e a nota de retorno): cinco etapas lineares com setas. A repetição dilui o conceito de conexão em vez de reforçá-lo.
3. **Pouca variação de hierarquia**: quase todas as seções seguem "rótulo + título grande à esquerda + nota à direita + grade". O olho não encontra pontos de ênfase.
4. **Grade de cards na vitrine**: cinco cards de mesmo peso; a melhor evidência (NYC TLC, com números reais) tem o mesmo destaque que um card sem imagem.
5. **A geometria do símbolo aparece pouco**: só na faixa decorativa do hero. O degrau arredondado, que é a ideia mais forte da marca, não orienta nenhum componente.

### Problemas de navegação

1. **Tudo é âncora da home**: Soluções, Especialidades, Conexões, Projetos e Como trabalhamos são seções, não páginas. Não há indicação de "onde estou", e a URL nunca muda.
2. **"Soluções" e "Especialidades" competem**: a primeira lista problemas, a segunda lista disciplinas, e a navegação trata as duas como destinos equivalentes.
3. **As demonstrações são becos**: a página de demo só volta para `/#projetos`; não há como ir de uma demonstração para a disciplina que ela comprova, nem para outra demonstração.
4. **O contato é só `mailto:`**: funciona, mas não orienta o que escrever nem dá retorno de que algo aconteceu.

### Componentes reutilizáveis

- `DemoShell`, `PetScreenshotGallery` (agora genérica, com tamanho por captura), os CSS modules das demos de dados (`.steps`, `.results`, `.table`, `.drift`, `.technical`).
- Os dados centralizados em `src/data/site.ts` (projetos, serviços, problemas, processo).
- Os testes de saída estática, que já cobrem links, recursos, canonical, `og:url` e sitemap.

### Inconsistências

- **Fundo**: a prancha oficial "03 / CONEXÃO" usa off-white quente; o site usa `#f5f7f9` (frio).
- **Logotipo**: só existe a versão clara (`logo-light.png`). Qualquer área clara com logotipo depende de uma versão escura que ainda não existe como arquivo.
- **Fonte**: Manrope está marcada como provisória desde a proposta V4, e a fonte oficial do logotipo não foi identificada.
- **Rótulos**: a prancha oficial usa o formato `03 / CONEXÃO`; o site usa `O QUE RESOLVEMOS`, sem índice.

### Oportunidades de diferenciação

- Transformar a honestidade técnica em linguagem: **"evidências, não promessas"**. Cada projeto com estágio, o que demonstra, onde conferir e limites.
- Usar o **par navy/azul do símbolo como semântica** (negócio e tecnologia), não só como paleta.
- Usar o **degrau arredondado** como forma de componente e de diagrama, não como enfeite.

### Limitações técnicas

- Exportação estática no GitHub Pages: sem servidor, sem redirecionamento HTTP, sem envio de formulário próprio.
- Toda interação precisa funcionar como componente de cliente sem quebrar o HTML gerado; o conteúdo deve existir no HTML mesmo sem JavaScript.
- Não há a versão escura do logotipo nem a fonte oficial como arquivos.

---

## 2. Direção criativa: "Encaixe"

O símbolo da PhaifferTech são duas peças, uma navy e uma azul, que se encaixam por um degrau arredondado, separadas por um canal estreito. A proposta é usar esse encaixe como **regra de construção** do site, em quatro decisões concretas.

### 2.1 Navy é o negócio, azul é a tecnologia

As duas cores do símbolo ganham significado e o mantêm em todo o site:

- No título do hero, só "tecnologia" é azul: *Conectamos **tecnologia** ao seu negócio*.
- Em "Pontos de atrito", cada situação é um par de peças encaixadas: a navy descreve **como o problema aparece na rotina**; a azul, **como abordamos**. É o símbolo usado como estrutura de conteúdo.
- Nos diagramas, componentes do lado do negócio (quem usa, fontes, consumo, contexto) têm contorno navy; componentes técnicos, contorno azul. Uma legenda explica isso uma única vez, na home.

### 2.2 Canto de encaixe

As peças do símbolo têm **um raio grande e três pequenos**. Isso vira o token `--r-encaixe: 4px 32px 4px 4px` (e o inverso), aplicado só a elementos que "conectam": botões, peças, imagens de destaque, nós de diagrama e o bloco de contato. Cards comuns e campos de formulário mantêm cantos discretos, para que a forma tenha peso quando aparece.

### 2.3 Uma gramática única de diagramas

Todos os diagramas seguem as mesmas regras: nós retangulares com canto de encaixe, conectores ortogonais com cotovelo arredondado (o mesmo raio do símbolo), alternância de altura que lembra o degrau e nenhum brilho, gradiente ou animação contínua. Selecionar um nó mostra a responsabilidade daquela parte. Na largura de celular, o mesmo diagrama empilha na vertical e o conector desce em degraus.

### 2.4 O degrau como progressão

A faixa em degrau do banner oficial aparece **uma vez**, no hero, como no banner. Fora dele, o degrau só representa progresso: as quatro etapas de "Como trabalhamos" sobem em degraus, e o marcador do índice lateral (trilho) dobra com o mesmo raio.

### Referências conceituais

Não há uma referência visual a copiar. A direção combina três linguagens:

- **Diagramas de arquitetura de engenharia**, como o modelo C4 e os diagramas de fluxo de dados: poucas formas, legenda explícita, cada caixa com uma responsabilidade.
- **Editorial técnico**: títulos fortes alinhados à esquerda, índices numerados, tabelas com números tabulares e notas de limite.
- **Sinalização**: a prancha "03 / CONEXÃO" já usa índice com barra e caixa alta espaçada. O protótipo adota esse formato para os rótulos de seção.

### Tipografia

- **Mantida a Manrope**, já instalada (`@fontsource/manrope`, latino). Ela tem geometria próxima do logotipo, pesos de 400 a 800 e bom desenho de números. Trocar de fonte agora seria uma decisão de tendência, não de identidade.
- **Hierarquia nova**: display 800 com tracking negativo forte (hero e títulos de página), H2 700, rótulos 600 em caixa alta espaçada no formato da prancha e monoespaçada só em índices (`01`, `02`).
- **Se a fonte oficial do logotipo for identificada**, ela entra só nos títulos de display, e a Manrope continua no texto.

### Cores

- **Paleta oficial preservada**: navy `#0b2945`, navy profundo `#071d32`, azul `#0879e3`, azul de ação `#096bc2` (contraste AA com branco) e azul claro `#67b8ff` sobre fundo escuro.
- **Uma mudança justificada**: o fundo claro passa de `#f5f7f9` para `#f7f6f2`, o off-white quente da prancha oficial. Isso aproxima o site do material da marca e separa as páginas do branco puro das superfícies, como cards, diagramas e tabelas.
- **Distribuição**: claro para leitura, que é a maior parte; navy para cabeçalho, rodapé, "Como trabalhamos" e as peças de negócio; azul só para ação, ênfase e tecnologia. Nenhum gradiente decorativo.

### Interatividade com função

| Interação | Onde | Para que serve |
|---|---|---|
| Situação → par de peças | Home, "Pontos de atrito" | O visitante se reconhece em um problema e vê a abordagem e a disciplina envolvidas |
| Abas de disciplina | Home, "Soluções" | Comparar as quatro áreas sem rolar quatro blocos iguais |
| Nó de diagrama → responsabilidade | Home, Soluções, estudo de caso | Entender o papel de cada parte de uma arquitetura |
| Filtro por categoria | Projetos | Separar produtos próprios, demonstrações e open source |
| Trilho de leitura | Soluções, estudo de caso | Orientação em páginas longas; vira barra rolável no celular |
| Formulário guiado | Contato | Orientar a primeira mensagem e dizer com clareza o que acontece ao enviar |
| Página atual no menu | Todas | Saber onde se está |

Todas são acessíveis por teclado: setas, Home e End nas abas, e Esc fecha o menu. Respeitam `prefers-reduced-motion` e mantêm o conteúdo no HTML.

---

## 3. Arquitetura de informação

```
Início
Soluções            (uma página, quatro seções com âncoras)
  #software  #dados  #arquitetura  #integracao
Projetos            (portfólio com filtro)
  Estudo de caso    (um por projeto com material suficiente)
  Páginas atuais de demonstração (/demonstracoes/...)
Como trabalhamos    (etapas, princípios e "Sobre")
Contato
```

**O que muda em relação à estrutura sugerida, e por quê:**

- **Soluções em uma página, não quatro.** Hoje cada disciplina tem conteúdo para uma seção sólida (quando faz sentido, o que entregamos, diagrama, onde ver), mas não para uma página própria. Quatro páginas finas seriam rotas para encher a navegação. As âncoras (`/solucoes/#dados`) permitem link direto. A divisão em subpáginas fica para quando cada disciplina tiver estudos de caso próprios.
- **"Sobre" dentro de "Como trabalhamos".** O conteúdo atual sobre a empresa tem dois parágrafos. Junto com o método e os princípios, forma uma página com propósito: como e por quem o trabalho é feito. Uma página "Sobre" separada só se justifica se houver mais conteúdo, como história, equipe ou dados cadastrais.
- **Projetos sem a categoria "Portfólio de clientes".** Não há trabalho de cliente autorizado para publicação. A página diz que reúne só o que pode ser mostrado publicamente, e a categoria entra quando houver material aprovado.
- **URLs das demonstrações mantidas.** `/demonstracoes/...` continua existindo; sem servidor no GitHub Pages, trocar de URL quebraria links já compartilhados. Os estudos de caso podem ficar em `/projetos/<slug>/` e apontar para as demonstrações.

---

## 4. Design system

### Fundamentos (tokens)

| Grupo | Tokens |
|---|---|
| Cor de marca | `--navy-deep #071d32`, `--navy #0b2945`, `--blue #0879e3`, `--action #096bc2`, `--blue-dark #075ea9`, `--blue-light #67b8ff` |
| Cor semântica | `--negocio` (navy), `--tecnologia` (azul), `--focus`, `--focus-on-dark` |
| Superfície | `--paper #f7f6f2`, `--surface #fff`, `--ink #0f2a42`, `--muted #4a5f70`, `--line`, `--line-strong`, `--on-dark`, `--line-dark` |
| Tipografia | display `clamp(44px, 7vw, 96px)` 800; H1 `clamp(40px, 5.4vw, 72px)` 800; H2 `clamp(30px, 3.6vw, 48px)` 700; H3 20 a 24 px 700; lead 17 a 20 px; corpo 16 px; pequeno 14 px; rótulo 12 px 600, `letter-spacing .22em` |
| Espaço | base 4: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128; `--gutter` de 16 a 40 px; `--section` de 72 a 136 px |
| Forma | `--r-sm 4px`, `--r-md 8px`, `--r-encaixe 4px 32px 4px 4px`, `--r-encaixe-inv 4px 4px 4px 32px` |
| Movimento | `--fast 140ms`, `--base 240ms`, `--ease cubic-bezier(.2,.7,.2,1)`; zerados com `prefers-reduced-motion` |
| Breakpoints | 520, 860 e 1080 px. Abaixo de 860, a navegação vira menu e as grades viram coluna única |

### Componentes

- **Cabeçalho**: navy profundo, logotipo claro, quatro destinos e o CTA "Contato" com canto de encaixe. A página atual tem uma barra azul com o canto do símbolo. No celular, botão de menu com `aria-expanded`, fechado por Esc.
- **Botões**: primário (azul de ação) e secundário (contorno), com altura mínima de 48 px e canto de encaixe. Links de texto sublinhados com 44 px de área de toque.
- **Rótulo de seção**: `01 / SOLUÇÕES`, no formato da prancha.
- **Par de peças (encaixe)**: navy e azul sobrepostas, com canal claro entre elas. Uso exclusivo: contraste entre situação e abordagem.
- **Diagrama**: lista ordenada de botões (`aria-pressed`), conectores em SVG desenhados por script e painel de detalhe com `aria-live`. Sem JavaScript, os nós aparecem como lista.
- **Abas**: padrão WAI-ARIA, horizontal (disciplinas) ou vertical (situações).
- **Linha de projeto**: índice, título com uma frase, tipo, tecnologias e seta. Substitui cards na home.
- **Ficha de projeto**: imagem, tipo, título, descrição e uma lista de definições (estágio, demonstra, tecnologias, evidência, limites).
- **Trilho**: índice lateral fixo com marcador em degrau; no celular, barra horizontal rolável.
- **Bloco de limites**: navy, com canto inverso. Todo estudo de caso termina com ele.
- **Formulário**: rótulos visíveis, dicas, erros por campo com `aria-invalid` e foco no primeiro erro, escolhas como botões de rádio estilizados.
- **Rodapé**: navy profundo, logotipo, navegação e contato.

### Padrões

- **Cada página tem uma ênfase**: o hero da home é tipográfico, o estudo de caso tem tabelas, o portfólio tem fichas. Não repetir a mesma composição em seções seguidas.
- **Cards só quando o conteúdo é um objeto** (projeto, ficha). Seções de texto usam colunas, listas e linhas divisórias.
- **Estados**: hover muda cor ou borda; foco sempre visível (3 px, azul ou azul claro sobre fundo escuro); selecionado usa preenchimento sólido.
- **Acessibilidade**: contraste AA, área de toque de 44 px, ordem de foco natural, `aria-live` nos detalhes que mudam e conteúdo disponível sem JavaScript.
- **Conteúdo**: todo número tem origem; todo projeto declara estágio e limites; nada de clientes, depoimentos ou métricas inventadas.

---

## 5. Comparativo

| | Site atual | Proposta |
|---|---|---|
| **Preservado** | | Paleta oficial e tokens, Manrope, slogan, textos de problemas, serviços, método e "Sobre", todas as demonstrações e suas URLs, regras de honestidade, exportação estática |
| **Alterado** | Hero escuro com mapa de conexão | Hero claro e tipográfico, com a faixa em degrau do banner oficial |
| | Navegação por âncoras na home | Páginas próprias com indicação da página atual |
| | Grade de 5 cards | Um projeto em destaque com números e uma lista editorial |
| | Especialidades em linhas iguais | Abas com diagrama interativo e "onde ver" |
| | Fundo frio `#f5f7f9` | Off-white quente da prancha oficial |
| | Rótulos sem índice | `01 / SEÇÃO`, como na prancha |
| **Removido** | Diagrama "Mapa de conexão" do hero e seção "Conexões" | Substituídos por "Pontos de atrito" e pelos diagramas por disciplina, que explicam conceitos reais em vez de repetir um fluxo genérico |
| **Adicionado** | | Semântica navy/azul, canto de encaixe, gramática de diagramas, página Soluções, portfólio com filtro e fichas, formato de estudo de caso, Como trabalhamos com "Você recebe", contato com formulário guiado |

---

## 6. Plano técnico (Etapa 5, depois da validação)

Evolução incremental no Next.js existente, com uma entrega revisável por fase:

1. **Fundamentos**: atualizar tokens em `globals.css` (paper, semânticos, raios de encaixe, escala tipográfica, movimento) e o componente de rótulo. Sem mudar layout ainda.
2. **Casca**: `Header` com links de página e `aria-current` via `usePathname`; `Footer` completo; um `PageShell` para as páginas internas, e o `DemoShell` passa a reaproveitá-lo.
3. **Componentes interativos** como client components pequenos, com conteúdo vindo de `site.ts`: `Tabs`, `ArchitectureDiagram` (conectores calculados com `ResizeObserver`), `EncaixePanel`, `ProjectFilter`, `Rail` e `ContactForm`. Nenhuma biblioteca nova; tudo é JavaScript simples, como no protótipo.
4. **Dados**: estender `site.ts` com as disciplinas (quando faz sentido, entregas, nós do diagrama, onde ver), as situações de "Pontos de atrito" e a ficha de cada projeto (estágio, demonstra, evidência, limites).
5. **Páginas**: `/solucoes/`, `/projetos/`, `/como-trabalhamos/` e `/contato/`, e depois a nova home. As rotas `/demonstracoes/*` continuam iguais.
6. **Estudos de caso**: começar pelo NYC TLC (`/projetos/lakehouse-nyc-tlc/`), lendo `showcase_results.json` como a página atual já faz.
7. **Testes**: ampliar `tests/static-output.test.mjs` para as novas rotas (canonical, sitemap, links internos, recursos) e transformar o roteiro de interação do protótipo em teste de navegador, se o responsável aprovar adicionar Playwright como dependência de desenvolvimento.
8. **Verificação**: lint, typecheck, build e testes, mais inspeção em 390, 768, 1024 e 1440 px antes de cada entrega.

**Riscos**: desenhar conectores depende de medir o layout. Sem JavaScript, os nós aparecem como lista ordenada, já que o conteúdo está no HTML. O cabeçalho escuro continua necessário enquanto não houver logotipo escuro.

---

## 7. Decisões pendentes do responsável

1. **Logotipo em versão escura** (navy e azul sobre fundo claro), como arquivo oficial. Sem ele, o cabeçalho segue navy.
2. **Fonte oficial do logotipo**, se existir. A proposta funciona com a Manrope.
3. **Textos de "Você recebe"** em Como trabalhamos: são propostas para validação, não compromissos já praticados.
4. **Mecanismo de contato**: o protótipo abre o programa de e-mail (`mailto:`) e diz isso claramente. Um envio pelo próprio site exigiria um serviço externo de formulários, que recebe os dados dos visitantes, e precisa de autorização.
5. **Dados cadastrais no rodapé** (razão social e CNPJ) como sinal de confiança, se desejado.
6. **Estudos de caso adicionais**: Trichology e Lakehouse Local têm material suficiente; o Pet depende do nome comercial; o EGC precisa de uma imagem aprovada.
7. **Fundo quente `#f7f6f2`** em vez do frio atual.

## 8. O que foi verificado no protótipo

- **Roteiro automatizado no Chromium** (Playwright já presente na máquina, sem instalação): 41 de 41 verificações passaram.
  - Nenhuma das seis páginas tem rolagem horizontal em 390, 768 e 1440 px, e o console não registrou erros.
  - Abas por clique e teclado, nós do diagrama e conectores, filtros e contagem, validação e montagem do e-mail, copiar, menu móvel com Esc e `prefers-reduced-motion` funcionaram.
- **Inspeção visual** de todas as páginas em 1440 e 390 px.
- **Não verificado**: leitores de tela reais, Safari e Firefox, e a abertura efetiva do programa de e-mail.
