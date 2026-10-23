import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";

const html = readFileSync(new URL("../out/index.html", import.meta.url), "utf8");
const demoPath = "/demonstracoes/plataforma-de-dados/";
const demoHtml = readFileSync(new URL(`../out${demoPath}index.html`, import.meta.url), "utf8");
const demoText = demoHtml.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]*>/g, "");
const petPath = "/demonstracoes/plataforma-gestao-pet/";
const petHtml = readFileSync(new URL(`../out${petPath}index.html`, import.meta.url), "utf8");
const nycPath = "/demonstracoes/lakehouse-nyc-tlc/";
const nycHtml = readFileSync(new URL(`../out${nycPath}index.html`, import.meta.url), "utf8");
const spendingPath = "/demonstracoes/gastos-publicos-federais/";
const spendingHtml = readFileSync(new URL(`../out${spendingPath}index.html`, import.meta.url), "utf8");
const trichologyPath = "/demonstracoes/plataforma-clinica-tricologia/";
const trichologyHtml = readFileSync(new URL(`../out${trichologyPath}index.html`, import.meta.url), "utf8");
const institutionalPaths = ["/solucoes/", "/projetos/", "/como-trabalhamos/", "/contato/"];
const institutional = new Map(institutionalPaths.map(path => [path, readFileSync(new URL(`../out${path}index.html`, import.meta.url), "utf8")]));
const pages = new Map([["/", html], [demoPath, demoHtml], [petPath, petHtml], [nycPath, nycHtml], [spendingPath, spendingHtml], [trichologyPath, trichologyHtml], ...institutional]);

test("publica HTML pré-renderizado com conteúdo institucional essencial", () => {
  for (const text of ["Conectamos tecnologia", "Plataforma de Gestão para Negócios Pet", "Extended Global Context", "Plataforma de Dados", "phaiffertech@gmail.com"]) {
    assert.ok(html.includes(text), `Conteúdo ausente: ${text}`);
  }
  assert.ok(!html.includes("PetFlow"));
  assert.ok(!html.includes("willian.phaifferc@outlook.com"));
});

test("âncoras internas apontam para IDs existentes", () => {
  for (const [path, page] of pages) {
    for (const match of page.matchAll(/href="((?:\/|#)[^"]*)"/g)) {
      const target = new URL(match[1], `https://phaiffertech.com.br${path}`);
      if (!target.hash) continue;
      const targetPage = pages.get(target.pathname);
      assert.ok(targetPage, `Página da âncora ausente: ${target.pathname}`);
      const ids = new Set([...targetPage.matchAll(/\bid="([^"]+)"/g)].map(item => item[1]));
      assert.ok(ids.has(decodeURIComponent(target.hash.slice(1))), `Âncora inexistente: ${target.href}`);
    }
  }
});

test("artefato estático inclui domínio e recursos essenciais", () => {
  for (const path of ["out/CNAME", "out/404.html", "out/robots.txt", "out/sitemap.xml", "out/brand/logo-light.png", "out/brand/symbol.png"]) {
    assert.ok(existsSync(new URL(`../${path}`, import.meta.url)), `Arquivo ausente: ${path}`);
  }
  assert.equal(readFileSync(new URL("../out/CNAME", import.meta.url), "utf8").trim(), "phaiffertech.com.br");
});

test("recursos locais referenciados pelo HTML existem no output", () => {
  for (const page of pages.values()) {
    for (const match of page.matchAll(/(?:href|src)="(\/[^\"]*)"/g)) {
      const target = new URL(match[1], "https://phaiffertech.com.br");
      const path = target.pathname.endsWith("/") ? `${target.pathname}index.html` : target.pathname;
      assert.ok(existsSync(new URL(`../out${path}`, import.meta.url)), `Recurso ausente: ${path}`);
    }
  }
});

test("a demonstração exportada está ligada à homepage, ao sitemap e aos metadados próprios", () => {
  assert.ok(html.includes(`href="${demoPath}"`));
  assert.ok(demoHtml.includes("Demonstração técnica"));
  assert.ok(demoHtml.includes("dados públicos históricos"));
  assert.ok(!demoHtml.includes("PetFlow"));
  const canonical = `https://phaiffertech.com.br${demoPath}`;
  assert.ok(demoHtml.includes(`rel="canonical" href="${canonical}"`));
  assert.ok(demoHtml.includes(`property="og:url" content="${canonical}"`));
  assert.ok(demoHtml.includes('name="twitter:card" content="summary_large_image"'));
  const sitemap = readFileSync(new URL("../out/sitemap.xml", import.meta.url), "utf8");
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`));
});

test("a demonstração pet está ligada à homepage, explica os dados fictícios e usa metadados próprios", () => {
  assert.ok(html.includes(`href="${petPath}"`));
  assert.ok(petHtml.includes("são fictícios"));
  assert.ok(petHtml.includes("rótulo provisório"));
  assert.ok(!petHtml.includes("PetFlow"));
  for (const file of ["dashboard.webp", "agenda.webp", "estoque.webp", "clinica.webp"]) {
    assert.ok(petHtml.includes(`/demos/pet-platform/${file}`), `Captura ausente: ${file}`);
  }
  const canonical = `https://phaiffertech.com.br${petPath}`;
  assert.ok(petHtml.includes(`rel="canonical" href="${canonical}"`));
  const sitemap = readFileSync(new URL("../out/sitemap.xml", import.meta.url), "utf8");
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`));
});

test("a demonstração de gastos públicos mostra os números do resumo publicado e usa metadados próprios", () => {
  assert.ok(html.includes(`href="${spendingPath}"`));
  assert.ok(spendingHtml.includes("não interpretam o orçamento"));
  const summary = JSON.parse(readFileSync(new URL("../out/demos/public-spending/summary.json", import.meta.url), "utf8"));
  const number = new Intl.NumberFormat("pt-BR");
  for (const value of [summary.rows, summary.distinct_beneficiary_ids, summary.negative_rows, summary.treasury_operations.rows]) {
    assert.ok(spendingHtml.includes(number.format(value)), `Número ausente: ${value}`);
  }
  // Os totais por ano fecham com o total geral e as linhas com a contagem da fonte
  assert.equal(summary.years.reduce((sum, year) => sum + year.rows, 0), summary.rows);
  assert.equal(summary.years.reduce((sum, year) => sum + year.months, 0), summary.months);
  assert.ok(Math.abs(summary.years.reduce((sum, year) => sum + year.net_all_brl, 0) - summary.net_all_brl) < 1);
  assert.ok(Math.abs(summary.net_all_brl - summary.treasury_operations.net_brl - summary.treasury_management_units.net_brl - summary.net_default_brl) < 1);
  for (const file of ["dashboard-light.webp", "dashboard-dark.webp", "summary.json", "og.png"]) {
    assert.ok(spendingHtml.includes(`/demos/public-spending/${file}`), `Recurso ausente: ${file}`);
  }
  const canonical = `https://phaiffertech.com.br${spendingPath}`;
  assert.ok(spendingHtml.includes(`rel="canonical" href="${canonical}"`));
  const sitemap = readFileSync(new URL("../out/sitemap.xml", import.meta.url), "utf8");
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`));
});

test("a demonstração NYC TLC está ligada à homepage, mostra a execução registrada e usa metadados próprios", () => {
  assert.ok(html.includes(`href="${nycPath}"`));
  assert.ok(nycHtml.includes("dados públicos da NYC Taxi"));
  assert.ok(nycHtml.includes("não representam resultados de clientes"));
  for (const file of ["architecture.svg", "trips_daily.svg", "execution_summary.svg", "showcase_results.json", "og.png"]) {
    assert.ok(nycHtml.includes(`/demos/nyc-tlc/${file}`), `Recurso ausente: ${file}`);
  }
  const evidence = JSON.parse(readFileSync(new URL("../out/demos/nyc-tlc/showcase_results.json", import.meta.url), "utf8"));
  const cleanTrips = evidence.runs.reduce((sum, run) => sum + run.silver_rows, 0);
  assert.ok(nycHtml.includes(new Intl.NumberFormat("pt-BR").format(cleanTrips)));
  const canonical = `https://phaiffertech.com.br${nycPath}`;
  assert.ok(nycHtml.includes(`rel="canonical" href="${canonical}"`));
  assert.ok(nycHtml.includes(`property="og:url" content="${canonical}"`));
  const sitemap = readFileSync(new URL("../out/sitemap.xml", import.meta.url), "utf8");
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`));
});

test("a demonstração de tricologia está ligada à homepage, explica os dados fictícios e usa metadados próprios", () => {
  assert.ok(html.includes(`href="${trichologyPath}"`));
  assert.ok(trichologyHtml.includes("são fictícios"));
  assert.ok(trichologyHtml.includes("operação em produção"));
  for (const file of ["score.webp", "anamnesis-template.webp", "report.webp", "patients.webp", "og.png"]) {
    assert.ok(trichologyHtml.includes(`/demos/trichology/${file}`), `Recurso ausente: ${file}`);
  }
  const canonical = `https://phaiffertech.com.br${trichologyPath}`;
  assert.ok(trichologyHtml.includes(`rel="canonical" href="${canonical}"`));
  assert.ok(trichologyHtml.includes(`property="og:url" content="${canonical}"`));
  const sitemap = readFileSync(new URL("../out/sitemap.xml", import.meta.url), "utf8");
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`));
});

test("as páginas institucionais têm metadados próprios, entram no sitemap e marcam a página atual", () => {
  const sitemap = readFileSync(new URL("../out/sitemap.xml", import.meta.url), "utf8");
  for (const [path, page] of institutional) {
    const canonical = `https://phaiffertech.com.br${path}`;
    assert.ok(page.includes(`rel="canonical" href="${canonical}"`), `Canonical ausente: ${path}`);
    assert.ok(page.includes(`property="og:url" content="${canonical}"`), `og:url ausente: ${path}`);
    assert.ok(sitemap.includes(`<loc>${canonical}</loc>`), `Fora do sitemap: ${path}`);
    const current = [...page.matchAll(/<a\b[^>]*>/g)].some(([tag]) => tag.includes(`href="${path}"`) && tag.includes('aria-current="page"'));
    assert.ok(current, `Página atual não marcada: ${path}`);
    assert.ok(html.includes(`href="${path}"`), `Home sem link para: ${path}`);
  }
  const projects = institutional.get("/projetos/");
  for (const path of [demoPath, petPath, nycPath, spendingPath, trichologyPath]) assert.ok(projects.includes(`href="${path}"`), `Projetos sem link para: ${path}`);
  assert.ok(institutional.get("/contato/").includes("Nada é enviado por este site"));
  for (const page of [html, institutional.get("/contato/")]) assert.ok(page.includes('href="https://wa.me/5541996294533'), "WhatsApp ausente");
});

test("a home usa ícones e imagens leves", () => {
  assert.ok(html.includes('href="/brand/icon-32.png"'));
  assert.ok(!/rel="icon"[^>]*symbol\.png/.test(html));
  assert.ok(!html.includes("/demos/nyc-tlc/card.png"));
  assert.ok(html.includes("/demos/nyc-tlc/card-960.webp"));
});

test("os gráficos exportados correspondem aos hashes do manifesto e aos resultados exibidos", () => {
  const root = new URL("../out/demos/data-platform/", import.meta.url);
  const manifest = JSON.parse(readFileSync(new URL("manifest.json", root), "utf8"));
  assert.equal(manifest.kind, "technical_demo_snapshot");
  assert.ok(demoHtml.includes(manifest.run_id));
  assert.ok(demoText.includes(`${manifest.dbt_tests.passed}/${manifest.dbt_tests.total}`));
  for (const count of Object.values(manifest.row_counts).filter(value => typeof value === "number")) {
    assert.ok(demoHtml.includes(new Intl.NumberFormat("pt-BR").format(count)));
  }
  for (const [filename, expectedHash] of Object.entries(manifest.images_sha256)) {
    const actualHash = createHash("sha256").update(readFileSync(new URL(filename, root))).digest("hex");
    assert.equal(actualHash, expectedHash, `Gráfico diferente do manifesto: ${filename}`);
  }
});
