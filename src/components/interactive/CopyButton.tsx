"use client";

import { useId, useState } from "react";

// Copia um texto para a área de transferência e anuncia o resultado.
export function CopyButton({ text, label, className }: { text: string; label: string; className?: string }) {
  const statusId = useId();
  const [status, setStatus] = useState("");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Copiado.");
    } catch {
      setStatus("Não foi possível copiar automaticamente. Selecione e copie o texto manualmente.");
    }
  }

  return (
    <>
      <button className={className} type="button" onClick={copy} aria-describedby={statusId}>{label}</button>
      <span className="copy-status" id={statusId} aria-live="polite">{status}</span>
    </>
  );
}
