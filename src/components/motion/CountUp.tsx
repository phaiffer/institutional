"use client";

import { useEffect, useRef } from "react";

const format = (value: number) => new Intl.NumberFormat("pt-BR").format(value);

// Conta até o valor real uma vez, quando entra na tela. O HTML gerado já traz o valor
// final, e leitores de tela recebem só ele.
export function CountUp({ value }: { value: number }) {
  const visible = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = visible.current;
    if (!node || !document.documentElement.classList.contains("motion-ok")) return;
    if (node.getBoundingClientRect().top < window.innerHeight * .9) return;
    let frame = 0;
    node.textContent = format(0);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        node.textContent = format(Math.round(value * (1 - Math.pow(1 - t, 4))));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); node.textContent = format(value); };
  }, [value]);

  return <><span ref={visible} aria-hidden="true">{format(value)}</span><span className="visually-hidden">{format(value)}</span></>;
}
