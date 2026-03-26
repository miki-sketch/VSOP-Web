import { useState, useEffect } from 'react';
import { fetchSheet } from './utils/csv';
import { GIDS } from './config';
import { sendLog } from './utils/logger';
import Home from './pages/Home';
import LiveInfo from './pages/LiveInfo';
import Movie from './pages/Movie';
import Members from './pages/Members';
import styles from './App.module.css';

const NAV_ITEMS = [
  { id: 'live', label: 'LIVE INFO' },
  { id: 'movie', label: 'MOVIE' },
  { id: 'members', label: 'MEMBERS' },
];

export default function App() {
  const [page, setPage] = useState('home');

  function navigate(tabName) {
    setPage(tabName);
    if (tabName !== 'home') sendLog('access', { page: tabName });
  }
  const [announces, setAnnounces] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [ann, hl, mem] = await Promise.allSettled([
        fetchSheet(GIDS.announce),
        fetchSheet(GIDS.highlights),
        fetchSheet(GIDS.members),
      ]);
      setAnnounces(ann.status === 'fulfilled' ? ann.value : []);
      setHighlights(hl.status === 'fulfilled' ? hl.value : []);
      setMembers(mem.status === 'fulfilled' ? mem.value : []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <button className={styles.logoBtn} onClick={() => setPage('home')}>
            <span className={styles.logoMain}>VSOP</span>
            <span className={styles.logoSub}>FUNK BAND</span>
          </button>
          <nav className={styles.nav}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`${styles.navBtn} ${page === item.id ? styles.active : ''}`}
                onClick={() => navigate(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className={page === 'home' ? styles.mainFull : styles.main}>
        {page === 'home' && <Home onNavigate={navigate} />}
        {page === 'live' && <LiveInfo items={announces} loading={loading} />}
        {page === 'movie' && <Movie items={highlights} loading={loading} />}
        {page === 'members' && <Members items={members} loading={loading} />}
      </main>

      <footer className={styles.footer}>
        <p>© VSOP All Rights Reserved.</p>
      </footer>
    </div>
  );
}
