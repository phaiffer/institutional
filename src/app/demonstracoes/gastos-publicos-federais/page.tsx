import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DemoShell } from "@/components/layout/DemoShell";
import { publicSpending, site } from "@/data/site";
import summary from "../../../../public/demos/public-spending/summary.json";
import styles from "../plataforma-de-dados/page.module.css";
import own from "./page.module.css";

const description = "Demonstração técnica local com todo o histórico de recebimentos de recursos do Governo Federal no Portal da Transparência: Parquet, dbt e DuckDB sobre mais de 120 milhões de linhas.";
const preview = { url: `${publicSpending.assets}/og.png`, width: 1200, height: 630, alt: "Painel local de recebimentos de recursos do Governo Federal, com indicadores e gráfico mensal" };
const portalUrl = "https://portaldatransparencia.gov.br/download-de-dados";

export const metadata: Metadata = {
  title: `${publicSpending.title} | PhaifferTech`,
  description,
  alternates: { canonical: publicSpending.href },
  openGraph: {
    type: "website", locale: "pt_BR", siteName: site.name,
    title: `${publicSpending.title} | Demonstração técnica`, description,
    url: `${site.url}${publicSpending.href}`, images: [preview],
  },
  twitter: { card: "summary_large_image", title: publicSpending.title, description, images: [preview.url] },
};

const steps = [
  { title: "Sincronização", detail: "Cada arquivo mensal publicado pelo Portal é baixado, conferido contra a contagem de linhas do próprio CSV e gravado como um Parquet por mês." },
  { title: "Modelagem com dbt", detail: "Uma view de staging, uma tabela intermediária e duas tabelas analíticas, reconstruídas mês a mês, com testes de dados a cada execução." },
  { title: "Painel local", detail: "Um painel em Streamlit lê as tabelas analíticas com conexões somente leitura, com filtros de período, órgão e tipo de favorecido." },
];

const monthNames = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const monthLabel = (value: string) => `${monthNames[Number(value.slice(5, 7)) - 1]} de ${value.slice(0, 4)}`;

export default function PublicSpendingDemo() {
  const number = new Intl.NumberFormat("pt-BR");
  const twoDecimals = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const oneDecimal = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  // Valores que arredondam para zero aparecem sem sinal (o líquido de 2013, só dezembro, é de cerca de R$ -4,7 milhões)
  const billions = (value: number) => oneDecimal.format(Math.abs(value) < 5e7 ? 0 : value / 1e9);
  const trillions = (value: number) => `R$ ${twoDecimals.format(value / 1e12)} tri`;
  const date = summary.synced_on.split("-").reverse().join("/");
  const ops = summary.treasury_operations;
  const units = summary.treasury_management_units;
  const fullYears = summary.years.filter(year => year.months === 12);
  const peak = Math.max(...summary.years.map(year => year.net_default_brl));
  const first = fullYears[0];
  const last = fullYears[fullYears.length - 1];
  const count = { "--count": summary.years.length } as CSSProperties;

  return (
    <DemoShell>
        <div className="demo-intro">
          <p className="eyebrow">ENGENHARIA DE DADOS · DEMONSTRAÇÃO TÉCNICA</p>
          <h1>{publicSpending.title}</h1>
          <p className="demo-lead">Todos os arquivos de Recebimentos de Recursos por Favorecido que o Portal da Transparência publica, de {monthLabel(summary.first_month)} a {monthLabel(summary.last_month)}, sincronizados, conferidos e modelados em um fluxo local. Os números desta página foram recontados nos próprios arquivos.</p>
          <aside className="demo-notice" aria-label="Escopo da demonstração">Demonstração técnica com dados públicos oficiais. Os números correspondem aos dados sincronizados em <time dateTime={summary.synced_on}>{date}</time>; {monthLabel(summary.open_month)} ainda estava em aberto. O painel roda localmente e não é hospedado. Os totais descrevem o que a fonte publica e não interpretam o orçamento.</aside>
          <div className="demo-actions">
            <a className="button button-primary" href={publicSpending.repository} target="_blank" rel="noopener noreferrer">Ver código e instruções <span aria-hidden="true">↗</span></a>
            <a className="button button-secondary" href={`${publicSpending.assets}/summary.json`}>Consultar os números em JSON <span aria-hidden="true">→</span></a>
          </div>
        </div>

        <section className={`demo-section ${styles.section}`} aria-labelledby="fluxo">
          <h2 id="fluxo">O caminho percorrido pelos dados.</h2>
          <ol className={styles.steps}>
            {steps.map((step, index) => <li key={step.title}><span className={styles.stepNumber}>0{index + 1}</span><h3>{step.title}</h3><p>{step.detail}</p></li>)}
          </ol>
          <figure className={styles.overview}>
            <a href={publicSpending.repository} target="_blank" rel="noopener noreferrer" aria-label="Abrir o repositório com as capturas originais do painel">
              <Image className="only-light skeleton" src={`${publicSpending.assets}/dashboard-light.webp`} width={1200} height={1157} alt="Painel local com total recebido, lançamentos, gráfico mensal e rankings por órgão superior e por tipo de favorecido" sizes="(max-width: 700px) 100vw, 1440px" loading="lazy" />
              <Image className="only-dark skeleton" src={`${publicSpending.assets}/dashboard-dark.webp`} width={1200} height={1157} alt="Painel local com total recebido, lançamentos, gráfico mensal e rankings por órgão superior e por tipo de favorecido, no tema escuro" sizes="(max-width: 700px) 100vw, 1440px" loading="lazy" />
            </a>
            <figcaption>Painel local nos últimos 13 meses, em captura publicada no repositório com dados de 22/10/2026. Nessa versão, as unidades gestoras do Tesouro ainda entravam no total padrão; hoje elas ficam de fora, como as operações de caixa. O painel acompanha o tema claro ou escuro de quem o abre.</figcaption>
          </figure>
        </section>

        <section className={`demo-section ${styles.section}`} aria-labelledby="resultados">
          <p className="eyebrow">DADOS SINCRONIZADOS · {date}</p>
          <h2 id="resultados">O histórico completo, recontado.</h2>
          <dl className={styles.results}>
            <div><dt>Linhas da fonte</dt><dd>{number.format(summary.rows)}<small>{summary.months} arquivos mensais em Parquet</small></dd></div>
            <div><dt>Total líquido sem fluxos internos do Tesouro</dt><dd>{trillions(summary.net_default_brl)}<small>o total padrão do painel</small></dd></div>
            <div><dt>Favorecidos distintos</dt><dd>{number.format(summary.distinct_beneficiary_ids)}<small>empresas, pessoas, órgãos e códigos</small></dd></div>
          </dl>

          <div className={styles.drift}>
            <h3>Por que existem dois totais</h3>
            <p>Somando tudo o que o Portal publica, o líquido é de {trillions(summary.net_all_brl)}. Parte desse dinheiro não sai do Tesouro: {ops.codes} códigos de operações de caixa, como serviço da dívida e emissão de títulos, somam {number.format(ops.rows)} linhas e {trillions(ops.net_brl)}, e {units.units} unidades gestoras do próprio Tesouro somam {number.format(units.rows)} linhas e {trillions(units.net_brl)}. O fluxo classifica esses códigos a partir de listas revisadas e os deixa fora do total padrão, que chega a {trillions(summary.net_default_brl)}.</p>
          </div>

          <figure className={`${styles.overview} ${own.chart}`}>
            <figcaption className={own.title}><strong>Total líquido por ano, sem fluxos internos do Tesouro</strong> · em R$ trilhões</figcaption>
            <ol className={own.years} style={count} aria-label="Total líquido por ano">
              {summary.years.map(year => <li key={year.year} className={year.months < 12 ? own.partial : undefined}>
                <span className={own.bar} style={{ "--h": `${(Math.max(year.net_default_brl, 0) / peak) * 100}%` } as CSSProperties}><span className={own.value}>{twoDecimals.format(Math.max(year.net_default_brl, 0) / 1e12)}</span></span>
                <span className="visually-hidden">{year.year}{year.months < 12 ? `, ${year.months} ${year.months === 1 ? "mês" : "meses"}` : ""}</span>
              </li>)}
            </ol>
            <ol className={own.labels} style={count} aria-hidden="true">
              {summary.years.map(year => <li key={year.year}><span className={own.full}>{year.year}</span><span className={own.short}>{String(year.year).slice(2)}</span></li>)}
            </ol>
            <p className={own.legend}>Barras mais claras: {summary.years[0].year} tem só dezembro e {summary.years[summary.years.length - 1].year} vai até o mês em aberto. Entre os anos completos, o total passou de {trillions(first.net_default_brl)} em {first.year} para {trillions(last.net_default_brl)} em {last.year}.</p>
          </figure>

          <div className={`${styles.tableWrap} ${own.spaced}`}>
            <table className={styles.table}>
              <caption>Linhas e totais por ano</caption>
              <thead><tr><th scope="col">Ano</th><th scope="col">Meses</th><th scope="col">Linhas</th><th scope="col">Líquido sem Tesouro (R$ bi)</th><th scope="col">Líquido total (R$ bi)</th><th scope="col">Linhas negativas</th></tr></thead>
              <tbody>
                {summary.years.map(year => <tr key={year.year}><th scope="row">{year.year}</th><td>{year.months}</td><td>{number.format(year.rows)}</td><td>{billions(year.net_default_brl)}</td><td>{billions(year.net_all_brl)}</td><td>{number.format(year.negative_rows)}</td></tr>)}
              </tbody>
            </table>
          </div>
          <p className={styles.note}>Valores negativos são estornos e devoluções publicados pela própria fonte: {number.format(summary.negative_rows)} linhas no histórico, presentes em todos os anos. Mesmo sem os fluxos internos do Tesouro, os totais ainda incluem transferências entre outras unidades do governo federal.</p>

          <details className={styles.technical}>
            <summary>Consultar como os números foram conferidos</summary>
            <dl>
              <div><dt>Fonte</dt><dd>{summary.source}</dd></div>
              <div><dt>Período</dt><dd>{monthLabel(summary.first_month)} a {monthLabel(summary.last_month)} ({summary.months} meses)</dd></div>
              <div><dt>Sincronização</dt><dd><time dateTime={summary.synced_on}>{date}</time></dd></div>
              <div><dt>Conferência</dt><dd>{summary.checked_with}</dd></div>
              <div><dt>Commit</dt><dd><code>{summary.repository_commit}</code></dd></div>
            </dl>
            <p>O repositório registra o <code>dbt build</code> completo sobre o histórico, com 75 nós (modelos, seeds e testes de dados) aprovados. A CI do GitHub executa lint, testes e um <code>dbt build</code> sobre uma amostra sintética de 20 linhas em Python 3.11, 3.12 e 3.13.</p>
            <div className={styles.sourceLinks}>
              <a href={`${publicSpending.assets}/summary.json`}>Abrir números em JSON <span aria-hidden="true">→</span></a>
              <a href={`${publicSpending.repository}/actions`} target="_blank" rel="noopener noreferrer">Ver a CI <span aria-hidden="true">↗</span></a>
            </div>
          </details>
        </section>

        <section className={`demo-section ${styles.section}`} aria-labelledby="fontes">
          <h2 id="fontes">Uma demonstração que pode ser examinada.</h2>
          <p>O repositório documenta a sincronização, o staging, os modelos dbt, os testes, o painel e as decisões sobre valores negativos, códigos do Tesouro e identificação de favorecidos, com licença MIT.</p>
          <p>Dados publicados pela Controladoria-Geral da União no <a href={portalUrl} target="_blank" rel="noopener noreferrer">Portal da Transparência</a>. Transformações, painel e textos em português foram elaborados neste projeto.</p>
          <div className={styles.sourceLinks}>
            <a href={publicSpending.repository} target="_blank" rel="noopener noreferrer">Repositório e instruções <span aria-hidden="true">↗</span></a>
            <a href={portalUrl} target="_blank" rel="noopener noreferrer">Dados do Portal da Transparência <span aria-hidden="true">↗</span></a>
            <Link href="/#contato">Conversar sobre uma solução de dados <span aria-hidden="true">→</span></Link>
          </div>
        </section>
    </DemoShell>
  );
}
