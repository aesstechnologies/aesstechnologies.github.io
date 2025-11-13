import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../hooks/useTheme';

/**
 * Theme switcher component
 * Toggles between light and dark themes
 * Mobile-friendly
 */
const ThemeSwitcher = () => {
  const { currentTheme, toggleTheme } = useTheme();

  return (
    <Button
      variant={currentTheme === 'dark' ? 'outline-light' : 'outline-dark'}
      onClick={toggleTheme}
      aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} theme`}
      className="theme-switcher-btn"
      size="sm"
    >
      <FontAwesomeIcon icon={currentTheme === 'dark' ? faSun : faMoon} />
      <span className="d-none d-md-inline ms-2">
        {currentTheme === 'dark' ? 'Light' : 'Dark'}
      </span>
    </Button>
  );
};

export default ThemeSwitcher;

