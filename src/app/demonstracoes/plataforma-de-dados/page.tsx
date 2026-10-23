import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DemoShell } from "@/components/layout/DemoShell";
import { dataPlatform, site } from "@/data/site";
import evidence from "../../../../public/demos/data-platform/manifest.json";
import styles from "./page.module.css";

const description = "Demonstração técnica local de um lakehouse com dados públicos históricos, Parquet, dbt, DuckDB e verificações de qualidade.";
const preview = { url: `${dataPlatform.assets}/overview.png`, width: 1440, height: 1025, alt: "Showcase local da plataforma de dados da PhaifferTech" };

export const metadata: Metadata = {
  title: `${dataPlatform.title} | PhaifferTech`,
  description,
  alternates: { canonical: dataPlatform.href },
  openGraph: {
    type: "website", locale: "pt_BR", siteName: site.name,
    title: `${dataPlatform.title} | Demonstração técnica`, description,
    url: `${site.url}${dataPlatform.href}`, images: [preview],
  },
  twitter: { card: "summary_large_image", title: dataPlatform.title, description, images: [preview.url] },
};

const steps = [
  { title: "Fonte pública → Bronze", detail: "Dois CSVs da FiveThirtyEight são lidos e registrados em Parquet, com metadados da ingestão." },
  { title: "Silver → Gold", detail: "Limpeza e padronização preparam os dados para seis modelos dbt no DuckDB, incluindo tabelas analíticas." },
  { title: "Verificação e leitura", detail: "Após a geração do Gold, testes dbt e regras Great Expectations registram a qualidade observada nesta amostra." },
];

const charts = [
  {
    file: "bechdel_pass_rate_by_year.png", width: 936, height: 473,
    title: "Uma leitura dos dados históricos",
    alt: "Proporção anual de filmes da amostra que passam no teste de Bechdel, entre 1970 e 2013, e média móvel de cinco anos",
    caption: "Proporção por ano de lançamento nos filmes do conjunto Bechdel da FiveThirtyEight. O gráfico descreve a amostra histórica e inclui uma média móvel de cinco anos.",
  },
  {
    file: "quality_checks.png", width: 974, height: 494,
    title: "Verificações de qualidade",
    alt: "Sete regras Great Expectations: uma de valores permitidos, uma de tipo, quatro de ausência de nulos e uma de contagem, sem violações observadas",
    caption: "Sete regras Great Expectations verificadas na execução local: valores permitidos, tipo, ausência de nulos e contagem de linhas. Nenhuma violação foi observada nesta amostra.",
  },
];

export default function DataPlatformDemo() {
  const date = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC", day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(evidence.generated_at_utc));
  const number = new Intl.NumberFormat("pt-BR");

  return (
    <DemoShell>
        <div className="demo-intro">
          <p className="eyebrow">ENGENHARIA DE DADOS · DEMONSTRAÇÃO TÉCNICA</p>
          <h1>{dataPlatform.title}</h1>
          <p className="demo-lead">Da fonte pública à tabela analítica: um fluxo local de ingestão, transformação e verificação, com resultados que podem ser consultados no registro da execução.</p>
          <aside className="demo-notice" aria-label="Escopo da demonstração">Demonstração técnica com dados públicos históricos sobre cursos universitários e filmes. Os números correspondem à execução local de <time dateTime={evidence.generated_at_utc}>{date}</time>; não representam resultados de clientes ou operação em produção.</aside>
          <div className="demo-actions">
            <a className="button button-primary" href={dataPlatform.repository} target="_blank" rel="noopener noreferrer">Ver código e instruções <span aria-hidden="true">↗</span></a>
            <a className="button button-secondary" href={`${dataPlatform.assets}/manifest.json`}>Consultar registro da execução <span aria-hidden="true">→</span></a>
          </div>
        </div>

        <section className={`demo-section ${styles.section}`}aria-labelledby="fluxo">
          <p className="eyebrow">DA INGESTÃO À CONSULTA</p>
          <h2 id="fluxo">O caminho percorrido pelos dados.</h2>
          <ol className={styles.steps}>
            {steps.map((step, index) => <li key={step.title}><span className={styles.stepNumber}>0{index + 1}</span><h3>{step.title}</h3><p>{step.detail}</p></li>)}
          </ol>
          <figure className={styles.overview}>
            <a href={`${dataPlatform.assets}/overview.png`} aria-label="Abrir a captura do showcase em tamanho original">
              <Image src={preview.url} width={preview.width} height={preview.height} alt={preview.alt} sizes="(max-width: 700px) 100vw, 1240px" />
            </a>
            <figcaption>Captura do visualizador local com a sequência implementada e os resultados da amostra de {date}. <a href={`${dataPlatform.assets}/overview.png`}>Abrir imagem original <span aria-hidden="true">↗</span></a></figcaption>
          </figure>
        </section>

        <section className={`demo-section ${styles.section}`}aria-labelledby="resultados">
          <p className="eyebrow">EXECUÇÃO REGISTRADA · {date}</p>
          <h2 id="resultados">Resultados desta amostra.</h2>
          <dl className={styles.results}>
            <div><dt>Testes dbt aprovados</dt><dd>{evidence.dbt_tests.passed}/{evidence.dbt_tests.total}</dd></div>
            <div><dt>Regras Great Expectations</dt><dd>{evidence.great_expectations.rules_checked}<small>{evidence.great_expectations.violations} violações observadas</small></dd></div>
            <div><dt>Conjuntos públicos</dt><dd>{evidence.input_datasets.length}<small>FiveThirtyEight</small></dd></div>
          </dl>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <caption>Contagens por camada nesta execução local</caption>
              <thead><tr><th scope="col">Camada</th><th scope="col">Linhas</th><th scope="col">Conteúdo</th></tr></thead>
              <tbody>
                <tr><th scope="row">Bronze</th><td>{number.format(evidence.row_counts.bronze)}</td><td>Registros ingeridos em Parquet</td></tr>
                <tr><th scope="row">Silver</th><td>{number.format(evidence.row_counts.silver)}</td><td>Registros tratados e padronizados</td></tr>
                <tr><th scope="row">Gold</th><td>{number.format(evidence.row_counts.gold)}</td><td>Tabelas com agregações e granularidades diferentes</td></tr>
              </tbody>
            </table>
          </div>
          <p className={styles.note}>As camadas têm granularidades diferentes: a contagem Gold não indica perda de registros. Os testes descrevem as regras verificadas nesta execução e não constituem uma medida geral de qualidade dos dados.</p>
          <div className={styles.charts}>
            {charts.map(chart => <figure key={chart.file} className={styles.chart}>
              <h3>{chart.title}</h3>
              <a href={`${dataPlatform.assets}/${chart.file}`} aria-label={`Ampliar gráfico: ${chart.title}`}><Image src={`${dataPlatform.assets}/${chart.file}`} width={chart.width} height={chart.height} alt={chart.alt} sizes="(max-width: 700px) 100vw, 600px" /></a>
              <figcaption>{chart.caption} <a href={`${dataPlatform.assets}/${chart.file}`}>Ampliar gráfico <span aria-hidden="true">↗</span></a></figcaption>
            </figure>)}
          </div>
          <details className={styles.technical}>
            <summary>Consultar os detalhes da execução</summary>
            <dl><div><dt>Identificador</dt><dd><code>{evidence.run_id}</code></dd></div><div><dt>Registro UTC</dt><dd><time dateTime={evidence.generated_at_utc}>{evidence.generated_at_utc}</time></dd></div><div><dt>Commit base</dt><dd><code>{evidence.git_sha}</code></dd></div></dl>
            <p>O SHA identifica o commit base. Os ajustes do showcase ainda estavam sem commit quando este registro foi gerado. O manifesto contém os conjuntos de entrada, contagens, resultados e hashes SHA-256 dos dois gráficos.</p>
            <a href={`${dataPlatform.assets}/manifest.json`}>Abrir manifesto JSON <span aria-hidden="true">→</span></a>
          </details>
        </section>

        <section className={`demo-section ${styles.section}`}aria-labelledby="fontes">
          <p className="eyebrow">CÓDIGO E FONTES</p>
          <h2 id="fontes">Uma demonstração que pode ser examinada.</h2>
          <p>O repositório documenta o fluxo local com Python 3.11, Papermill, Parquet, dbt, DuckDB e Great Expectations. Esta apresentação usa os artefatos da execução local registrada.</p>
          <p>Dados publicados pela FiveThirtyEight, nos conjuntos <a href="https://github.com/fivethirtyeight/data/tree/master/college-majors" target="_blank" rel="noopener noreferrer">College Majors</a> e <a href="https://github.com/fivethirtyeight/data/tree/master/bechdel" target="_blank" rel="noopener noreferrer">Bechdel</a>, sob <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>, salvo indicação específica da fonte. As transformações e os gráficos em português foram elaborados neste projeto.</p>
          <div className={styles.sourceLinks}>
            <a href={dataPlatform.repository} target="_blank" rel="noopener noreferrer">Repositório e instruções <span aria-hidden="true">↗</span></a>
            <a href="https://github.com/fivethirtyeight/data" target="_blank" rel="noopener noreferrer">Dados FiveThirtyEight <span aria-hidden="true">↗</span></a>
            <Link href="/#contato">Conversar sobre uma solução de dados <span aria-hidden="true">→</span></Link>
          </div>
        </section>
    </DemoShell>
  );
}
