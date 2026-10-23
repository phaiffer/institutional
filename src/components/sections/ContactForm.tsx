"use client";

import { useRef, useState, type FormEvent } from "react";
import { CopyButton } from "@/components/interactive/CopyButton";

const topics = ["Software", "Dados", "Arquitetura e cloud", "Integração e automação", "Ainda não sei"];

type Field = "nome" | "email" | "mensagem";
const checks: Record<Field, (value: string) => string | null> = {
  nome: (value) => value.trim().length >= 2 ? null : "Informe seu nome.",
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? null : "Informe um e-mail válido, como nome@empresa.com.br.",
  mensagem: (value) => value.trim().length >= 20 ? null : "Conte um pouco mais: pelo menos 20 caracteres.",
};

// O site é estático: o formulário monta a mensagem e abre o programa de e-mail do visitante.
export function ContactForm({ to }: { to: string }) {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [ready, setReady] = useState<{ href: string; text: string } | null>(null);
  const statusTitle = useRef<HTMLHeadingElement>(null);

  function validate(field: Field, value: string) {
    const message = checks[field](value);
    setErrors((current) => ({ ...current, [field]: message ?? undefined }));
    return message;
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const failed = (Object.keys(checks) as Field[]).filter((field) => validate(field, String(data.get(field) ?? "")));
    if (failed.length) { (form.elements.namedItem(failed[0]) as HTMLElement).focus(); return; }
    const subject = `[Site] ${data.get("assunto") || "Outro assunto"}: ${data.get("nome")}`;
    const lines = [String(data.get("mensagem")), "", `Nome: ${data.get("nome")}`, `E-mail: ${data.get("email")}`];
    if (data.get("empresa")) lines.push(`Empresa: ${data.get("empresa")}`);
    const body = lines.join("\n");
    const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setReady({ href, text: `Para: ${to}\nAssunto: ${subject}\n\n${body}` });
    requestAnimationFrame(() => statusTitle.current?.focus());
    window.location.href = href;
  }

  const fieldProps = (field: Field) => ({
    name: field, id: `f-${field}`, required: true, "aria-invalid": errors[field] ? true : undefined, "aria-describedby": `e-${field}`,
    onBlur: (event: { currentTarget: { value: string } }) => { if (event.currentTarget.value) validate(field, event.currentTarget.value); },
    onInput: (event: { currentTarget: { value: string } }) => { if (errors[field]) validate(field, event.currentTarget.value); },
  });

  return (
    <div>
      <form className="form" noValidate onSubmit={onSubmit} aria-describedby="form-help">
        <p className="form-help" id="form-help">Ao continuar, seu programa de e-mail abre com a mensagem pronta. Nada é enviado por este site.</p>
        <div className="field" data-invalid={errors.nome ? "" : undefined}>
          <label htmlFor="f-nome">Nome</label>
          <input {...fieldProps("nome")} autoComplete="name" />
          <span className="error" id="e-nome">{errors.nome}</span>
        </div>
        <div className="field" data-invalid={errors.email ? "" : undefined}>
          <label htmlFor="f-email">E-mail</label>
          <input {...fieldProps("email")} type="email" autoComplete="email" inputMode="email" />
          <span className="error" id="e-email">{errors.email}</span>
        </div>
        <div className="field">
          <label htmlFor="f-empresa">Empresa <span className="hint">(opcional)</span></label>
          <input id="f-empresa" name="empresa" autoComplete="organization" />
        </div>
        <fieldset className="field">
          <legend>Assunto <span className="hint">(opcional)</span></legend>
          <div className="choices">{topics.map((topic) => <label key={topic}><input type="radio" name="assunto" value={topic} /><span>{topic}</span></label>)}</div>
        </fieldset>
        <div className="field" data-invalid={errors.mensagem ? "" : undefined}>
          <label htmlFor="f-mensagem">O que está acontecendo?</label>
          <span className="hint" id="h-mensagem">Por exemplo: quais sistemas a equipe usa, o que é feito à mão, o que gostaria que mudasse.</span>
          <textarea {...fieldProps("mensagem")} aria-describedby="h-mensagem e-mensagem" />
          <span className="error" id="e-mensagem">{errors.mensagem}</span>
        </div>
        <div><button className="button button-primary" type="submit">Preparar e-mail</button></div>
      </form>

      {ready && (
        <div className="form-status">
          <h2 ref={statusTitle} tabIndex={-1}>Mensagem pronta no seu programa de e-mail</h2>
          <p>Confira o texto e envie por lá. Se o programa não abriu, use um dos botões abaixo.</p>
          <div className="contact-actions">
            <a className="button button-primary" href={ready.href}>Abrir de novo</a>
            <CopyButton text={ready.text} label="Copiar a mensagem" className="button button-quiet" />
          </div>
        </div>
      )}
    </div>
  );
}
