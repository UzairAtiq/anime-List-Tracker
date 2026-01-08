import { createContext, useContext, useState, useEffect } from 'react';
import { getTheme, getDefaultTheme } from '../config/themes';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => getDefaultTheme());

  useEffect(() => {
    // Apply theme to document root
    document.documentElement.style.setProperty('--theme-bg', currentTheme.bg);
    document.documentElement.style.setProperty('--theme-text', currentTheme.textColor);
    document.documentElement.style.setProperty('--theme-border', currentTheme.borderColor);
    
    // Save to localStorage
    localStorage.setItem('retroTheme', currentTheme.key);
  }, [currentTheme]);

  const changeTheme = (themeKey) => {
    const theme = getTheme(themeKey);
    if (theme) {
      setCurrentTheme(theme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

