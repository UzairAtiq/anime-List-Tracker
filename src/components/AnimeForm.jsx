import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input, Popup } from 'pixel-retroui';
import { useTheme } from '../context/ThemeContext';

export default function AnimeForm({ onAdd, onEdit, editAnime, isEditMode }) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    totalEpisodes: '',
    watchedEpisodes: '',
    completed: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode && editAnime) {
      setFormData({
        name: editAnime.name,
        totalEpisodes: editAnime.totalEpisodes.toString(),
        watchedEpisodes: editAnime.watchedEpisodes.toString(),
        completed: editAnime.completed,
      });
      setIsOpen(true);
    }
  }, [isEditMode, editAnime]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name required';
    }
    
    if (formData.totalEpisodes && formData.watchedEpisodes) {
      const total = parseInt(formData.totalEpisodes);
      const watched = parseInt(formData.watchedEpisodes);
      if (watched > total) {
        newErrors.watchedEpisodes = 'Cannot exceed total';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate async operation for smooth animation
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const animeData = {
      name: formData.name.trim(),
      totalEpisodes: parseInt(formData.totalEpisodes) || 0,
      watchedEpisodes: parseInt(formData.watchedEpisodes) || 0,
      completed: formData.completed,
    };

    if (isEditMode && editAnime) {
      onEdit(editAnime.id, animeData);
    } else {
      onAdd(animeData);
    }

    setFormData({
      name: '',
      totalEpisodes: '',
      watchedEpisodes: '',
      completed: false,
    });
    setErrors({});
    setIsSubmitting(false);
    setIsOpen(false);
  };

  const handleOpenForm = () => {
    setIsOpen(true);
    setErrors({});
    setFormData({
      name: '',
      totalEpisodes: '',
      watchedEpisodes: '',
      completed: false,
    });
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={handleOpenForm}
          bg={theme.bg}
          textColor={theme.textColor}
          borderColor={theme.borderColor}
          shadow={theme.borderColor}
          className="px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base uppercase tracking-wide font-black border-2"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <span>➕</span> <span className="hidden xs:inline">Add</span> Anime
          </motion.span>
        </Button>
      </motion.div>

      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Anime"
        bg={theme.bg}
        textColor={theme.textColor}
        borderColor={theme.borderColor}
        baseBg={theme.bg}
        overlayBg={`${theme.bg}CC`}
        className="max-w-lg"
      >
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit} 
          className="space-y-6 border-2 p-6"
          style={{ borderColor: theme.borderColor }}
        >
          {/* Anime Name Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label 
              className="block text-sm uppercase tracking-wide mb-2 font-black"
              style={{ color: theme.textColor }}
            >
              Anime Name *
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: null });
              }}
              placeholder="Enter anime name"
              required
              autoFocus
              bg={theme.bg}
              textColor={theme.textColor}
              borderColor={errors.name ? '#ff0000' : theme.borderColor}
              className="w-full px-4 py-3 uppercase tracking-wide border-2 font-black transition-all"
            />
            <AnimatePresence>
              {errors.name && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xs uppercase tracking-wide font-black mt-1 block"
                  style={{ color: '#ff0000' }}
                >
                  ⚠ {errors.name}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Episodes Fields */}
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <label 
                className="block text-sm uppercase tracking-wide mb-2 font-black"
                style={{ color: theme.textColor }}
              >
                Total Episodes
              </label>
              <Input
                type="number"
                value={formData.totalEpisodes}
                onChange={(e) => {
                  setFormData({ ...formData, totalEpisodes: e.target.value });
                  if (errors.watchedEpisodes) setErrors({ ...errors, watchedEpisodes: null });
                }}
                placeholder="0"
                min="0"
                bg={theme.bg}
                textColor={theme.textColor}
                borderColor={theme.borderColor}
                className="w-full px-4 py-3 uppercase tracking-wide border-2 font-black"
              />
            </div>

            <div>
              <label 
                className="block text-sm uppercase tracking-wide mb-2 font-black"
                style={{ color: theme.textColor }}
              >
                Watched Episodes
              </label>
              <Input
                type="number"
                value={formData.watchedEpisodes}
                onChange={(e) => {
                  setFormData({ ...formData, watchedEpisodes: e.target.value });
                  if (errors.watchedEpisodes) setErrors({ ...errors, watchedEpisodes: null });
                }}
                placeholder="0"
                min="0"
                bg={theme.bg}
                textColor={theme.textColor}
                borderColor={errors.watchedEpisodes ? '#ff0000' : theme.borderColor}
                className="w-full px-4 py-3 uppercase tracking-wide border-2 font-black"
              />
              <AnimatePresence>
                {errors.watchedEpisodes && (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xs uppercase tracking-wide font-black mt-1 block"
                    style={{ color: '#ff0000' }}
                  >
                    ⚠ {errors.watchedEpisodes}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Completed Checkbox */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              type="button"
              onClick={() => setFormData({ ...formData, completed: !formData.completed })}
              className="w-8 h-8 flex items-center justify-center transition-all border-2"
              style={{
                backgroundColor: formData.completed ? theme.borderColor : theme.bg,
                color: formData.completed ? theme.bg : theme.textColor,
                borderColor: theme.borderColor,
                borderWidth: '2px',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {formData.completed && (
                  <motion.span 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    className="text-sm font-black"
                  >
                    ✓
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <label 
              className="text-sm uppercase tracking-wide font-black cursor-pointer select-none"
              style={{ color: theme.textColor }}
              onClick={() => setFormData({ ...formData, completed: !formData.completed })}
            >
              Mark as Completed
            </label>
          </motion.div>

          {/* Divider */}
          <motion.div 
            className="my-4 h-px border-t-2"
            style={{ borderColor: theme.borderColor }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          />

          {/* Action Buttons */}
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="button"
                onClick={() => setIsOpen(false)}
                bg={theme.bg}
                textColor={theme.textColor}
                borderColor={theme.borderColor}
                shadow={theme.borderColor}
                className="w-full px-6 py-3 text-sm uppercase tracking-wide font-black border-2"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </motion.div>
            <motion.div 
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                bg={theme.bg}
                textColor={theme.textColor}
                borderColor={theme.borderColor}
                shadow={theme.borderColor}
                className="w-full px-6 py-3 text-sm uppercase tracking-wide font-black border-2"
                disabled={isSubmitting}
              >
                <motion.span
                  animate={isSubmitting ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
                  transition={{ repeat: isSubmitting ? Infinity : 0, duration: 1 }}
                >
                  {isSubmitting ? (isEditMode ? 'Saving...' : 'Adding...') : (isEditMode ? 'Save' : 'Add')}
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.form>
      </Popup>
    </>
  );
}
