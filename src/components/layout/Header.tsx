"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactHref, navigation } from "@/data/site";

const normalize = (path: string) => path.replace(/\/+$/, "") || "/";

export function Header() {
  const pathname = normalize(usePathname());
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const current = (href: string) => (pathname === normalize(href) ? "page" : undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return <header className={`site-header${scrolled ? " is-scrolled" : ""}`} id="topo">
    <div className="container nav-row">
      <Link className="brand" href="/" aria-label="PhaifferTech, página inicial"><Image src="/brand/logo-light-400.png" width={400} height={76} alt="PhaifferTech" priority /></Link>
      <nav className="desktop-nav" aria-label="Navegação principal">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={current(item.href)}>{item.label}</Link>)}</nav>
      <Link className="nav-contact" href={contactHref} aria-current={current(contactHref)}>Vamos conversar</Link>
      <button className="menu-toggle" type="button" aria-controls="mobile-nav" aria-expanded={open} aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}><span /><span /><span /></button>
    </div>
    <nav id="mobile-nav" className="mobile-nav" aria-label="Navegação móvel" hidden={!open}>
      {[...navigation, { label: "Contato", href: contactHref }].map(item => <Link key={item.href} href={item.href} aria-current={current(item.href)} onClick={() => setOpen(false)}>{item.label}</Link>)}
    </nav>
  </header>;
}
