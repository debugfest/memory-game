import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme } from '../types/theme';
import { themes } from '../config/themes';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themeConfig: typeof themes[Theme];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('memory-game-theme') as Theme;
    if (savedTheme && themes[savedTheme]) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('memory-game-theme', newTheme);
  };

  // Apply theme to CSS custom properties
  useEffect(() => {
    const themeConfig = themes[theme];
    const root = document.documentElement;
    
    // Set CSS custom properties
    root.style.setProperty('--color-bg-primary', themeConfig.colors.background.primary);
    root.style.setProperty('--color-bg-secondary', themeConfig.colors.background.secondary);
    root.style.setProperty('--color-bg-tertiary', themeConfig.colors.background.tertiary);
    
    root.style.setProperty('--color-text-primary', themeConfig.colors.text.primary);
    root.style.setProperty('--color-text-secondary', themeConfig.colors.text.secondary);
    root.style.setProperty('--color-text-tertiary', themeConfig.colors.text.tertiary);
    
    root.style.setProperty('--color-card-back', themeConfig.colors.card.back);
    root.style.setProperty('--color-card-front', themeConfig.colors.card.front);
    root.style.setProperty('--color-card-matched', themeConfig.colors.card.matched);
    root.style.setProperty('--color-card-hover', themeConfig.colors.card.hover);
    
    root.style.setProperty('--color-accent-primary', themeConfig.colors.accent.primary);
    root.style.setProperty('--color-accent-secondary', themeConfig.colors.accent.secondary);
    root.style.setProperty('--color-accent-success', themeConfig.colors.accent.success);
    root.style.setProperty('--color-accent-warning', themeConfig.colors.accent.warning);
    
    root.style.setProperty('--color-shadow', themeConfig.colors.shadow);
    root.style.setProperty('--color-border', themeConfig.colors.border);
    
    // Add theme class to body for additional styling
    document.body.className = `theme-${theme}`;
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if no theme is saved in localStorage
      if (!localStorage.getItem('memory-game-theme')) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const value: ThemeContextType = {
    theme,
    setTheme,
    themeConfig: themes[theme],
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
