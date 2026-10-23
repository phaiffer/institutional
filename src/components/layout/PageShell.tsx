import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

// Cabeçalho, área principal e rodapé comuns às páginas institucionais.
export function PageShell({ children }: { children: React.ReactNode }) {
  return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header /><main id="conteudo" className="page-enter">{children}</main><Footer /></>;
}
