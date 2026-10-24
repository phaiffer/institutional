import type { Metadata, Viewport } from "next";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import "./globals.css";
import { site } from "@/data/site";
import { MotionObserver } from "@/components/motion/MotionObserver";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "PhaifferTech | Conectamos tecnologia ao seu negócio",
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "pt_BR", url: site.url, siteName: site.name, title: `${site.name} | ${site.tagline}`, description: site.description, images: [{ url: "/brand/brand-banner.png", width: 2172, height: 724, alt: "Identidade visual da PhaifferTech" }] },
  twitter: { card: "summary_large_image", title: `${site.name} | ${site.tagline}`, description: site.description, images: ["/brand/brand-banner.png"] },
  icons: { icon: [{ url: "/brand/icon.svg", type: "image/svg+xml" }, { url: "/brand/icon-32.png", sizes: "32x32", type: "image/png" }], apple: { url: "/brand/icon-180.png", sizes: "180x180" } },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0b2945" };

// Antes da primeira pintura: aplica o tema escolhido pelo visitante (sem escolha, vale o do sistema)
// e marca o documento para que os elementos animados não pisquem.
// Sem JavaScript, ou com movimento reduzido, a classe não é aplicada e tudo fica visível.
const motionScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}})();(function(){try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;var d=document.documentElement;d.classList.add("motion-ok");setTimeout(function(){if(!window.__motionReady)d.classList.add("motion-fallback")},4000)}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" data-scroll-behavior="smooth" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: motionScript }} /></head><body id="topo">{children}<MotionObserver /></body></html>;
}
