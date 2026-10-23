export const site = {
  name: "PhaifferTech",
  email: "phaiffertech@gmail.com",
  whatsapp: { label: "(41) 99629-4533", href: "https://wa.me/5541996294533?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20PhaifferTech." },
  url: "https://phaiffertech.com.br",
  tagline: "Conectamos tecnologia ao seu negócio.",
  description: "Consultoria em engenharia de software, dados, integração e arquitetura para conectar tecnologia aos desafios do negócio.",
} as const;

export const navigation = [
  { label: "Soluções", href: "/solucoes/" },
  { label: "Projetos", href: "/projetos/" },
  { label: "Como trabalhamos", href: "/como-trabalhamos/" },
] as const;

export const contactHref = "/contato/";

export const dataPlatform = {
  title: "Plataforma de Dados — Lakehouse Local",
  description: "Um fluxo de dados públicos históricos, da ingestão em Parquet aos modelos analíticos com dbt e DuckDB. Demonstração técnica com testes e resultados de uma execução local.",
  href: "/demonstracoes/plataforma-de-dados/",
  repository: "https://github.com/phaiffer/enterprise-industrial-data-platform",
  assets: "/demos/data-platform",
} as const;

export const nycLakehouse = {
  title: "Lakehouse NYC TLC com Spark e Delta Lake",
  description: "Quase 6 milhões de viagens públicas de táxi processadas em camadas Bronze, Silver e Gold, com contratos, regras de qualidade, monitoramento de drift e a origem de cada linha removida.",
  href: "/demonstracoes/lakehouse-nyc-tlc/",
  repository: "https://github.com/phaiffer/nyc-tlc-lakehouse",
  assets: "/demos/nyc-tlc",
} as const;

export const petPlatform = {
  title: "Plataforma de Gestão para Negócios Pet",
  description: "Produto próprio em desenvolvimento para organizar rotinas de pet shops, banho e tosa e clínicas veterinárias em uma aplicação.",
  href: "/demonstracoes/plataforma-gestao-pet/",
  assets: "/demos/pet-platform",
} as const;

export const trichologyPlatform = {
  title: "Plataforma Clínica de Tricologia",
  description: "Aplicação web para clínicas de tricologia, com prontuário, anamnese configurável, pontuação capilar explicada resposta a resposta, fotos de evolução e laudos em PDF.",
  href: "/demonstracoes/plataforma-clinica-tricologia/",
  repository: "https://github.com/phaiffer/trichology-clinic-platform",
  assets: "/demos/trichology",
} as const;

export const egc = {
  title: "Extended Global Context (EGC)",
  repository: "https://github.com/Fmarzochi/EGC",
  website: "https://fmarzochi.github.io/EGCSite/",
  videos: [
    { id: "A8M_98WdI0Q", title: "EGC Demo v2", author: "Willian Phaiffer", href: "https://youtu.be/A8M_98WdI0Q", poster: "/demos/egc/A8M_98WdI0Q-960.webp" },
    { id: "pXWsDcCe8TQ", title: "EGC Pitch EGCxSOL", author: "Felipe Marzochi", href: "https://www.youtube.com/watch?v=pXWsDcCe8TQ", poster: "/demos/egc/pXWsDcCe8TQ-960.webp" },
  ],
} as const;

// Lado de cada componente nos diagramas: navy representa o negócio, azul a tecnologia.
export type Side = "negocio" | "tecnologia";
export type DiagramNode = { label: string; side: Side; detail: string };

export const disciplines = [
  {
    id: "software", label: "Software", title: "Engenharia de software",
    intro: "Aplicações, plataformas e APIs sob medida, para sistemas que precisam nascer, integrar ou evoluir.",
    when: ["O processo não cabe em uma ferramenta pronta.", "Um sistema existente precisa evoluir sem parar a operação.", "Vários sistemas precisam de uma API em comum."],
    deliveries: ["Aplicações web e sistemas corporativos.", "Plataformas SaaS.", "APIs e microsserviços.", "Modernização de aplicações."],
    tech: ["React", "TypeScript", "Java", "Spring Boot", "PostgreSQL"],
    diagram: { title: "Camadas de uma aplicação", nodes: [
      { label: "Quem usa", side: "negocio", detail: "Quem vai usar o sistema, com que permissões e em que momento da rotina. Esse levantamento vem antes das telas." },
      { label: "Interface", side: "tecnologia", detail: "Telas pensadas para a tarefa: menos campos, estados claros e funcionamento no celular quando a rotina pede." },
      { label: "API", side: "tecnologia", detail: "Contratos estáveis entre a interface, as regras e outros sistemas, com autenticação e validação na entrada." },
      { label: "Regras de negócio", side: "tecnologia", detail: "Onde ficam cálculos e decisões do processo, isolados e cobertos por testes, para mudar sem quebrar o resto." },
      { label: "Banco de dados", side: "tecnologia", detail: "Modelo de dados e migrações versionadas, para que a estrutura evolua junto com o sistema." },
    ] as DiagramNode[] },
    evidence: [{ label: trichologyPlatform.title, href: trichologyPlatform.href }],
  },
  {
    id: "dados", label: "Dados", title: "Engenharia de dados",
    intro: "Fontes dispersas transformadas em fluxos e estruturas confiáveis para análise e decisão.",
    when: ["Cada área chega com um número diferente.", "Relatórios são montados à mão toda semana.", "A informação está espalhada em sistemas e planilhas."],
    deliveries: ["Arquitetura de dados.", "Pipelines ETL e ELT.", "Data lakes e lakehouses.", "Qualidade e governança de dados.", "Analytics e BI."],
    tech: ["Python", "SQL", "Spark", "Delta Lake", "dbt"],
    diagram: { title: "Fluxo de dados em camadas", nodes: [
      { label: "Fontes", side: "negocio", detail: "Sistemas, arquivos e APIs onde a informação nasce. O primeiro passo é saber quem responde por cada fonte e com que frequência ela muda." },
      { label: "Ingestão", side: "tecnologia", detail: "Guarda os dados como chegaram, com data e origem registradas, para que qualquer número possa ser reconstruído." },
      { label: "Limpeza e contrato", side: "tecnologia", detail: "Padroniza tipos, remove duplicatas e aplica regras escritas. Cada linha descartada fica associada à regra que a removeu." },
      { label: "Modelos e qualidade", side: "tecnologia", detail: "Tabelas no formato das perguntas do negócio, verificadas a cada execução e comparadas entre períodos para revelar mudanças inesperadas." },
      { label: "Consumo", side: "negocio", detail: "Painéis, relatórios e outros sistemas que usam os dados. É ali que a informação volta a ser decisão." },
    ] as DiagramNode[] },
    evidence: [{ label: nycLakehouse.title, href: nycLakehouse.href }, { label: dataPlatform.title, href: dataPlatform.href }],
  },
  {
    id: "arquitetura", label: "Arquitetura e cloud", title: "Arquitetura e cloud",
    intro: "Desenho de soluções que respeitam o contexto, as restrições e a evolução do negócio.",
    when: ["O sistema ficou difícil de manter ou de escalar.", "Há uma migração para a nuvem pela frente.", "Decisões técnicas importantes não estão registradas."],
    deliveries: ["Modelagem e arquitetura de aplicações.", "Arquitetura em nuvem com AWS, Azure ou GCP.", "Deploy e automação.", "Estratégia de modernização."],
    tech: ["AWS", "Azure", "GCP", "Docker", "Observabilidade"],
    diagram: { title: "Decisões de arquitetura", nodes: [
      { label: "Contexto", side: "negocio", detail: "Volume de uso, tamanho da equipe, orçamento e prazo. São essas restrições que definem a arquitetura." },
      { label: "Módulos", side: "tecnologia", detail: "Fronteiras claras entre as partes do sistema, para que cada uma possa mudar sem arrastar as outras." },
      { label: "Contratos", side: "tecnologia", detail: "Como módulos e serviços conversam: APIs, eventos e versões combinadas." },
      { label: "Infraestrutura", side: "tecnologia", detail: "Ambientes, containers, deploy automatizado e configuração fora do código." },
      { label: "Observabilidade", side: "tecnologia", detail: "Logs, métricas e alertas para saber o que acontece em produção antes que o usuário precise avisar." },
    ] as DiagramNode[] },
    evidence: [],
  },
  {
    id: "integracao", label: "Integração", title: "Integração e automação",
    intro: "Plataformas conectadas e tarefas operacionais repetitivas reduzidas.",
    when: ["A mesma informação é digitada em mais de um sistema.", "Uma tarefa repetitiva consome horas toda semana.", "Plataformas da empresa não se comunicam."],
    deliveries: ["Integração de APIs.", "Automação de processos.", "Comunicação entre plataformas.", "Fluxos personalizados."],
    tech: ["APIs", "Webhooks", "Eventos", "Filas"],
    diagram: { title: "Percurso de uma integração", nodes: [
      { label: "Sistema de origem", side: "negocio", detail: "Onde o fato acontece: uma venda, um agendamento, um cadastro." },
      { label: "Evento", side: "tecnologia", detail: "O registro do que aconteceu, enviado por webhook ou lido por API, com um identificador para evitar duplicidade." },
      { label: "Fila e regras", side: "tecnologia", detail: "Organiza o processamento, aplica transformações e permite tentar de novo quando algo falha." },
      { label: "Sistema de destino", side: "tecnologia", detail: "Recebe a informação já no formato de que precisa, sem digitação repetida." },
      { label: "Acompanhamento", side: "negocio", detail: "Registro de cada envio e alerta quando algo não chega, para que a equipe possa confiar na automação." },
    ] as DiagramNode[] },
    evidence: [],
  },
] as const;

// Situações descritas de forma genérica; não representam clientes.
export const frictions = [
  { title: "Sistemas que não se comunicam", routine: "A mesma informação é digitada em duas ferramentas, e alguém confere à mão qual delas está certa.", approach: "Mapeamos onde cada dado nasce e ligamos os sistemas por API, webhook ou fila, com registro e nova tentativa quando algo falha.", disciplines: ["integracao", "software"], link: { label: "Como uma integração é montada", href: "/solucoes/#integracao", evidence: false } },
  { title: "Processos repetitivos", routine: "Planilhas copiadas, relatórios montados à mão e conferências que tomam horas toda semana.", approach: "Automatizamos o trecho repetitivo e mantemos a pessoa no ponto de decisão, com registro do que foi feito automaticamente.", disciplines: ["integracao"], link: { label: "Do evento ao sistema de destino", href: "/solucoes/#integracao", evidence: false } },
  { title: "Dados espalhados", routine: "Cada área tem o seu número, e a reunião começa discutindo qual planilha está certa.", approach: "Reunimos as fontes em um fluxo em camadas, com regras de qualidade escritas e a origem de cada número rastreável.", disciplines: ["dados"], link: { label: nycLakehouse.title, href: nycLakehouse.href, evidence: true } },
  { title: "Sistema difícil de manter", routine: "Cada mudança quebra outra parte, e poucas pessoas sabem como o sistema funciona.", approach: "Mapeamos módulos e dependências, cobrimos o comportamento atual com testes e modernizamos por partes, sem parar a operação.", disciplines: ["arquitetura", "software"], link: { label: "Como pensamos arquitetura", href: "/solucoes/#arquitetura", evidence: false } },
  { title: "Processo sem ferramenta pronta", routine: "O processo da empresa não cabe em um software de prateleira, e as adaptações viraram planilhas paralelas.", approach: "Desenvolvemos a aplicação sob medida, em etapas, começando pelo fluxo que mais pesa na rotina.", disciplines: ["software"], link: { label: trichologyPlatform.title, href: trichologyPlatform.href, evidence: true } },
] as const;

export type ProjectKind = "produto" | "demo" | "opensource";

export const projectKinds: { id: ProjectKind; label: string }[] = [
  { id: "produto", label: "Produtos próprios" },
  { id: "demo", label: "Demonstrações técnicas" },
  { id: "opensource", label: "Open source" },
];

// Ficha de cada projeto: estágio real, o que demonstra, evidência e limites.
export const portfolio = [
  {
    id: "lakehouse-nyc-tlc", kind: "demo", category: "Demonstração técnica", title: nycLakehouse.title,
    short: "Quase 6 milhões de viagens públicas em camadas, com a origem de cada linha removida.",
    summary: "Viagens públicas de táxi de Nova York processadas em camadas Bronze, Silver e Gold, com contrato versionado, regras de qualidade e monitoramento de drift entre meses.",
    stage: "Execução local registrada", demonstrates: "Rastreabilidade: cada linha removida fica associada à regra que a removeu.",
    tech: "Python, PySpark, Delta Lake", evidence: "Execução de janeiro e fevereiro de 2024 registrada no repositório, com CI aprovada.",
    image: { src: `${nycLakehouse.assets}/card-960.webp`, width: 960, height: 600, alt: "Gráfico de viagens diárias por fornecedor em janeiro e fevereiro de 2024, calculado a partir da camada Gold" },
    links: [{ label: "Ver demonstração", href: nycLakehouse.href }, { label: "Código no GitHub", href: nycLakehouse.repository }],
  },
  {
    id: "tricologia", kind: "produto", category: "Produto próprio", title: trichologyPlatform.title,
    short: "Prontuário, anamnese configurável, pontuação explicada e laudos em PDF.",
    summary: "Aplicação web para o atendimento em tricologia: prontuário, anamnese configurável, pontuação capilar explicada resposta a resposta, fotos de evolução e laudos em PDF.",
    stage: "Em desenvolvimento · execução local", demonstrates: "Regras de negócio explicáveis e histórico preservado quando um modelo de anamnese muda.",
    tech: "Next.js, Spring Boot 3.3 com Java 21, PostgreSQL com Flyway", evidence: "Repositório público, testes de integração no backend e capturas com dados fictícios.",
    limits: "Proteção contra CSRF pendente antes de qualquer uso fora do ambiente local.",
    image: { src: `${trichologyPlatform.assets}/card-960.webp`, width: 960, height: 600, alt: "Tela de resultado da pontuação capilar de uma paciente fictícia, com a contribuição de cada resposta" },
    links: [{ label: "Ver demonstração", href: trichologyPlatform.href }, { label: "Código no GitHub", href: trichologyPlatform.repository }],
  },
  {
    id: "pet", kind: "produto", category: "Produto próprio", title: petPlatform.title,
    short: "Agenda, estoque e rotinas clínicas de negócios pet em uma aplicação.",
    summary: "Aplicação em desenvolvimento para reunir rotinas de pet shops, banho e tosa e clínicas veterinárias: agenda, estoque, cobrança e rotinas clínicas.",
    stage: "Em desenvolvimento", demonstrates: "Vários fluxos operacionais conectados em uma mesma aplicação.",
    evidence: "Capturas do ambiente de demonstração, com dados fictícios.", limits: "Sem nome comercial definido; não está em operação comercial.",
    image: { src: `${petPlatform.assets}/dashboard-960.webp`, width: 960, height: 600, alt: "Painel operacional da demonstração da plataforma pet, com indicadores fictícios" },
    links: [{ label: "Ver demonstração", href: petPlatform.href }],
  },
  {
    id: "lakehouse-local", kind: "demo", category: "Demonstração técnica", title: dataPlatform.title,
    short: "Da ingestão em Parquet aos modelos com dbt e DuckDB, com testes registrados.",
    summary: "Dois conjuntos públicos históricos, da ingestão em Parquet aos modelos analíticos com dbt e DuckDB, com verificações de qualidade.",
    stage: "Execução local registrada", demonstrates: "Camadas Bronze, Silver e Gold com testes de dados a cada execução.",
    tech: "Python, Parquet, dbt, DuckDB, Great Expectations", evidence: "Registro de execução com manifesto e hashes dos gráficos.",
    limits: "Dados públicos ilustrativos; não é uma operação industrial.",
    image: { src: `${dataPlatform.assets}/overview-960.webp`, width: 960, height: 600, alt: "Captura do showcase da demonstração local, com camadas de dados e resultados da amostra" },
    links: [{ label: "Ver demonstração", href: dataPlatform.href }, { label: "Código no GitHub", href: dataPlatform.repository }],
  },
  {
    id: "egc", kind: "opensource", category: "Open source", title: egc.title,
    short: "Contribuição individual para um projeto aberto de gestão de contexto em IA.",
    summary: "Projeto aberto dedicado a ferramentas e gestão de contexto no desenvolvimento assistido por IA.",
    stage: "Contribuição individual", demonstrates: "Trabalho em projeto aberto, com revisão e colaboração pública.",
    limits: "A participação é individual e não implica titularidade da PhaifferTech.",
    links: [{ label: "Website", href: egc.website }, { label: "GitHub", href: egc.repository }],
  },
] as const;

export const process = [
  { title: "Descoberta", detail: "Entendemos objetivos, contexto, sistemas existentes e restrições.", receive: "Um resumo escrito do problema, do contexto e do que fica fora do escopo." },
  { title: "Arquitetura", detail: "Definimos prioridades e um desenho técnico viável para o problema.", receive: "O desenho da solução, as prioridades e o motivo de cada escolha." },
  { title: "Desenvolvimento", detail: "Construímos e validamos a solução em etapas combinadas.", receive: "Entregas parciais utilizáveis e o registro do que foi validado." },
  { title: "Evolução", detail: "Acompanhamos o resultado e planejamos os próximos ajustes.", receive: "Uma lista priorizada de ajustes com base no uso real." },
] as const;
