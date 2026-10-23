"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { DiagramNode } from "@/data/site";

// Conector ortogonal com cotovelos arredondados, a mesma curva das peças do símbolo.
function elbow(x1: number, y1: number, x2: number, y2: number, horizontal: boolean) {
  if (horizontal) {
    if (Math.abs(y2 - y1) < 1) return `M${x1} ${y1} H${x2}`;
    const mid = (x1 + x2) / 2;
    const r = Math.min(14, Math.abs(y2 - y1) / 2, Math.abs(x2 - x1) / 2);
    const dy = Math.sign(y2 - y1);
    return `M${x1} ${y1} H${mid - r} Q${mid} ${y1} ${mid} ${y1 + dy * r} V${y2 - dy * r} Q${mid} ${y2} ${mid + r} ${y2} H${x2}`;
  }
  if (Math.abs(x2 - x1) < 1) return `M${x1} ${y1} V${y2}`;
  const mid = (y1 + y2) / 2;
  const r = Math.min(14, Math.abs(x2 - x1) / 2, Math.abs(y2 - y1) / 2);
  const dx = Math.sign(x2 - x1);
  return `M${x1} ${y1} V${mid - r} Q${x1} ${mid} ${x1 + dx * r} ${mid} H${x2 - dx * r} Q${x2} ${mid} ${x2} ${mid + r} V${y2}`;
}

const motionAllowed = () => document.documentElement.classList.contains("motion-ok");

export function ArchitectureDiagram({ title, nodes }: { title: string; nodes: readonly DiagramNode[] }) {
  const [selected, setSelected] = useState(0);
  const [wires, setWires] = useState<string[]>([]);
  const [box, setBox] = useState({ width: 0, height: 0 });
  const [drawn, setDrawn] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const dot = useRef<SVGCircleElement>(null);

  // Mede os nós e redesenha os conectores sempre que o diagrama muda de tamanho,
  // inclusive quando a aba que o contém passa a ficar visível.
  useEffect(() => {
    const element = wrap.current;
    if (!element) return;
    const measure = () => {
      const area = element.getBoundingClientRect();
      if (!area.width) return;
      const items = [...element.querySelectorAll<HTMLElement>(".arch-node")].map((node) => node.getBoundingClientRect());
      setBox({ width: area.width, height: area.height });
      setWires(items.slice(0, -1).map((a, i) => {
        const b = items[i + 1];
        return b.left >= a.right - 1
          ? elbow(a.right - area.left, a.top + a.height / 2 - area.top, b.left - area.left, b.top + b.height / 2 - area.top, true)
          : elbow(a.left + a.width / 2 - area.left, a.bottom - area.top, b.left + b.width / 2 - area.left, b.top - area.top, false);
      }));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Os conectores se desenham uma vez, quando o diagrama entra na tela.
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setDrawn(true);
      observer.disconnect();
    }, { threshold: 0.3 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Ao selecionar um componente, um ponto percorre o conector até ele: o dado chegando.
  function select(index: number) {
    setSelected(index);
    const path = paths.current[Math.max(index - 1, 0)];
    const circle = dot.current;
    if (!path || !circle || !motionAllowed()) return;
    const length = path.getTotalLength();
    const reverse = index === 0;
    let start = 0;
    circle.style.opacity = "1";
    const step = (now: number) => {
      start ||= now;
      const t = Math.min(1, (now - start) / 650);
      const eased = 1 - Math.pow(1 - t, 3);
      const point = path.getPointAtLength(length * (reverse ? 1 - eased : eased));
      circle.setAttribute("cx", String(point.x));
      circle.setAttribute("cy", String(point.y));
      if (t < 1) requestAnimationFrame(step);
      else circle.style.opacity = "0";
    };
    requestAnimationFrame(step);
  }

  const current = nodes[selected];

  return (
    <div ref={root} className={`arch${drawn ? " is-drawn" : ""}`}>
      <p className="arch-title"><strong>{title}</strong></p>
      <div ref={wrap} className="arch-wrap">
        <svg className="arch-wires" viewBox={`0 0 ${box.width || 1} ${box.height || 1}`} aria-hidden="true" focusable="false">
          {wires.map((d, i) => <path key={i} ref={(node) => { paths.current[i] = node; }} d={d} pathLength={1} style={{ "--i": i } as CSSProperties} className={i === selected || i + 1 === selected ? "is-active" : undefined} />)}
          <circle ref={dot} r="5" cx="-20" cy="-20" style={{ opacity: 0 }} />
        </svg>
        <ol className="arch-flow">
          {nodes.map((node, i) => (
            <li key={node.label}>
              <button type="button" className="arch-node" data-side={node.side} aria-pressed={selected === i} onClick={() => select(i)}>
                <strong>{node.label}</strong>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="arch-detail" data-side={current.side} aria-live="polite"><h4>{current.label}</h4><p>{current.detail}</p></div>
    </div>
  );
}
