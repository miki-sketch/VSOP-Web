import { useRef, useEffect } from 'react';
import styles from './Movie.module.css';
import { sendLog } from '../utils/logger';

function getYouTubeId(url) {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
}

export default function Movie({ items, loading }) {
  if (loading) {
    return <p className={styles.empty}>読み込み中...</p>;
  }

  if (items.length === 0) {
    return (
      <div className={styles.emptyWrap}>
        <p className={styles.empty}>動画はまだありません</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {items.map((item, i) => (
        <VideoCard key={i} item={item} />
      ))}
    </div>
  );
}

function VideoCard({ item }) {
  const title = item['タイトル'] || item['title'] || '';
  const url = item['YouTubeURL'] || item['url'] || '';
  const desc = item['説明文'] || item['description'] || '';
  const videoId = getYouTubeId(url);
  const hovering = useRef(false);

  useEffect(() => {
    const onBlur = () => {
      if (hovering.current) sendLog('click', { target: 'YouTube', title });
    };
    window.addEventListener('blur', onBlur);
    return () => window.removeEventListener('blur', onBlur);
  }, [title]);

  return (
    <div
      className={styles.card}
      onMouseEnter={() => { hovering.current = true; }}
      onMouseLeave={() => { hovering.current = false; }}
    >
      {videoId ? (
        <div className={styles.embedWrap}>
          <iframe
            className={styles.iframe}
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : url ? (
        <div className={styles.embedWrap}>
          <div className={styles.noEmbed}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              動画を開く
            </a>
          </div>
        </div>
      ) : null}
      <div className={styles.info}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {desc && <p className={styles.desc}>{desc}</p>}
      </div>
    </div>
  );
}
