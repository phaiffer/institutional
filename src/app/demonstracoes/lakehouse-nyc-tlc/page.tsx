import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DemoShell } from "@/components/layout/DemoShell";
import { nycLakehouse, site } from "@/data/site";
import evidence from "../../../../public/demos/nyc-tlc/showcase_results.json";
import styles from "../plataforma-de-dados/page.module.css";

const description = "Demonstração técnica local de um lakehouse com Spark e Delta Lake sobre viagens públicas de táxi de Nova York, com contratos, qualidade e drift.";
const preview = { url: `${nycLakehouse.assets}/og.png`, width: 1200, height: 574, alt: "Viagens diárias por fornecedor em janeiro e fevereiro de 2024, calculadas a partir da camada Gold" };
const sourceCommit = "300c16c";

export const metadata: Metadata = {
  title: `${nycLakehouse.title} | PhaifferTech`,
  description,
  alternates: { canonical: nycLakehouse.href },
  openGraph: {
    type: "website", locale: "pt_BR", siteName: site.name,
    title: `${nycLakehouse.title} | Demonstração técnica`, description,
    url: `${site.url}${nycLakehouse.href}`, images: [preview],
  },
  twitter: { card: "summary_large_image", title: nycLakehouse.title, description, images: [preview.url] },
};

const steps = [
  { title: "Bronze", detail: "O arquivo mensal da TLC é normalizado e gravado em Delta, já restrito à janela do mês processado." },
  { title: "Silver", detail: "Limpeza, deduplicação e contrato versionado. Cada linha removida é atribuída à primeira regra que a rejeitou." },
  { title: "Gold e controles", detail: "Agregação por dia e fornecedor, seis regras de qualidade e comparação de perfis mensais para detectar drift." },
];

const removalLabels: Record<string, string> = {
  non_positive_duration: "Duração não positiva",
  negative_or_null_fare: "Tarifa negativa ou ausente",
  duplicate_trip_id: "Viagem duplicada",
};

const monthNames: Record<string, string> = { "2024-01": "Janeiro/2024", "2024-02": "Fevereiro/2024" };

export default function NycLakehouseDemo() {
  const number = new Intl.NumberFormat("pt-BR");
  const percent = new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 1 });
  const date = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC", day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(evidence.generated_at_utc));
  const runs = evidence.runs;
  const removed = (run: (typeof runs)[number]) => Object.values(run.removed_by_rule).reduce((sum, value) => sum + value, 0);
  const removedBy = (run: (typeof runs)[number], rule: string) => run.removed_by_rule[rule as keyof typeof run.removed_by_rule];
  const cleanTrips = runs.reduce((sum, run) => sum + run.silver_rows, 0);
  const removedRows = runs.reduce((sum, run) => sum + removed(run), 0);
  const rulesChecked = runs.reduce((sum, run) => sum + run.quality_rules.length, 0);
  const rulesFailed = runs.reduce((sum, run) => sum + run.quality_rules.filter(rule => !rule.passed).length, 0);
  const otherRules = Object.keys(runs[0].removed_by_rule).filter(rule => !(rule in removalLabels));
  const drift = runs[1].drift_events.find(event => event.severity === "warn" && event.delta_ratio !== null);
  const vendor6 = evidence.gold_vendor_summary.filter(row => row.vendor_id === "6");
  const vendor6Trips = vendor6.reduce((sum, row) => sum + row.trips, 0);
  const vendor6Days = vendor6.find(row => row.month === runs[0].month)?.days ?? 0;

  return (
    <DemoShell>
        <div className="demo-intro">
          <p className="eyebrow">ENGENHARIA DE DADOS · DEMONSTRAÇÃO TÉCNICA</p>
          <h1>{nycLakehouse.title}</h1>
          <p className="demo-lead">Dois meses de viagens de táxi de Nova York processados localmente em camadas, com contratos, regras de qualidade e monitoramento de drift. Cada linha removida tem uma regra que explica por quê.</p>
          <aside className="demo-notice" aria-label="Escopo da demonstração">Demonstração técnica com dados públicos da NYC Taxi &amp; Limousine Commission (táxis yellow, janeiro e fevereiro de 2024). Os números correspondem à execução local registrada em <time dateTime={evidence.generated_at_utc}>{date}</time>; não representam resultados de clientes, operação em produção ou escala distribuída.</aside>
          <div className="demo-actions">
            <a className="button button-primary" href={nycLakehouse.repository} target="_blank" rel="noopener noreferrer">Ver código e instruções <span aria-hidden="true">↗</span></a>
            <a className="button button-secondary" href={`${nycLakehouse.assets}/showcase_results.json`}>Consultar registro da execução <span aria-hidden="true">→</span></a>
          </div>
        </div>

        <section className={`demo-section ${styles.section}`} aria-labelledby="fluxo">
          <h2 id="fluxo">O caminho percorrido pelos dados.</h2>
          <ol className={styles.steps}>
            {steps.map((step, index) => <li key={step.title}><span className={styles.stepNumber}>0{index + 1}</span><h3>{step.title}</h3><p>{step.detail}</p></li>)}
          </ol>
          <figure className={styles.overview}>
            <a href={`${nycLakehouse.assets}/architecture.svg`} aria-label="Abrir o diagrama de arquitetura em tamanho original">
              <Image src={`${nycLakehouse.assets}/architecture.svg`} width={1008} height={432} alt="Arquitetura local: arquivo público da TLC, camadas Bronze, Silver e Gold, rastreabilidade, qualidade e drift, e exportação para BI" sizes="(max-width: 700px) 100vw, 1240px" />
            </a>
            <figcaption>Arquitetura local com Spark, Delta Lake e catálogo Hive embarcado. A camada dbt do repositório é opcional e não foi executada nesta validação. <a href={`${nycLakehouse.assets}/architecture.svg`}>Abrir diagrama <span aria-hidden="true">↗</span></a></figcaption>
          </figure>
        </section>

        <section className={`demo-section ${styles.section}`} aria-labelledby="resultados">
          <p className="eyebrow">EXECUÇÃO REGISTRADA · {date}</p>
          <h2 id="resultados">Resultados destes dois meses.</h2>
          <dl className={styles.results}>
            <div><dt>Viagens limpas</dt><dd>{number.format(cleanTrips)}<small>Silver, janeiro e fevereiro</small></dd></div>
            <div><dt>Linhas removidas com motivo</dt><dd>{number.format(removedRows)}<small>soma fecha com Bronze − Silver</small></dd></div>
            <div><dt>Regras de qualidade</dt><dd>{rulesChecked}<small>{rulesFailed} falhas em {runs.length} execuções</small></dd></div>
          </dl>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <caption>Contagens por camada e remoções por regra</caption>
              <thead><tr><th scope="col">Medida</th>{runs.map(run => <th scope="col" key={run.month}>{monthNames[run.month] ?? run.month}</th>)}</tr></thead>
              <tbody>
                <tr><th scope="row">Bronze · linhas na janela</th>{runs.map(run => <td key={run.month}>{number.format(run.bronze_rows)}</td>)}</tr>
                <tr><th scope="row">Silver · viagens limpas</th>{runs.map(run => <td key={run.month}>{number.format(run.silver_rows)}</td>)}</tr>
                <tr><th scope="row">Gold · linhas dia × fornecedor</th>{runs.map(run => <td key={run.month}>{number.format(run.gold_rows)}</td>)}</tr>
                {Object.entries(removalLabels).map(([rule, label]) => <tr key={rule}><th scope="row">Removidas · {label.toLowerCase()}</th>{runs.map(run => <td key={run.month}>{number.format(removedBy(run, rule))}</td>)}</tr>)}
                <tr><th scope="row">Removidas · outras {otherRules.length} regras</th>{runs.map(run => <td key={run.month}>{number.format(otherRules.reduce((sum, rule) => sum + removedBy(run, rule), 0))}</td>)}</tr>
              </tbody>
            </table>
          </div>
          <p className={styles.note}>A Gold tem uma linha por dia e fornecedor, por isso sua contagem não indica perda de viagens. As remoções são contadas na primeira regra que rejeita cada linha; não são contagens independentes de todos os problemas da origem.</p>
          <figure className={`${styles.overview} ${styles.wideChart}`}>
            <a href={`${nycLakehouse.assets}/trips_daily.svg`} aria-label="Ampliar gráfico: viagens por dia e fornecedor"><Image src={`${nycLakehouse.assets}/trips_daily.svg`} width={1008} height={482} alt="Viagens diárias dos fornecedores 1 e 2 entre janeiro e fevereiro de 2024; o fornecedor 2 concentra a maior parte das viagens" sizes="(max-width: 700px) 100vw, 1240px" /></a>
            <figcaption>Calculado a partir da camada Gold. O fornecedor 6 teve {number.format(vendor6Trips)} viagens no período e foi omitido da série para preservar a escala. <a href={`${nycLakehouse.assets}/trips_daily.svg`}>Ampliar gráfico <span aria-hidden="true">↗</span></a> · <a href={`${nycLakehouse.assets}/execution_summary.svg`}>Quadro completo da execução <span aria-hidden="true">↗</span></a></figcaption>
          </figure>
          {drift && <div className={styles.drift}>
            <h3>Um alerta de drift que faz sentido</h3>
            <p>Janeiro criou a linha de base. Em fevereiro, o volume da Gold passou de {number.format(Number(drift.baseline_value))} para {number.format(Number(drift.observed_value))} linhas, uma variação de {percent.format(drift.delta_ratio ?? 0)}, acima do limite de alerta de 20%. A causa está nos próprios dados: fevereiro tem 29 dias, e o fornecedor 6, presente em {vendor6Days} dias de janeiro, não aparece em fevereiro. O total de viagens limpas, na verdade, subiu de {number.format(runs[0].silver_rows)} para {number.format(runs[1].silver_rows)}.</p>
          </div>}
          <details className={styles.technical}>
            <summary>Consultar os detalhes da execução</summary>
            <dl>
              {runs.map(run => <div key={run.month}><dt>{monthNames[run.month] ?? run.month}</dt><dd><code>{run.run_id}</code><br />{run.source_file} · SHA-256 <code>{run.source_sha256.slice(0, 16)}…</code></dd></div>)}
              <div><dt>Registro UTC</dt><dd><time dateTime={evidence.generated_at_utc}>{evidence.generated_at_utc}</time></dd></div>
              <div><dt>Commit</dt><dd><code>{sourceCommit}</code></dd></div>
              <div><dt>Versões</dt><dd>PySpark {evidence.versions.pyspark} · Delta Lake {evidence.versions["delta-spark"]}</dd></div>
            </dl>
            <p>O modo padrão do gate registra falhas sem interromper a execução; validação de esquema e contratos continua ativa. O registro JSON traz comandos, regras, perfis de drift e a Gold agregada usada no gráfico.</p>
            <div className={styles.sourceLinks}>
              <a href={`${nycLakehouse.assets}/showcase_results.json`}>Abrir registro JSON <span aria-hidden="true">→</span></a>
              <a href={`${nycLakehouse.assets}/execution_summary.svg`}>Abrir quadro de contagens e controles <span aria-hidden="true">↗</span></a>
            </div>
          </details>
        </section>

        <section className={`demo-section ${styles.section}`} aria-labelledby="fontes">
          <h2 id="fontes">Uma demonstração que pode ser examinada.</h2>
          <p>O repositório documenta a execução local com Python 3.12, Java 21, PySpark e Delta Lake, além dos comandos usados para reproduzir os dois meses e regenerar as imagens.</p>
          <p>Dados de viagens publicados pela <a href="https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page" target="_blank" rel="noopener noreferrer">NYC Taxi &amp; Limousine Commission</a>. Transformações, gráficos e textos em português foram elaborados neste projeto.</p>
          <div className={styles.sourceLinks}>
            <a href={nycLakehouse.repository} target="_blank" rel="noopener noreferrer">Repositório e instruções <span aria-hidden="true">↗</span></a>
            <a href="https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page" target="_blank" rel="noopener noreferrer">Dados da TLC <span aria-hidden="true">↗</span></a>
            <Link href="/#contato">Conversar sobre uma solução de dados <span aria-hidden="true">→</span></Link>
          </div>
        </section>
    </DemoShell>
  );
}
