import { contactHref, navigation, site } from "@/data/site";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return <footer className="footer"><div className="container footer-grid"><div><Link href="/" aria-label="PhaifferTech, página inicial"><Image src="/brand/logo-claro.svg" width={941} height={169} alt="PhaifferTech" /></Link><p>Engenharia que conecta tecnologia e negócio.</p></div><nav aria-label="Navegação do rodapé"><span>NAVEGAÇÃO</span>{[{ label: "Início", href: "/" }, ...navigation, { label: "Contato", href: contactHref }].map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav><div><span>CONTATO</span><a href={`mailto:${site.email}`}>{site.email}</a><a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer">WhatsApp <span className="nowrap">{site.whatsapp.label}</span></a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {site.legal.name} · <span className="nowrap">CNPJ {site.legal.cnpj}</span></span><span>Conectamos tecnologia ao seu negócio.</span><a href="#topo">Voltar ao topo ↑</a></div></footer>;
}
