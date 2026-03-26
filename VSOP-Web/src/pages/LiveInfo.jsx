import styles from './LiveInfo.module.css';
import { sendLog } from '../utils/logger';

export default function LiveInfo({ items, loading }) {
  if (loading) {
    return <p className={styles.empty}>読み込み中...</p>;
  }

  if (items.length === 0) {
    return (
      <div className={styles.emptyWrap}>
        <p className={styles.empty}>現在予定されているライブはありません</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {items.map((item, i) => (
        <LiveCard key={i} item={item} />
      ))}
    </div>
  );
}

function LiveCard({ item }) {
  const title = item['タイトル'] || item['title'] || '';
  const date = item['日付'] || item['date'] || '';
  const venue = item['会場'] || item['venue'] || '';
  const detail = item['詳細'] || item['detail'] || '';
  const flyerUrl = item['フライヤーURL'] || item['flyer'] || '';

  return (
    <div className={styles.card}>
      <div className={styles.badge}>UPCOMING</div>
      <div className={styles.cardInner}>
        <div className={styles.cardBody}>
          <div className={styles.date}>{date}</div>
          <h2 className={styles.title}>{title}</h2>
          {venue && (
          <div className={styles.venue}>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.venueLink}
              onClick={() => sendLog('click', { target: 'MAP', venue })}
            >
              {venue}
            </a>
          </div>
        )}
          {detail && <p className={styles.detail}>{detail}</p>}
        </div>
        {flyerUrl && (
          <a href={flyerUrl} target="_blank" rel="noopener noreferrer" className={styles.flyerLink} onClick={() => sendLog('click', { target: 'Flyer', title })}>
            <img src={flyerUrl} alt="フライヤー" className={styles.flyer} />
          </a>
        )}
      </div>
    </div>
  );
}
