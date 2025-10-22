import { useState } from 'react';
import { Palette, Sun, Moon, Eye, Contrast, LucideIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Theme } from '../types/theme';

const themeIcons: Record<Theme, LucideIcon> = {
  light: Sun,
  dark: Moon,
  'high-contrast': Contrast,
  'colorblind-friendly': Eye,
};

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes: { value: Theme; label: string }[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'high-contrast', label: 'High Contrast' },
    { value: 'colorblind-friendly', label: 'Colorblind Friendly' },
  ];

  const CurrentIcon = themeIcons[theme];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-theme-secondary hover:bg-theme-tertiary text-theme-primary font-medium px-4 py-2 rounded-xl shadow-theme transition-all duration-200 hover:shadow-lg flex items-center gap-2 theme-transition"
        aria-label="Toggle theme"
      >
        <CurrentIcon size={18} />
        <span className="hidden sm:inline">{themes.find(t => t.value === theme)?.label}</span>
        <Palette size={16} className="sm:hidden" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-theme-secondary rounded-xl shadow-lg border border-theme p-2 z-50 min-w-[200px] theme-transition">
          <div className="space-y-1">
            {themes.map((themeOption) => {
              const Icon = themeIcons[themeOption.value];
              const isSelected = theme === themeOption.value;
              
              return (
                <button
                  key={themeOption.value}
                  onClick={() => {
                    setTheme(themeOption.value);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left
                    transition-all duration-200
                    ${isSelected 
                      ? 'bg-theme-tertiary text-theme-primary font-medium' 
                      : 'hover:bg-theme-tertiary text-theme-secondary hover:text-theme-primary'
                    }
                    theme-transition
                  `}
                >
                  <Icon size={16} />
                  <span>{themeOption.label}</span>
                  {isSelected && (
                    <div className="ml-auto w-2 h-2 rounded-full accent-primary bg-current"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
