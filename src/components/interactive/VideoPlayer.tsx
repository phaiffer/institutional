"use client";

import Image from "next/image";
import { useState } from "react";

type Video = { id: string; title: string; author: string; href: string; poster: string };

// Mostra o pôster local e só carrega o player do YouTube quando o visitante pede para assistir.
// Sem JavaScript, o pôster continua sendo um link para o vídeo no YouTube.
export function VideoPlayer({ videos }: { videos: readonly Video[] }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const video = videos[current];

  return (
    <div className="video">
      <div className="video-frame">
        {playing
          ? <iframe key={video.id} src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`} title={`${video.title}, por ${video.author}`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
          : <a className="video-poster" href={video.href} target="_blank" rel="noopener noreferrer" onClick={(event) => { event.preventDefault(); setPlaying(true); }}>
            <Image className="skeleton" src={video.poster} width={960} height={540} alt="" sizes="(max-width: 980px) 100vw, 460px" loading="lazy" />
            <span className="video-play"><i aria-hidden="true">▶</i>Assistir {video.title}</span>
          </a>}
      </div>
      {videos.length > 1 && <ul className="video-list" aria-label="Vídeos">
        {videos.map((item, index) => <li key={item.id}>
          <button type="button" aria-pressed={index === current} onClick={() => setCurrent(index)}>
            <strong>{item.title}</strong><small>por {item.author}</small>
          </button>
        </li>)}
      </ul>}
    </div>
  );
}
