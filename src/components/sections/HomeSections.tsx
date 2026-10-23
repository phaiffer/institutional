import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { contactHref, disciplines, frictions, portfolio, process, site } from "@/data/site";
import { BusinessFlow } from "@/components/diagrams/BusinessFlow";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { Tabs } from "@/components/interactive/Tabs";
import { CopyButton } from "@/components/interactive/CopyButton";
import { CountUp } from "@/components/motion/CountUp";
import evidence from "../../../public/demos/nyc-tlc/showcase_results.json";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

function SectionHeading({ label, title, note, id }: { label: string; title: string; note?: string; id: string }) {
  return <div className="section-heading" data-reveal><div><p className="eyebrow">{label}</p><h2 id={id}>{title}</h2></div>{note && <p className="heading-note">{note}</p>}</div>;
}

// Faixa decorativa no traço do banner oficial: um degrau com curvas arredondadas que se desenha ao abrir.
function BrandBand() {
  return <svg className="hero-band" viewBox="0 0 620 440" aria-hidden="true" focusable="false"><path d="M60 -60 V40 Q60 120 140 120 H330 Q410 120 410 200 V260 Q410 340 490 340 H700" pathLength={1} fill="none" stroke="currentColor" strokeWidth="110" strokeLinejoin="round" /></svg>;
}

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title"><BrandBand /><div className="container hero-grid">
    <div className="hero-copy">
      <p className="hero-kicker"><span className="kicker-line" /> CONSULTORIA EM SOFTWARE E DADOS</p>
      <h1 id="hero-title">Conectamos tecnologia <span>ao seu negócio.</span></h1>
      <p className="hero-lead">Quando sistemas não se comunicam, a equipe perde tempo conciliando informações. Projetamos software, integrações e fluxos de dados para resolver esse tipo de problema.</p>
      <div className="hero-actions"><Link className="button button-primary" href={contactHref}>Conversar sobre um projeto</Link><Link className="button button-outline" href="/solucoes/">Conhecer nossas soluções</Link></div>
      <ul className="hero-index" aria-label="Áreas de atuação">{disciplines.map(item => <li key={item.id}><Link href={`/solucoes/#${item.id}`}>{item.title}</Link></li>)}</ul>
    </div>
    <BusinessFlow />
  </div></section>;
}

export function Frictions() {
  const items = frictions.map((item, index) => ({
    id: `atrito-${index + 1}`,
    tab: item.title,
    panel: <>
      <div className="encaixe">
        <div className="peca peca-negocio"><small>Como costuma aparecer</small><p>{item.routine}</p></div>
        <div className="peca peca-tecnologia"><small>Como começamos</small><p>{item.approach}</p></div>
      </div>
      <div className="encaixe-meta">
        <div><h3>Áreas envolvidas</h3><ul className="tags">{item.disciplines.map(id => <li key={id}><Link href={`/solucoes/#${id}`}>{disciplines.find(d => d.id === id)?.title}</Link></li>)}</ul></div>
        <div><h3>{item.link.evidence ? "Projeto relacionado" : "Leia mais"}</h3><Link className="text-link" href={item.link.href}>{item.link.label}</Link></div>
      </div>
    </>,
  }));
  return <section className="section" aria-labelledby="atrito-title"><div className="container">
    <SectionHeading label="Problemas comuns" id="atrito-title" title="Situações que costumamos resolver" note="Para cada uma, como ela costuma aparecer no dia a dia e por onde começamos o trabalho." />
    <div data-reveal><Tabs items={items} label="Situações" orientation="vertical" className="frictions" listClassName="friction-list" /></div>
  </div></section>;
}

export function Solutions() {
  const items = disciplines.map(item => ({
    id: item.id,
    tab: item.title,
    panel: <>
      <div>
        <p className="panel-intro">{item.intro}</p>
        <dl className="facts">
          <div><dt>Entregas</dt><dd>{item.deliveries.join(" ")}</dd></div>
          <div><dt>Tecnologias que usamos com frequência</dt><dd><ul className="tags">{item.tech.map(tech => <li key={tech}>{tech}</li>)}</ul></dd></div>
          {item.evidence.length > 0 && <div><dt>Projetos relacionados</dt><dd className="link-list">{item.evidence.map(link => <Link key={link.href} className="text-link" href={link.href}>{link.label}</Link>)}</dd></div>}
        </dl>
        <p className="section-more"><Link className="text-link" href={`/solucoes/#${item.id}`}>Mais sobre {item.title.toLowerCase()}</Link></p>
      </div>
      <ArchitectureDiagram title={item.diagram.title} nodes={item.diagram.nodes} />
    </>,
  }));
  return <section className="section section-soft" id="solucoes" aria-labelledby="solucoes-title"><div className="container">
    <SectionHeading label="Áreas de atuação" id="solucoes-title" title="Software, dados, arquitetura e integração" note="Cada área tem um diagrama com as partes envolvidas; clique em cada uma para ver o que ela faz." />
    <div data-reveal><Tabs items={items} label="Áreas de atuação" listClassName="tabs" panelClassName="tabpanel" /></div>
  </div></section>;
}

export function Projects() {
  const [featured, ...others] = portfolio;
  const runs = evidence.runs;
  const cleanTrips = runs.reduce((sum, run) => sum + run.silver_rows, 0);
  const removedRows = runs.reduce((sum, run) => sum + Object.values(run.removed_by_rule).reduce((total, value) => total + value, 0), 0);
  const rulesChecked = runs.reduce((sum, run) => sum + run.quality_rules.length, 0);
  const rowHref = (item: (typeof portfolio)[number]) => item.links.find(link => link.href.startsWith("/"))?.href ?? `/projetos/#${item.id}`;

  return <section className="section" id="projetos" aria-labelledby="projetos-title"><div className="container">
    <SectionHeading label="Projetos" id="projetos-title" title="Produtos, demonstrações e código aberto" note="Todos têm código público ou capturas de tela, e cada um informa o estágio em que está." />
    <article className="feature" aria-labelledby="destaque-title" data-reveal>
      <Link className="feature-media" href={featured.links[0].href} tabIndex={-1} aria-hidden="true"><Image src={featured.image.src} width={featured.image.width} height={featured.image.height} alt="" sizes="(max-width: 980px) 100vw, 680px" /></Link>
      <div>
        <p className="kind" data-kind={featured.kind}>{featured.category}, dados públicos</p>
        <h3 id="destaque-title">{featured.title}</h3>
        <p>{featured.summary}</p>
        <dl className="figures">
          <div><dt>viagens após a limpeza</dt><dd><CountUp value={cleanTrips} /></dd></div>
          <div><dt>linhas removidas, cada uma com a regra que a removeu</dt><dd><CountUp value={removedRows} /></dd></div>
          <div><dt>verificações de qualidade nos dois meses</dt><dd><CountUp value={rulesChecked} /></dd></div>
        </dl>
        <div className="hero-actions">{featured.links.map((link, i) => link.href.startsWith("/")
          ? <Link key={link.href} className={`button ${i === 0 ? "button-primary" : "button-quiet"}`} href={link.href}>{link.label}</Link>
          : <a key={link.href} className="button button-quiet" href={link.href} target="_blank" rel="noopener noreferrer">{link.label} <span aria-hidden="true">↗</span></a>)}</div>
      </div>
    </article>
    <ul className="rows">
      {others.map((item, index) => <li key={item.id} data-reveal style={delay(index)}><Link className="row" href={rowHref(item)}>
        <div><h3>{item.title}</h3><p>{item.short}</p></div>
        <span className="kind kind-col" data-kind={item.kind}>{item.category}</span>
        <span className="stack">{"tech" in item ? item.tech : item.stage}</span>
        <span className="arrow" aria-hidden="true">→</span>
      </Link></li>)}
    </ul>
    <p className="section-more"><Link className="text-link" href="/projetos/">Ver todos os projetos</Link></p>
  </div></section>;
}

export function Method() {
  return <section className="section section-navy" aria-labelledby="metodo-title"><div className="container">
    <SectionHeading label="Como trabalhamos" id="metodo-title" title="Etapas de um projeto" note="As decisões técnicas e o escopo são alinhados durante o trabalho." />
    <ol className="steps" data-reveal>{process.map((step, index) => <li key={step.title} style={delay(index)}><span className="serial">{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.detail}</p></li>)}</ol>
    <p className="section-more"><Link className="text-link" href="/como-trabalhamos/">O que acontece em cada etapa</Link></p>
  </div></section>;
}

export function Contact() {
  return <section className="section section-soft" id="contato" aria-labelledby="contato-title"><div className="container contact-grid">
    <div data-reveal><p className="eyebrow">Contato</p><h2 className="contact-title" id="contato-title">Conte o que precisa ser resolvido</h2><p className="contact-lead">Escreva sobre o problema, os sistemas envolvidos e o que você gostaria de melhorar. A conversa começa por aí.</p></div>
    <div className="contact-box" data-reveal style={delay(1)}>
      <p className="eyebrow">E-mail</p>
      <a className="contact-email" href={`mailto:${site.email}`}>{site.email}</a>
      <p className="eyebrow">WhatsApp</p>
      <a className="contact-email" href={site.whatsapp.href} target="_blank" rel="noopener noreferrer">{site.whatsapp.label}</a>
      <div className="contact-actions"><Link className="button button-primary" href={contactHref}>Escrever pelo formulário</Link><CopyButton text={site.email} label="Copiar e-mail" className="button button-outline" /></div>
    </div>
  </div></section>;
}
