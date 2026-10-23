"use client";

import { useState, type ReactNode } from "react";
import type { ProjectKind } from "@/data/site";

type Item = { id: string; kind: ProjectKind; node: ReactNode };

// Filtro por categoria do portfólio; sem JavaScript, todas as fichas aparecem.
export function ProjectFilter({ items, kinds }: { items: Item[]; kinds: { id: ProjectKind; label: string }[] }) {
  const [active, setActive] = useState<ProjectKind | "todos">("todos");
  const options = [{ id: "todos" as const, label: "Todos", count: items.length }, ...kinds.map((kind) => ({ ...kind, count: items.filter((item) => item.kind === kind.id).length }))];
  const visible = items.filter((item) => active === "todos" || item.kind === active).length;

  return (
    <>
      <div className="filters" role="group" aria-label="Filtrar por categoria">
        {options.map((option) => (
          <button key={option.id} type="button" aria-pressed={active === option.id} onClick={() => setActive(option.id)}>{option.label} <span>{option.count}</span></button>
        ))}
      </div>
      <p className="result-count" aria-live="polite">{visible} {visible === 1 ? "projeto" : "projetos"}</p>
      <ul className="fichas">
        {items.map((item) => <li key={item.id} id={item.id} className="ficha" hidden={active !== "todos" && item.kind !== active}>{item.node}</li>)}
      </ul>
    </>
  );
}
