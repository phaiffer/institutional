"use client";

import { useEffect, useState } from "react";

// Índice lateral que marca a seção em leitura; no celular vira uma barra rolável.
export function Rail({ items, label }: { items: readonly { id: string; label: string }[]; label: string }) {
  const [current, setCurrent] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.id)).filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setCurrent(visible[0].target.id);
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="rail" aria-label={label}>
      <ol>
        {items.map(item => (
          <li key={item.id}><a href={`#${item.id}`} aria-current={current === item.id ? "true" : undefined}>{item.label}</a></li>
        ))}
      </ol>
    </nav>
  );
}
