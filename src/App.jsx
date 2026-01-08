import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomEmoji } from './data/emojiList';
import { Card } from 'pixel-retroui';
import { useTheme } from './context/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';
import AnimeForm from './components/AnimeForm';
import AnimeList from './components/AnimeList';

const STORAGE_KEY = 'animeList';

function App() {
  const { theme } = useTheme();
  const [animes, setAnimes] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [notification, setNotification] = useState(null);

  // Save to localStorage whenever animes change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(animes));
  }, [animes]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddAnime = (animeData) => {
    const newAnime = {
      id: Date.now().toString(),
      name: animeData.name,
      totalEpisodes: animeData.totalEpisodes || 0,
      watchedEpisodes: animeData.watchedEpisodes || 0,
      completed: animeData.completed || false,
      emoji: getRandomEmoji(),
    };
    setAnimes([...animes, newAnime]);
    showNotification(`Added "${animeData.name}"!`, 'success');
  };

  const handleToggleComplete = (id) => {
    setAnimes(
      animes.map((anime) =>
        anime.id === id
          ? { ...anime, completed: !anime.completed }
          : anime
      )
    );
    const anime = animes.find(a => a.id === id);
    showNotification(
      anime?.completed ? `Marked "${anime.name}" as incomplete` : `Completed "${anime?.name}"! 🎉`,
      'info'
    );
  };

  const handleDeleteAnime = (id) => {
    const anime = animes.find(a => a.id === id);
    setAnimes(animes.filter((anime) => anime.id !== id));
    showNotification(`Deleted "${anime?.name}"`, 'error');
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{ 
        backgroundColor: theme.bg,
        color: theme.textColor 
      }}
    >
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -100, x: '-50%' }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-0 left-1/2 z-50 border-2 px-6 py-3"
            style={{
              backgroundColor: theme.bg,
              borderColor: notification.type === 'error' ? '#ff0000' : theme.borderColor,
              color: theme.textColor,
            }}
          >
            <span className="font-black uppercase tracking-wide text-sm">
              {notification.type === 'success' && '✓ '}
              {notification.type === 'error' && '✗ '}
              {notification.type === 'info' && 'ℹ '}
              {notification.message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Terminal Container */}
      <motion.div 
        className="max-w-6xl mx-auto px-4 py-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Terminal Border - Using RetroUI Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card
            bg={theme.bg}
            textColor={theme.textColor}
            borderColor={theme.borderColor}
            shadowColor={undefined}
            className="p-6 border-2"
            style={{
              borderWidth: '2px',
            }}
          >
            {/* Header */}
            <motion.header 
              className="mb-8 border-2 p-4" 
              style={{ borderColor: theme.borderColor }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-3 flex-wrap gap-4">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h1 
                    className="text-4xl font-black uppercase tracking-wide mb-2 flex items-center gap-3"
                    style={{ color: theme.textColor }}
                  >
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      📺
                    </motion.span>
                    Anime Tracker
                  </h1>
                </motion.div>
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <ThemeSwitcher />
                </motion.div>
              </div>
              <motion.div 
                className="h-px border-t-2"
                style={{ borderColor: theme.borderColor }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              />
            </motion.header>

            {/* Main Content */}
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {/* Add Anime Button */}
              <motion.div 
                className="mb-6 flex justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              >
                <AnimeForm onAdd={handleAddAnime} />
              </motion.div>

              {/* Anime List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <AnimeList
                  animes={animes}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteAnime}
                />
              </motion.div>
            </motion.main>

            {/* Footer */}
            <motion.footer 
              className="mt-12 pt-6 text-center text-xs uppercase tracking-wider font-black opacity-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1 }}
            >
              <motion.div 
                className="mb-4 h-px border-t-2"
                style={{ borderColor: theme.borderColor }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
              />
              <p style={{ color: theme.textColor }}>
                React.js • Tailwind • Framer Motion
              </p>
            </motion.footer>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
