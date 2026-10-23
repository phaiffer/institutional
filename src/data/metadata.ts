import type { Metadata } from "next";
import { site } from "@/data/site";

const banner = { url: "/brand/brand-banner.png", width: 2172, height: 724, alt: "Identidade visual da PhaifferTech" };

// Metadados das páginas institucionais; as demonstrações definem os seus com imagem própria.
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "pt_BR", siteName: site.name, title: fullTitle, description, url: `${site.url}${path}`, images: [banner] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [banner.url] },
  };
}
