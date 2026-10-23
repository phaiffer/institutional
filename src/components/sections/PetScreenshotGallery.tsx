"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "@/app/demonstracoes/plataforma-gestao-pet/page.module.css";

// Usada nas páginas de produto (pet e tricologia); capturas fora de 16:10 informam o tamanho real.
type Screen = { file: string; title: string; alt: string; caption: string; width?: number; height?: number };

export function PetScreenshotGallery({ screens, assets }: { screens: Screen[]; assets: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const activeScreen = activeIndex === null ? null : screens[activeIndex];

  function open(index: number, button: HTMLButtonElement) {
    openerRef.current = button;
    setActiveIndex(index);
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
    setActiveIndex(null);
    requestAnimationFrame(() => openerRef.current?.focus());
  }

  function move(direction: -1 | 1) {
    setActiveIndex((current) => current === null ? null : (current + direction + screens.length) % screens.length);
  }

  return (
    <>
      <div className={styles.gallery}>
        {screens.map((screen, index) => {
          const src = `${assets}/${screen.file}`;
          return (
            <figure key={screen.file} className={styles.screen}>
              <button className={styles.thumbnail} type="button" onClick={(event) => open(index, event.currentTarget)} aria-label={`Ampliar captura: ${screen.title}`}>
                <Image src={src} width={screen.width ?? 1600} height={screen.height ?? 1000} alt={screen.alt} sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 560px" />
                <span className={styles.zoomHint}>Ampliar imagem <span aria-hidden="true">↗</span></span>
              </button>
              <figcaption><strong>{screen.title}</strong><span>{screen.caption}</span></figcaption>
            </figure>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        className={styles.viewer}
        aria-label="Visualizador de capturas da plataforma"
        onClose={() => setActiveIndex(null)}
        onClick={(event) => { if (event.target === dialogRef.current) close(); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        }}
      >
        {activeScreen && activeIndex !== null && (
          <div className={styles.viewerContent}>
            <div className={styles.viewerToolbar}>
              <div><strong>{activeScreen.title}</strong><span>{activeIndex + 1} de {screens.length}</span></div>
              <button className={styles.viewerClose} type="button" onClick={close} aria-label="Fechar visualizador">×</button>
            </div>
            <div className={styles.viewerImage}>
              <button className={styles.viewerArrow} type="button" onClick={() => move(-1)} aria-label="Ver imagem anterior">‹</button>
              <Image src={`${assets}/${activeScreen.file}`} width={activeScreen.width ?? 1600} height={activeScreen.height ?? 1000} alt={activeScreen.alt} priority />
              <button className={styles.viewerArrow} type="button" onClick={() => move(1)} aria-label="Ver próxima imagem">›</button>
            </div>
            <p className={styles.viewerCaption}>{activeScreen.caption}</p>
          </div>
        )}
      </dialog>
    </>
  );
}
