import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { ProjectFilter } from "@/components/sections/ProjectFilter";
import { egc, portfolio, projectKinds } from "@/data/site";
import { pageMetadata } from "@/data/metadata";

export const metadata = pageMetadata({
  title: "Projetos",
  description: "Produtos próprios, demonstrações técnicas e contribuições open source, cada um com estágio, evidência e limites declarados.",
  path: "/projetos/",
});

type Project = (typeof portfolio)[number];

function Ficha({ item }: { item: Project }) {
  return <>
    {"image" in item
      ? <Link className="ficha-media" href={item.links[0].href} tabIndex={-1} aria-hidden="true"><Image src={item.image.src} width={item.image.width} height={item.image.height} alt="" sizes="(max-width: 980px) 100vw, 460px" loading="lazy" /></Link>
      : <div className="ficha-media ficha-videos">{egc.videos.map(video => <a key={video.href} href={video.href} target="_blank" rel="noopener noreferrer"><i aria-hidden="true">▶</i><span><strong>{video.title}</strong><small>por {video.author}</small></span></a>)}</div>}
    <div>
      <p className="kind" data-kind={item.kind}>{item.category}</p>
      <h2>{item.title}</h2>
      <p>{item.summary}</p>
      <dl>
        <dt>Estágio</dt><dd><span className="stage">{item.stage}</span></dd>
        <dt>Demonstra</dt><dd>{item.demonstrates}</dd>
        {"tech" in item && <><dt>Tecnologias</dt><dd>{item.tech}</dd></>}
        {"evidence" in item && <><dt>Evidência</dt><dd>{item.evidence}</dd></>}
        {"limits" in item && <><dt>Limites</dt><dd>{item.limits}</dd></>}
      </dl>
      <div className="ficha-actions">{item.links.map((link, index) => link.href.startsWith("/")
        ? <Link key={link.href} className={`button ${index === 0 ? "button-primary" : "button-quiet"}`} href={link.href}>{link.label}</Link>
        : <a key={link.href} className="button button-quiet" href={link.href} target="_blank" rel="noopener noreferrer">{link.label} <span aria-hidden="true">↗</span></a>)}</div>
    </div>
  </>;
}

export default function ProjectsPage() {
  return <PageShell>
    <header className="page-head"><div className="container" data-reveal>
      <h1>Projetos</h1>
      <p className="page-lead">Produtos próprios, demonstrações técnicas e uma contribuição open source. Cada ficha informa o estágio do projeto, o que ele mostra e onde ver o código ou as capturas. Só estão aqui trabalhos que podem ser mostrados publicamente.</p>
    </div></header>
    <section className="section section-soft" aria-label="Lista de projetos"><div className="container">
      <ProjectFilter kinds={projectKinds} items={portfolio.map(item => ({ id: item.id, kind: item.kind, node: <Ficha item={item} /> }))} />
    </div></section>
  </PageShell>;
}
