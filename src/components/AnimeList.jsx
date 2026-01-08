import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Input } from 'pixel-retroui';
import { useTheme } from '../context/ThemeContext';
import AnimeCard from './AnimeCard';

export default function AnimeList({ animes, onToggleComplete, onDelete }) {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter animes based on search query
  const filteredAnimes = animes.filter((anime) =>
    anime.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (animes.length === 0) {
    return (
      <motion.div 
        className="text-center py-20"
        style={{ color: theme.textColor }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-6xl mb-4"
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          🌙
        </motion.div>
        <motion.p 
          className="text-2xl uppercase tracking-wide font-black mb-2"
          style={{ color: theme.textColor }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          List Empty
        </motion.p>
        <motion.p 
          className="text-sm uppercase tracking-wide font-black opacity-80"
          style={{ color: theme.textColor }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.8 }}
          transition={{ delay: 0.3 }}
        >
          Add anime to continue
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="border-2 p-4" 
      style={{ borderColor: theme.borderColor }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Search Input - Retro Terminal Style */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label 
          className="block text-sm uppercase tracking-wide mb-2 font-black"
          style={{ color: theme.textColor }}
        >
          🔍 Search Anime
        </label>
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Type to search..."
          bg={theme.bg}
          textColor={theme.textColor}
          borderColor={theme.borderColor}
          className="w-full px-4 py-3 uppercase tracking-wide font-mono text-sm border-2 font-black"
        />
      </motion.div>

      {/* Results Count */}
      {searchQuery && (
        <motion.div 
          className="mb-4 text-xs uppercase tracking-wide font-black opacity-80"
          style={{ color: theme.textColor }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.8, y: 0 }}
        >
          Results: {filteredAnimes.length} / {animes.length}
        </motion.div>
      )}

      {/* Divider */}
      <motion.div 
        className="mb-4 h-px border-t-2"
        style={{ borderColor: theme.borderColor }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      />

      {/* Anime List */}
      {filteredAnimes.length === 0 ? (
        <motion.div 
          className="text-center py-12"
          style={{ color: theme.textColor }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-4xl mb-4"
          >
            🔍
          </motion.div>
          <p 
            className="text-xl uppercase tracking-wide font-black mb-2"
            style={{ color: theme.textColor }}
          >
            No Match Found
          </p>
          <p 
            className="text-sm uppercase tracking-wide font-black opacity-80"
            style={{ color: theme.textColor }}
          >
            Try different search
          </p>
        </motion.div>
      ) : (
        <div className="space-y-0">
          <AnimatePresence mode="popLayout">
            {filteredAnimes.map((anime, index) => (
              <motion.div
                key={anime.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <AnimeCard
                  anime={anime}
                  onToggleComplete={onToggleComplete}
                  onDelete={onDelete}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
