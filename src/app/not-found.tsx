import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><p>404 / PÁGINA NÃO ENCONTRADA</p><h1>Esta conexão não foi encontrada.</h1><Link className="button button-primary" href="/">Voltar ao início</Link></main>;
}
