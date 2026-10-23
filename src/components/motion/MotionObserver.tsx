"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global { interface Window { __motionReady?: boolean } }

// Revela os elementos marcados com data-reveal quando entram na tela, uma única vez.
// Só age quando o script do <head> marcou o documento com .motion-ok.
export function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    window.__motionReady = true;
    if (!document.documentElement.classList.contains("motion-ok")) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
