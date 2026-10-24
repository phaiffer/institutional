import type { Metadata } from "next";
import Link from "next/link";
import { DemoShell } from "@/components/layout/DemoShell";
import { PetScreenshotGallery } from "@/components/sections/PetScreenshotGallery";
import { site, trichologyPlatform } from "@/data/site";
import styles from "../plataforma-de-dados/page.module.css";

const description = "Capturas da Plataforma Clínica de Tricologia, um produto próprio em desenvolvimento pela PhaifferTech, executado localmente com dados fictícios.";
const preview = { url: `${trichologyPlatform.assets}/og.png`, width: 1200, height: 630, alt: "Tela de resultado da pontuação capilar de uma paciente fictícia" };
const sourceCommit = "d1590b2";

export const metadata: Metadata = {
  title: `${trichologyPlatform.title} | PhaifferTech`,
  description,
  alternates: { canonical: trichologyPlatform.href },
  openGraph: {
    type: "website", locale: "pt_BR", siteName: site.name,
    title: `${trichologyPlatform.title} | Em desenvolvimento`, description,
    url: `${site.url}${trichologyPlatform.href}`, images: [preview],
  },
  twitter: { card: "summary_large_image", title: trichologyPlatform.title, description, images: [preview.url] },
};

const screens = [
  { file: "score.webp", width: 1440, height: 1027, title: "Pontuação explicada", alt: "Resultado da pontuação capilar de uma paciente fictícia, com classificação e a contribuição de cada resposta", caption: "O total vem acompanhado da conta de cada resposta: valor da opção, peso da pergunta e classificação final." },
  { file: "anamnesis-template.webp", width: 1440, height: 1139, title: "Modelo de anamnese", alt: "Modelo de anamnese com perguntas de escolha única, sim ou não, número e texto livre, cada uma com seu peso", caption: "Perguntas tipadas e pesos configuráveis. Registros já preenchidos mantêm os enunciados e pesos da época do atendimento." },
  { file: "report.webp", width: 1440, height: 1465, title: "Laudo em PDF", alt: "Detalhes de um laudo clínico fictício com metadados, fotos selecionadas e resumo da pontuação", caption: "O laudo reúne anamnese, pontuação e fotos selecionadas e é gerado como PDF pelo backend." },
  { file: "patients.webp", width: 1440, height: 900, title: "Cadastro de pacientes", alt: "Lista de pacientes fictícios com telefone, e-mail, status e acesso ao prontuário", caption: "Busca, paginação e acesso ao prontuário de cada paciente." },
];

const steps = [
  { title: "Anamnese", detail: "A clínica monta seus próprios questionários. Cada pergunta tem um tipo e pode ter um peso na pontuação." },
  { title: "Pontuação", detail: "O cálculo usa as respostas registradas e guarda o resultado com a contribuição de cada item, para consulta posterior." },
  { title: "Fotos e laudo", detail: "Fotos de antes e de evolução ficam ligadas ao paciente e podem entrar no laudo em PDF junto com a pontuação." },
];

export default function TrichologyPlatformDemo() {
  return (
    <DemoShell>
      <div className="demo-intro">
        <p className="eyebrow">PRODUTO PRÓPRIO · EM DESENVOLVIMENTO</p>
        <h1>{trichologyPlatform.title}</h1>
        <p className="demo-lead">Uma aplicação web para o atendimento em tricologia: cadastro e prontuário, anamnese configurável, pontuação capilar com o cálculo à vista, registro fotográfico e laudos em PDF.</p>
        <aside className="demo-notice" aria-label="Sobre as capturas">
          As capturas foram feitas em uma execução local, com dados gerados por um script de demonstração. Pacientes, contatos, textos clínicos e fotos são fictícios; as fotos são imagens sintéticas. As telas não indicam uso por clínicas nem operação em produção.
        </aside>
        <div className="demo-actions">
          <a className="button button-primary" href={trichologyPlatform.repository} target="_blank" rel="noopener noreferrer">Código no GitHub <span aria-hidden="true">↗</span></a>
          <Link className="button button-secondary" href="/#contato">Conversar sobre o projeto <span aria-hidden="true">→</span></Link>
        </div>
      </div>

      <section className="demo-section" aria-labelledby="telas">
        <h2 id="telas">Do questionário ao laudo, no mesmo prontuário.</h2>
        <PetScreenshotGallery screens={screens} assets={trichologyPlatform.assets} />
      </section>

      <section className={`demo-section ${styles.section}`} aria-labelledby="fluxo">
        <h2 id="fluxo">Uma pontuação que pode ser conferida item a item.</h2>
        <ol className={styles.steps}>
          {steps.map((step, index) => <li key={step.title}><span className={styles.stepNumber}>0{index + 1}</span><h3>{step.title}</h3><p>{step.detail}</p></li>)}
        </ol>
        <p>Quando um modelo de anamnese muda, as alterações valem só para novos registros. Os atendimentos anteriores continuam com as perguntas e os pesos usados na época, para que pontuações e laudos já emitidos não mudem.</p>

        <details className={styles.technical}>
          <summary>Detalhes técnicos</summary>
          <dl>
            <div><dt>Frontend</dt><dd>Next.js 14, React 18, TypeScript e Tailwind CSS</dd></div>
            <div><dt>Backend</dt><dd>Spring Boot 3.3 com Java 21, Spring Data JPA e Spring Security</dd></div>
            <div><dt>Banco</dt><dd>PostgreSQL com migrações Flyway</dd></div>
            <div><dt>Acesso</dt><dd>Sessão no servidor com cookie HttpOnly e perfis ADMIN, CLINICIAN e STAFF</dd></div>
            <div><dt>Laudos</dt><dd>PDF gerado no backend a partir de HTML, com arquivos e fotos em disco local</dd></div>
            <div><dt>Testes</dt><dd>Integração no backend para pacientes, anamnese, pontuação, mídia e laudos</dd></div>
            <div><dt>Versão</dt><dd>Commit <code>{sourceCommit}</code> do repositório</dd></div>
          </dl>
          <p>O projeto roda em ambiente local. A documentação pede proteção contra CSRF antes de qualquer uso fora dele, e o roadmap prevê gestão de usuários pela interface e trilha de auditoria.</p>
        </details>
      </section>
    </DemoShell>
  );
}
