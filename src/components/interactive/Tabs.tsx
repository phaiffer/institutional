"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

type Item = { id: string; tab: ReactNode; panel: ReactNode };

type Props = {
  items: Item[];
  label: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
  listClassName?: string;
  panelClassName?: string;
  after?: ReactNode;
};

// Abas no padrão WAI-ARIA: setas, Home e End movem a seleção; todos os painéis
// ficam no HTML e só o selecionado aparece.
export function Tabs({ items, label, orientation = "horizontal", className, listClassName, panelClassName, after }: Props) {
  const prefix = useId();
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent, index: number) {
    const next = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
    const prev = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
    const target = { [next]: (index + 1) % items.length, [prev]: (index - 1 + items.length) % items.length, Home: 0, End: items.length - 1 }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    setSelected(target);
    tabs.current[target]?.focus();
  }

  return (
    <div className={className}>
      <div className={listClassName} role="tablist" aria-label={label} aria-orientation={orientation}>
        {items.map((item, index) => (
          <button key={item.id} ref={(node) => { tabs.current[index] = node; }} type="button" role="tab" id={`${prefix}-tab-${item.id}`} aria-controls={`${prefix}-panel-${item.id}`} aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={(event) => onKeyDown(event, index)}>
            {item.tab}
          </button>
        ))}
      </div>
      <div>
        {items.map((item, index) => (
          <div key={item.id} className={panelClassName} role="tabpanel" id={`${prefix}-panel-${item.id}`} aria-labelledby={`${prefix}-tab-${item.id}`} tabIndex={0} hidden={selected !== index}>
            {item.panel}
          </div>
        ))}
        {after}
      </div>
    </div>
  );
}
