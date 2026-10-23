import type { Metadata } from "next";
import Link from "next/link";
import { DemoShell } from "@/components/layout/DemoShell";
import { PetScreenshotGallery } from "@/components/sections/PetScreenshotGallery";
import { petPlatform, site } from "@/data/site";

const description = "Capturas da Plataforma de Gestão para Negócios Pet, um produto próprio em desenvolvimento pela PhaifferTech.";
const preview = { url: `${petPlatform.assets}/dashboard.webp`, width: 1600, height: 1000, alt: "Painel operacional da demonstração da plataforma pet" };

export const metadata: Metadata = {
  title: `${petPlatform.title} | PhaifferTech`,
  description,
  alternates: { canonical: petPlatform.href },
  openGraph: {
    type: "website", locale: "pt_BR", siteName: site.name,
    title: `${petPlatform.title} | Em desenvolvimento`, description,
    url: `${site.url}${petPlatform.href}`, images: [preview],
  },
  twitter: { card: "summary_large_image", title: petPlatform.title, description, images: [preview.url] },
};

const screens = [
  { file: "dashboard.webp", title: "Visão geral da operação", alt: "Painel com indicadores de atendimentos, recorrência, cobrança e comissões fictícios", caption: "Resumo visual de rotinas operacionais e indicadores da demonstração." },
  { file: "agenda.webp", title: "Agenda de atendimentos", alt: "Tela de agenda de banho e tosa com filtros e indicadores de exemplo", caption: "Organização de atendimentos, filtros operacionais e estados da agenda." },
  { file: "estoque.webp", title: "Estoque e reposição", alt: "Tela de estoque com alertas e níveis fictícios de produtos", caption: "Acompanhamento de itens, alertas de reposição e movimentações de exemplo." },
  { file: "clinica.webp", title: "Rotinas de clínica", alt: "Painel clínico com indicadores fictícios de consultas, vacinas, prontuários e prescrições", caption: "Uma visão de rotinas clínicas representada no ambiente de demonstração." },
];

export default function PetPlatformDemo() {
  return (
    <DemoShell>
      <div className="demo-intro">
        <p className="eyebrow">PRODUTO PRÓPRIO · EM DESENVOLVIMENTO</p>
        <h1>{petPlatform.title}</h1>
        <p className="demo-lead">Uma aplicação em desenvolvimento para reunir rotinas de pet shops, banho e tosa e clínicas veterinárias. As telas abaixo mostram partes da interface em construção.</p>
        <aside className="demo-notice" aria-label="Sobre as capturas">
          Os nomes, contatos, cadastros, valores e indicadores mostrados nas capturas são fictícios e servem apenas para demonstração. “Gestão Pet” é um rótulo provisório visível na interface; o produto ainda não tem marca comercial definida. As imagens ilustram telas do projeto e não indicam disponibilidade comercial ou operação em produção.
        </aside>
        <div className="demo-actions">
          <a className="button button-primary" href="https://github.com/phaiffer/phaiffertech" target="_blank" rel="noopener noreferrer">Acompanhar o projeto no GitHub <span aria-hidden="true">↗</span></a>
          <Link className="button button-secondary" href="/#contato">Conversar sobre o projeto <span aria-hidden="true">→</span></Link>
        </div>
      </div>

      <section className="demo-section" aria-labelledby="telas">
        <p className="eyebrow">CAPTURAS DO AMBIENTE DE DEMONSTRAÇÃO</p>
        <h2 id="telas">Rotinas conectadas em uma mesma aplicação.</h2>
        <PetScreenshotGallery screens={screens} assets={petPlatform.assets} />
      </section>
    </DemoShell>
  );
}
