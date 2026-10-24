import type { CSSProperties } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { contactHref, process } from "@/data/site";
import { pageMetadata } from "@/data/metadata";

export const metadata = pageMetadata({
  title: "Como trabalhamos",
  description: "Como a PhaifferTech conduz um projeto, da descoberta à evolução, e quem somos.",
  path: "/como-trabalhamos/",
});

export default function MethodPage() {
  return <PageShell>
    <header className="page-head"><div className="container" data-reveal>
      <h1>Como trabalhamos</h1>
      <p className="page-lead">Antes de escolher tecnologia, entendemos a rotina, os sistemas que já existem e as restrições do projeto. Escopo e decisões técnicas são combinados ao longo do trabalho, e cada etapa termina com um registro do que foi decidido.</p>
    </div></header>

    <section className="section" aria-labelledby="etapas-title"><div className="container">
      <div className="section-heading" data-reveal><div><h2 id="etapas-title">Da descoberta à evolução</h2></div></div>
      <ol className="steps steps-light" data-reveal>{process.map((step, index) => <li key={step.title} style={{ "--i": index } as CSSProperties}><span className="serial">{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.detail}</p><p className="receive"><b>Ao final da etapa</b>{step.receive}</p></li>)}</ol>
    </div></section>

    <section className="section section-soft" id="sobre" aria-labelledby="sobre-title"><div className="container contact-grid">
      <div data-reveal><h2 className="contact-title" id="sobre-title">Sobre a PhaifferTech</h2></div>
      <div className="about-copy" data-reveal>
        <p>A PhaifferTech reúne engenharia de software e dados para lidar com problemas que atravessam sistemas, pessoas e processos. O trabalho começa pela compreensão do cenário e segue até a implementação da solução.</p>
        <p>Escolhemos as tecnologias pelo que cada problema pede e explicamos as decisões a quem vai usar e manter o sistema. Preferimos entregar em partes menores, validadas com quem usa, a guardar tudo para uma entrega única no fim.</p>
        <div className="contact-actions section-more"><Link className="button button-primary" href={contactHref}>Conversar sobre um projeto</Link><Link className="button button-quiet" href="/projetos/">Ver projetos</Link></div>
      </div>
    </div></section>
  </PageShell>;
}
