import { motion } from 'framer-motion';
import { Card, Button } from 'pixel-retroui';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

export default function AnimeCard({ anime, onToggleComplete, onDelete, onEdit }) {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const progress = anime.totalEpisodes > 0 
    ? (anime.watchedEpisodes / anime.totalEpisodes) * 100 
    : 0;

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete(anime.id);
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.8 }}
      layout
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      className="mb-3"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          borderColor: isHovered ? theme.textColor : theme.borderColor,
          boxShadow: isHovered ? `4px 4px 0px ${theme.borderColor}` : 'none',
        }}
        transition={{ duration: 0.2 }}
      >
        <Card
          bg={theme.bg}
          textColor={theme.textColor}
          borderColor={isHovered ? theme.textColor : theme.borderColor}
          shadowColor={undefined}
          className="p-4 border-2"
          style={{
            borderWidth: '2px',
            borderStyle: 'solid',
            backgroundColor: theme.bg,
          }}
        >
          <div className="flex items-center gap-4">
            <motion.div 
              className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-2xl border-2"
              style={{
                backgroundColor: theme.bg,
                borderColor: theme.borderColor,
                borderWidth: '2px',
              }}
              whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {anime.emoji}
            </motion.div>

            <div className="flex-1 min-w-0 font-mono">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <motion.div 
                  className="flex-1 min-w-[200px]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span 
                    className="text-lg font-black uppercase tracking-wide"
                    style={{ color: theme.textColor }}
                  >
                    {anime.name}
                  </span>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-6 flex-wrap"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {anime.completed ? (
                    <motion.span 
                      className="text-sm uppercase tracking-wide font-black"
                      style={{ color: theme.textColor }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      ✨ Completed
                    </motion.span>
                  ) : (
                    <span 
                      className="text-sm uppercase tracking-wide font-black"
                      style={{ color: theme.textColor }}
                    >
                      Watched: {anime.watchedEpisodes} / {anime.totalEpisodes || '?'}
                    </span>
                  )}

                  {!anime.completed && anime.totalEpisodes > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black" style={{ color: theme.textColor }}>[</span>
                      <div 
                        className="w-24 h-3 overflow-hidden border-2"
                        style={{
                          backgroundColor: theme.bg,
                          borderColor: theme.borderColor,
                          borderWidth: '2px',
                        }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full"
                          style={{ 
                            backgroundColor: theme.borderColor,
                          }}
                        />
                      </div>
                      <span className="text-xs font-black" style={{ color: theme.textColor }}>]</span>
                      <motion.span 
                        className="text-xs font-black"
                        style={{ color: theme.textColor }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {Math.round(progress)}%
                      </motion.span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => onToggleComplete(anime.id)}
                      className="w-8 h-8 flex items-center justify-center transition-all border-2"
                      style={{
                        backgroundColor: anime.completed ? theme.borderColor : theme.bg,
                        color: anime.completed ? theme.bg : theme.textColor,
                        borderColor: theme.borderColor,
                        borderWidth: '2px',
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={anime.completed ? 'Mark as incomplete' : 'Mark as complete'}
                    >
                      {anime.completed && (
                        <motion.span 
                          className="text-sm font-black"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.button>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => onEdit(anime)}
                        bg={theme.bg}
                        textColor={theme.textColor}
                        borderColor={theme.borderColor}
                        shadow={theme.borderColor}
                        className="px-3 py-1 text-xs uppercase font-black border-2"
                      >
                        Edit
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={handleDelete}
                        bg={theme.bg}
                        textColor={showDeleteConfirm ? '#ff0000' : theme.textColor}
                        borderColor={showDeleteConfirm ? '#ff0000' : theme.borderColor}
                        shadow={showDeleteConfirm ? '#ff0000' : theme.borderColor}
                        className="px-3 py-1 text-xs uppercase font-black border-2"
                      >
                        {showDeleteConfirm ? '⚠ Confirm' : 'Delete'}
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
