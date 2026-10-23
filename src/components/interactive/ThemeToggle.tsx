"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const darkQuery = "(prefers-color-scheme: dark)";

// Alterna entre os temas claro e escuro. Sem escolha gravada, o site segue o tema do sistema.
// O ícone trocado é decidido pelo CSS, para aparecer certo já na primeira pintura.
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const media = matchMedia(darkQuery);
    const read = () => setTheme((document.documentElement.dataset.theme as Theme | undefined) ?? (media.matches ? "dark" : "light"));
    read();
    media.addEventListener("change", read);
    return () => media.removeEventListener("change", read);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch { /* sem armazenamento, a escolha vale só nesta visita */ }
    setTheme(next);
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggle} aria-pressed={theme ? theme === "dark" : undefined} aria-label="Tema escuro" title={theme === "dark" ? "Usar tema claro" : "Usar tema escuro"}>
      <svg className="icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /></svg>
      <svg className="icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" /></svg>
    </button>
  );
}
