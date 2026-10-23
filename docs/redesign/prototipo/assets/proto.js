// Interações do protótipo. Todo o conteúdo está no HTML; o script só mostra,
// esconde e desenha conectores, para que a página funcione sem JavaScript.

// Menu no celular
function initMenu() {
  const header = document.querySelector(".header");
  const button = header?.querySelector(".menu-btn");
  if (!header || !button) return;
  const setOpen = (open) => {
    header.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };
  button.addEventListener("click", () => setOpen(!header.classList.contains("is-open")));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("is-open")) { setOpen(false); button.focus(); }
  });
}

// Abas (padrão WAI-ARIA): setas, Home e End movem a seleção
function initTabs(root) {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const vertical = root.getAttribute("aria-orientation") === "vertical";
  const select = (tab, focus) => {
    tabs.forEach((item) => {
      const active = item === tab;
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(item.getAttribute("aria-controls"));
      if (panel) panel.hidden = !active;
    });
    if (focus) tab.focus();
    const panel = document.getElementById(tab.getAttribute("aria-controls"));
    panel?.querySelectorAll("[data-diagram]").forEach(drawWires);
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => select(tab, false));
    tab.addEventListener("keydown", (event) => {
      const next = vertical ? "ArrowDown" : "ArrowRight";
      const prev = vertical ? "ArrowUp" : "ArrowLeft";
      let target = null;
      if (event.key === next) target = tabs[(index + 1) % tabs.length];
      if (event.key === prev) target = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === "Home") target = tabs[0];
      if (event.key === "End") target = tabs[tabs.length - 1];
      if (target) { event.preventDefault(); select(target, true); }
    });
  });
  select(tabs.find((tab) => tab.getAttribute("aria-selected") === "true") ?? tabs[0], false);
}

// Diagrama: selecionar um componente mostra sua responsabilidade
function initDiagram(diagram) {
  const nodes = [...diagram.querySelectorAll(".node")];
  const detail = diagram.querySelector(".node-detail");
  const select = (node) => {
    nodes.forEach((item) => item.setAttribute("aria-pressed", String(item === node)));
    detail.dataset.side = node.dataset.side ?? "tecnologia";
    detail.querySelector("h4").textContent = node.querySelector("strong").textContent;
    detail.querySelector("p").textContent = node.dataset.detail;
    drawWires(diagram);
  };
  nodes.forEach((node) => node.addEventListener("click", () => select(node)));
  select(nodes.find((node) => node.getAttribute("aria-pressed") === "true") ?? nodes[0]);
  new ResizeObserver(() => drawWires(diagram)).observe(diagram);
}

// Conectores ortogonais com cotovelos arredondados, a mesma curva das peças do símbolo
function elbow(x1, y1, x2, y2, horizontal) {
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

function drawWires(diagram) {
  const wrap = diagram.querySelector(".flow-wrap");
  const svg = wrap?.querySelector(".wires");
  if (!wrap || !svg || wrap.offsetParent === null) return;
  const box = wrap.getBoundingClientRect();
  const nodes = [...wrap.querySelectorAll(".node")];
  const selected = nodes.findIndex((node) => node.getAttribute("aria-pressed") === "true");
  svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
  svg.innerHTML = nodes.slice(0, -1).map((node, i) => {
    const a = node.getBoundingClientRect();
    const b = nodes[i + 1].getBoundingClientRect();
    const horizontal = b.left >= a.right - 1;
    const d = horizontal
      ? elbow(a.right - box.left, a.top + a.height / 2 - box.top, b.left - box.left, b.top + b.height / 2 - box.top, true)
      : elbow(a.left + a.width / 2 - box.left, a.bottom - box.top, b.left + b.width / 2 - box.left, b.top - box.top, false);
    const active = i === selected || i + 1 === selected;
    return `<path d="${d}"${active ? ' class="is-active"' : ""}/>`;
  }).join("");
}

// Portfólio: filtro por categoria
function initFilters(root) {
  const buttons = [...root.querySelectorAll("[data-filter]")];
  const items = [...document.querySelectorAll("[data-kind-item]")];
  const count = document.querySelector("[data-count]");
  const apply = (value) => {
    buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.filter === value)));
    let visible = 0;
    items.forEach((item) => {
      const show = value === "todos" || item.dataset.kindItem === value;
      item.hidden = !show;
      if (show) visible += 1;
    });
    if (count) count.textContent = `${visible} ${visible === 1 ? "projeto" : "projetos"}`;
  };
  buttons.forEach((button) => button.addEventListener("click", () => apply(button.dataset.filter)));
  apply("todos");
}

// Trilho lateral: marca a seção em leitura
function initRail(rail) {
  const links = [...rail.querySelectorAll("a[href^='#']")];
  const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  const mark = (id) => links.forEach((link) => link.setAttribute("aria-current", String(link.getAttribute("href") === `#${id}`)));
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible[0]) mark(visible[0].target.id);
  }, { rootMargin: "-30% 0px -60% 0px" });
  sections.forEach((section) => observer.observe(section));
  if (sections[0]) mark(sections[0].id);
}

// Copiar texto (e-mail ou mensagem pronta)
function initCopy(button) {
  const status = document.getElementById(button.getAttribute("aria-describedby"));
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      status.textContent = "Copiado.";
    } catch {
      status.textContent = "Não foi possível copiar automaticamente. Selecione e copie o texto manualmente.";
    }
  });
}

// Contato: valida, monta o e-mail e explica o que aconteceu
function initContactForm(form) {
  const status = document.getElementById("form-status");
  const email = form.dataset.to;
  const checks = {
    nome: (value) => value.trim().length >= 2 || "Informe seu nome.",
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || "Informe um e-mail válido, como nome@empresa.com.br.",
    mensagem: (value) => value.trim().length >= 20 || "Conte um pouco mais: pelo menos 20 caracteres.",
  };
  const validate = (input) => {
    const field = input.closest(".field");
    const result = checks[input.name](input.value);
    if (result === true) { delete field.dataset.invalid; input.removeAttribute("aria-invalid"); return true; }
    field.dataset.invalid = "";
    input.setAttribute("aria-invalid", "true");
    field.querySelector(".error").textContent = result;
    return false;
  };
  Object.keys(checks).forEach((name) => {
    const input = form.elements[name];
    input.addEventListener("blur", () => { if (input.value) validate(input); });
    input.addEventListener("input", () => { if (input.closest(".field").hasAttribute("data-invalid")) validate(input); });
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const invalid = Object.keys(checks).map((name) => form.elements[name]).filter((input) => !validate(input));
    if (invalid.length) { invalid[0].focus(); return; }
    const data = new FormData(form);
    const subject = `[Site] ${data.get("assunto") || "Outro assunto"}: ${data.get("nome")}`;
    const lines = [data.get("mensagem"), "", `Nome: ${data.get("nome")}`, `E-mail: ${data.get("email")}`];
    if (data.get("empresa")) lines.push(`Empresa: ${data.get("empresa")}`);
    const body = lines.join("\n");
    const href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.querySelector("[data-mailto]").href = href;
    status.querySelector("button[data-copy]").dataset.copy = `Para: ${email}\nAssunto: ${subject}\n\n${body}`;
    status.hidden = false;
    status.querySelector("h2").focus();
    window.location.href = href;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  document.querySelectorAll('[role="tablist"]').forEach(initTabs);
  document.querySelectorAll("[data-diagram]").forEach(initDiagram);
  document.querySelectorAll("[data-filters]").forEach(initFilters);
  document.querySelectorAll("[data-rail]").forEach(initRail);
  document.querySelectorAll("button[data-copy]").forEach(initCopy);
  document.querySelectorAll("form[data-contact]").forEach(initContactForm);
});
