import React from 'react';
import { Button, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faPalette } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../hooks/useTheme';

/**
 * Theme switcher component
 * Allows users to switch between default, light, and dark themes
 * Mobile-friendly with tooltips
 */
const ThemeSwitcher = () => {
  const { currentTheme, setTheme, availableThemes } = useTheme();

  const themeIcons = {
    default: faPalette,
    light: faSun,
    dark: faMoon,
  };

  const themeLabels = {
    default: 'Default',
    light: 'Light',
    dark: 'Dark',
  };

  return (
    <ButtonGroup size="sm" className="theme-switcher">
      {availableThemes.map((themeName) => {
        const isActive = currentTheme === themeName;
        const icon = themeIcons[themeName];
        const label = themeLabels[themeName];

        return (
          <OverlayTrigger
            key={themeName}
            placement="bottom"
            overlay={<Tooltip>{label} Theme</Tooltip>}
          >
            <Button
              variant={isActive ? 'primary' : 'outline-secondary'}
              onClick={() => setTheme(themeName)}
              aria-label={`Switch to ${label} theme`}
              className="theme-switcher-btn"
            >
              <FontAwesomeIcon icon={icon} />
              <span className="d-none d-md-inline ms-2">{label}</span>
            </Button>
          </OverlayTrigger>
        );
      })}
    </ButtonGroup>
  );
};

export default ThemeSwitcher;

