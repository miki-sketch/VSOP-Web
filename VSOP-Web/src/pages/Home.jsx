import styles from './Home.module.css';
import { sendLog } from '../utils/logger';

const HERO_BG = 'https://lh3.googleusercontent.com/d/1Sc8gh8BviUpeAwynhNstwDUxURPZT-Rs';

const NAV_ITEMS = [
  { id: 'live', label: 'LIVE INFO' },
  { id: 'movie', label: 'MOVIE' },
  { id: 'members', label: 'MEMBERS' },
];

export default function Home({ onNavigate }) {
  return (
    <div>
      {/* ── Hero ── */}
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${HERO_BG})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroMarquee}>
          <span className={styles.heroMarqueeTrack}>
            Built with React / Vite / Google Sheets　｜　Developed with Claude ( Anthropic )
          </span>
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>VSOP</h1>
          <p className={styles.heroSub}>FUNK BAND / TOKYO</p>
          <p className={styles.heroCatch}>
            おもちゃ箱をひっくり返したような、ごきげんなファンクサウンド
          </p>
          <nav className={styles.heroNav}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={styles.heroNavBtn}
                onClick={() => onNavigate(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <a
            href="https://www.facebook.com/vsop.omochabako"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.heroNavBtn}
            onClick={() => sendLog('click', { target: 'Facebook' })}
          >
            ▶ Facebook
          </a>
        </div>
      </section>

      {/* ── About ── */}
      <section className={styles.about}>
        <div className={styles.aboutInner}>
          <div className={styles.aboutText}>
            <h2 className={styles.aboutTitle}>ABOUT</h2>
            <p className={styles.aboutDesc}>
              VSOPは東京を拠点に活動するおとなのファンクバンド。{'\n'}
              ジャンルを超えたごきげんなサウンドで、{'\n'}
              ライブハウスを笑顔と踊りで埋め尽くす。{'\n'}
              メンバーそれぞれの個性が炸裂する、{'\n'}
              まさにおもちゃ箱のようなステージをお楽しみください。
            </p>
          </div>
          <div className={styles.aboutWidget}>
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fvsop.omochabako&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="340"
              height="500"
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
