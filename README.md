# PhaifferTech: site institucional

Site da PhaifferTech em Next.js, React e TypeScript, exportado como HTML estático (`out/`) e publicado no GitHub Pages em `phaiffertech.com.br`.

## Desenvolvimento

Requer Node.js 24 e npm.

```bash
npm ci
npm run dev
```

O `npm run dev` compila cada página na primeira visita, então é mais lento que o site publicado. Para ver o site como ele vai para o ar:

```bash
npm run build
cd out && python3 -m http.server 4199
```

Antes de publicar:

```bash
npm run lint
npm run typecheck
npm run build
npm test
```

`npm test` verifica o HTML exportado (links, âncoras, recursos, metadados e sitemap), por isso roda depois do build.

## Estrutura

- `src/app`: páginas (`/`, `/solucoes/`, `/projetos/`, `/como-trabalhamos/`, `/contato/` e `/demonstracoes/*`), layout e estilos globais.
- `src/components/layout`: cabeçalho, rodapé, casca das páginas e índice lateral.
- `src/components/sections`: seções da home, filtro de projetos e formulário de contato.
- `src/components/diagrams`: mapa do hero e diagramas de arquitetura das áreas de atuação.
- `src/components/interactive` e `src/components/motion`: abas, botão de copiar, contagem e revelação ao rolar.
- `src/data/site.ts`: conteúdo (áreas, situações, projetos, etapas, contato). `src/data/metadata.ts`: metadados das páginas.
- `public/brand`: logotipo, símbolo, banner e ícones. `public/CNAME`: domínio.
- `public/demos/*`: capturas, gráficos e registros usados pelas páginas de demonstração.
- `tests`: verificações do HTML exportado.

## Movimento

As animações acontecem uma vez (o mapa do hero percorre as etapas, os diagramas desenham os conectores, os números contam até o valor real, as seções aparecem ao rolar). Um script no `<head>` só as ativa quando o visitante não pediu movimento reduzido; sem JavaScript, todo o conteúdo fica visível.

## Publicação

O GitHub Pages usa o workflow `.github/workflows/pages.yml` (Settings, Pages, Build and deployment: **GitHub Actions**). Ele é acionado manualmente em **Actions, Publicar site no GitHub Pages, Run workflow**, instala as dependências, roda lint, TypeScript, build e testes e publica `out/`.

O build usa `output: "export"`, `trailingSlash: true` e imagens sem otimização de servidor; os caminhos partem da raiz do domínio, sem `basePath`.

## Demonstrações

Cada página em `/demonstracoes/` mostra um projeto com dados fictícios ou públicos e informa o estágio real dele. Os números vêm de arquivos copiados dos repositórios de origem para `public/demos/`:

- `data-platform`: captura, dois gráficos e o `manifest.json` de uma execução local; o teste confere os hashes dos gráficos com o manifesto.
- `nyc-tlc`: `showcase_results.json` e os SVGs do repositório `nyc-tlc-lakehouse`; a página calcula os totais a partir do JSON.
- `pet-platform` e `trichology`: capturas das aplicações com dados fictícios.

Ao atualizar uma demonstração, copie de novo os arquivos de origem e confira o commit citado na página.
