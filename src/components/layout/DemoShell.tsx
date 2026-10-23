import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

// Cabeçalho, área principal e rodapé comuns às páginas de demonstração.
export function DemoShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="demo-page">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="demo-header">
        <div className="container demo-header-inner">
          <Link className="brand" href="/" aria-label="PhaifferTech, página inicial">
            <Image src="/brand/logo-light-400.png" width={400} height={76} alt="PhaifferTech" priority />
          </Link>
          <nav aria-label="Navegação da demonstração"><Link className="demo-back" href="/projetos/"><span aria-hidden="true">←</span> Voltar aos projetos</Link></nav>
        </div>
      </header>
      <main id="conteudo" className="container demo-main">{children}</main>
      <footer className="demo-footer">
        <div className="container demo-footer-inner">
          <span>PhaifferTech · Engenharia de software e dados</span>
          <Link href="/">Página inicial</Link>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </footer>
    </div>
  );
}
