import { useState, useEffect, useMemo } from 'react';
import { themes } from '../config/theme';
import { config } from '../config/env';

/**
 * Custom hook for theme management
 * Supports 3 themes: default, light, dark
 * Persists theme preference in localStorage
 * Falls back to env variable default
 */
export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('aess-theme');
    if (savedTheme && themes[savedTheme]) {
      return savedTheme;
    }
    // Fall back to env variable
    const envTheme = config.theme.defaultTheme;
    if (envTheme && themes[envTheme]) {
      return envTheme;
    }
    // Default fallback
    return 'default';
  });

  const theme = useMemo(() => themes[currentTheme], [currentTheme]);

  useEffect(() => {
    // Apply theme to document root
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    // Save to localStorage
    localStorage.setItem('aess-theme', currentTheme);
    
    // Add theme class to body for CSS targeting
    document.body.className = document.body.className
      .replace(/theme-\w+/g, '')
      .trim();
    document.body.classList.add(`theme-${currentTheme}`);
  }, [currentTheme, theme]);

  const setTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const toggleTheme = () => {
    const themeOrder = ['default', 'light', 'dark'];
    const currentIndex = themeOrder.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  };

  return {
    theme,
    currentTheme,
    setTheme,
    toggleTheme,
    availableThemes: Object.keys(themes),
  };
};

export default useTheme;

