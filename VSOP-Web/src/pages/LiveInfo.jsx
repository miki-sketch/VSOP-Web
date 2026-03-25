import styles from './LiveInfo.module.css';

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

  return (
    <div className={styles.card}>
      <div className={styles.badge}>UPCOMING</div>
      <div className={styles.cardBody}>
        <div className={styles.date}>{date}</div>
        <h2 className={styles.title}>{title}</h2>
        {venue && <div className={styles.venue}>{venue}</div>}
        {detail && <p className={styles.detail}>{detail}</p>}
      </div>
    </div>
  );
}
