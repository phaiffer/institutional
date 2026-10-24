# Revisão visual: profundidade e esqueleto

Sugestão recebida: "dar profundidade com variação de azul e branco, e um skeleton nos efeitos, porque ainda está com cara de IA."

## Achados

| Prioridade | Achado | Onde |
| --- | --- | --- |
| Alto | Tema escuro num plano só: fundo da página, cartões e seções suaves usavam quase o mesmo azul (`--white` e `--paper` a 2% um do outro), e o fundo da página era o mesmo token dos cartões. | `globals.css`, tokens do tema escuro e `body` |
| Alto | Nenhuma elevação: cartões, diagramas e a caixa de contato só tinham contorno, então destaque e lista tinham o mesmo peso. | `.arch`, `.feature-media`, `.ficha`, `.contact-box` |
| Médio | O fundo das seções suaves era bege (`#f7f6f2`), fora da família azul da marca. | `--paper` |
| Médio | Imagens carregadas sob demanda apareciam como retângulos vazios até chegar. | capturas de projetos, pôster dos vídeos e capturas das demonstrações |
| Médio | Os conectores dos diagramas não existiam até o desenho começar, e o mapa do hero surgia do nada. | `.arch-wires`, `.flow`, `.flow-step` |
| Baixo | Revelações ao rolar com deslocamento longo (22 a 40 px). | `[data-reveal]`, `.steps` |

O site não usa gradiente azul-roxo, brilho neon, fundo de partículas nem emojis, e os cartões já variam de forma (encaixe, linhas editoriais e degraus). Por isso, esses pontos ficaram como estavam.

## Escala de camadas

| Camada | Papel | Claro | Escuro |
| --- | --- | --- | --- |
| `--navy-deep` | cabeçalho, hero, rodapé | `#071d32` | `#071d32` |
| `--navy-surface` | seções navy, caixa de contato | `#0b2945` | `#06182a` |
| `--bg` | fundo da página | `#ffffff` | `#0d2236` |
| `--paper` | seções suaves, topo das páginas | `#f3f7fb` | `#102840` |
| `--white` | cartões, campos, diagramas | `#ffffff` | `#14304a` |
| `--surface-2` | mídia, selos, esqueleto | `#e9f0f6` | `#1a3854` |
| `--tint` | item selecionado, painéis de detalhe | `#ebf3fc` | `#183c5e` |

No claro, a elevação vem de sombras com o tom do navy (`--shadow-1` para cartões, `--shadow-2` para o destaque e a caixa de contato). No escuro, cada camada é um pouco mais clara que a de baixo, com sombra preta e um fio de luz no topo. Todos os pares de texto novos passam de 4,5:1 (o menor é `--muted` sobre `--tint` no escuro, com 5,56:1).

## Skeleton

O conteúdo vem pronto no HTML, e os números que contam já trazem o valor final. Por isso, um esqueleto só faz sentido onde existe espera de verdade: as imagens carregadas sob demanda. Elas recebem `.skeleton`, um fundo `--surface-2` no formato final com um brilho que passa três vezes e não aparece com movimento reduzido.

Nos efeitos, valeu a segunda leitura: a estrutura aparece desde o primeiro quadro.
- Os conectores dos diagramas têm um trilho fixo, e o traço azul se desenha por cima.
- O mapa do hero e seus conectores ficam visíveis; só os nós assentam no lugar.
- As revelações ao rolar ficaram mais curtas, com 12 a 16 px em 0,5 s.

## Mudanças

| Mudança | Esforço |
| --- | --- |
| Tokens `--bg`, escala de camadas e sombras nos dois temas | pequeno |
| Elevação em diagramas, fichas, destaque, vídeo, mapa e contato | pequeno |
| `.skeleton` nas imagens carregadas sob demanda | pequeno |
| Trilho fixo nos conectores dos diagramas | pequeno |
| Movimentos mais curtos; mapa do hero sem esmaecer por inteiro | pequeno |
| Cores soltas dos módulos das demonstrações trocadas por tokens | pequeno |
