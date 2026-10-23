import { PageShell } from "@/components/layout/PageShell";
import { ContactForm } from "@/components/sections/ContactForm";
import { CopyButton } from "@/components/interactive/CopyButton";
import { site } from "@/data/site";
import { pageMetadata } from "@/data/metadata";

export const metadata = pageMetadata({
  title: "Contato",
  description: "Conte o problema, os sistemas envolvidos e o que gostaria de melhorar. A conversa com a PhaifferTech começa por aí.",
  path: "/contato/",
});

export default function ContactPage() {
  return <PageShell>
    <section className="section section-soft"><div className="container contact-grid">
      <div data-reveal>
        <h1 className="contact-title">Contato</h1>
        <p className="contact-lead">Escreva sobre o problema, os sistemas envolvidos e o que você gostaria de melhorar. Não é preciso saber qual tecnologia usar; isso faz parte da conversa.</p>
        <div className="contact-box section-more">
          <p className="eyebrow">E-mail</p>
          <a className="contact-email" href={`mailto:${site.email}`}>{site.email}</a>
          <div className="contact-actions"><CopyButton text={site.email} label="Copiar e-mail" className="button button-outline" /></div>
        </div>
      </div>
      <div data-reveal><ContactForm to={site.email} /></div>
    </div></section>
  </PageShell>;
}
