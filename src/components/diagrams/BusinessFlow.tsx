"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const steps = [
  { label: "Negócio", caption: "objetivo e contexto", detail: "Entendemos o objetivo, quem usa a solução e as restrições da operação." },
  { label: "Software", caption: "aplicações e APIs", detail: "Aplicações e APIs transformam necessidades em funções utilizáveis." },
  { label: "Integrações", caption: "sistemas em diálogo", detail: "As integrações fazem os sistemas trocar informações sem retrabalho." },
  { label: "Dados", caption: "informação organizada", detail: "Dados reunidos e tratados passam a sustentar indicadores." },
  { label: "Resultados", caption: "operação mais clara", detail: "A equipe ganha visibilidade para decidir e melhorar o trabalho." },
] as const;

export function BusinessFlow() {
  const [selected, setSelected] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const touched = useRef(false);

  // Percorre o mapa uma única vez ao abrir a página, do negócio ao resultado,
  // e para assim que o visitante interage. Não roda com movimento reduzido.
  useEffect(() => {
    if (!document.documentElement.classList.contains("motion-ok")) return;
    let step = 0;
    let timer = window.setTimeout(function advance() {
      if (touched.current) return;
      step += 1;
      setSelected(step);
      if (step < steps.length - 1) timer = window.setTimeout(advance, 1100);
    }, 1800);
    return () => window.clearTimeout(timer);
  }, []);

  const stop = () => { touched.current = true; setInteracted(true); };

  return <div className="flow" role="group" aria-label="Mapa de conexão: negócio, software, integrações, dados e resultados" onPointerDown={stop} onFocus={stop}>
    <div className="flow-heading" aria-hidden="true"><span>Mapa de conexão</span><span>Do contexto ao resultado</span></div>
    <div className="flow-stage">
      <ol className="flow-steps">{steps.map((step, index) => <li className={`flow-step ${index < selected ? "is-reached" : ""}`} key={step.label} style={{ "--i": index } as CSSProperties}>
        <button type="button" className="flow-node" aria-pressed={selected === index} onClick={() => setSelected(index)}>
          <span className="flow-index">0{index + 1} / 05</span>
          <strong>{step.label}</strong>
          <span className="flow-caption">{step.caption}</span>
        </button>
      </li>)}</ol>
      <p className="flow-loop"><span aria-hidden="true">↺</span> O resultado volta a orientar o negócio.</p>
    </div>
    <p className="flow-detail" aria-live={interacted ? "polite" : "off"}><span>Etapa 0{selected + 1}</span><strong>{steps[selected].detail}</strong></p>
  </div>;
}
