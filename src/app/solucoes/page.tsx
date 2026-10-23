import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Rail } from "@/components/layout/Rail";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { contactHref, disciplines } from "@/data/site";
import { pageMetadata } from "@/data/metadata";

export const metadata = pageMetadata({
  title: "Soluções",
  description: "Engenharia de software, engenharia de dados, arquitetura e cloud, integração e automação: quando cada área faz sentido e o que entregamos.",
  path: "/solucoes/",
});

export default function SolutionsPage() {
  return <PageShell>
    <header className="page-head"><div className="container" data-reveal>
      <h1>Soluções</h1>
      <p className="page-lead">Trabalhamos em quatro áreas que costumam aparecer juntas no mesmo projeto: uma integração depende de arquitetura, e um painel depende de dados confiáveis. Abaixo, quando cada uma faz sentido e o que entregamos.</p>
    </div></header>

    <div className="section"><div className="container with-rail">
      <Rail label="Nesta página" items={disciplines.map(item => ({ id: item.id, label: item.label }))} />
      <div>
        {disciplines.map(item => <section className="discipline" id={item.id} key={item.id} aria-labelledby={`h-${item.id}`} data-reveal>
          <h2 id={`h-${item.id}`}>{item.title}</h2>
          <p>{item.intro}</p>
          <div className="discipline-cols">
            <div><h3>Quando faz sentido</h3><ul>{item.when.map(text => <li key={text}>{text}</li>)}</ul></div>
            <div><h3>O que entregamos</h3><ul>{item.deliveries.map(text => <li key={text}>{text}</li>)}</ul></div>
          </div>
          <ArchitectureDiagram title={item.diagram.title} nodes={item.diagram.nodes} />
          <div className="evidence">
            <div><b>Tecnologias que usamos com frequência</b><ul className="tags">{item.tech.map(tech => <li key={tech}>{tech}</li>)}</ul></div>
            {item.evidence.length > 0 && <div><b>Projetos relacionados</b><p className="link-list">{item.evidence.map(link => <Link key={link.href} className="text-link" href={link.href}>{link.label}</Link>)}</p></div>}
          </div>
        </section>)}
        <div className="contact-box" data-reveal>
          <p className="contact-email">Não sabe qual área se aplica ao seu caso? Descreva o problema e a gente ajuda a identificar.</p>
          <div className="contact-actions"><Link className="button button-primary" href={contactHref}>Falar sobre o projeto</Link></div>
        </div>
      </div>
    </div></div>
  </PageShell>;
}
