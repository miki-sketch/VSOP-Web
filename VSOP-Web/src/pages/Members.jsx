import { useState, useMemo } from 'react';
import styles from './Members.module.css';

function toDriveImageUrl(url) {
  if (!url) return null;
  const m = url.match(/[?&]id=([\w-]+)/);
  if (m) return `https://lh3.googleusercontent.com/d/${m[1]}`;
  return url;
}

function getInitials(part) {
  if (!part) return '?';
  // 英数字の場合はそのまま最大3文字
  if (/^[A-Za-z]/.test(part)) {
    return part.slice(0, 3);
  }
  // 日本語パート名から略称を生成
  const map = {
    'ギター': 'Gt',
    'ベース': 'Ba',
    'ドラム': 'Dr',
    'キーボード': 'Key',
    'ボーカル': 'Vo',
    'トランペット': 'Tp',
    'トロンボーン': 'Tb',
    'サックス': 'Sax',
    'パーカッション': 'Per',
  };
  for (const [key, val] of Object.entries(map)) {
    if (part.includes(key)) return val;
  }
  return part.slice(0, 2);
}

export default function Members({ items, loading }) {
  const shuffled = useMemo(() => {
    return [...items].sort(() => Math.random() - 0.5);
  }, [items]);

  if (loading) {
    return <p className={styles.empty}>読み込み中...</p>;
  }

  if (items.length === 0) {
    return (
      <div className={styles.emptyWrap}>
        <p className={styles.empty}>メンバー情報はまだありません</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {shuffled.map((item, i) => (
        <MemberCard key={i} item={item} />
      ))}
    </div>
  );
}

function MemberCard({ item }) {
  const name = item['名前'] || item['name'] || '';
  const part = item['パート'] || item['part'] || '';
  const comment = item['コメント'] || item['comment'] || '';
  const photoUrl = toDriveImageUrl(item['写真URL'] ?? '');
  const initials = getInitials(part);
  const [imgError, setImgError] = useState(false);

  const showPhoto = photoUrl && !imgError;

  return (
    <div className={styles.card}>
      {showPhoto ? (
        <img
          src={photoUrl}
          alt={name}
          className={styles.photo}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className={styles.icon}>{initials}</div>
      )}
      <div className={styles.body}>
        <div className={styles.name}>{name}</div>
        {part && <div className={styles.part}>{part}</div>}
        {comment && <p className={styles.comment}>{comment}</p>}
      </div>
    </div>
  );
}
