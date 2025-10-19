import { Theme, ThemeConfig } from '../types/theme';

export const themes: Record<Theme, ThemeConfig> = {
  light: {
    name: 'Light',
    colors: {
      background: {
        primary: '#f8fafc',
        secondary: '#ffffff',
        tertiary: '#f1f5f9',
      },
      text: {
        primary: '#1e293b',
        secondary: '#64748b',
        tertiary: '#94a3b8',
      },
      card: {
        back: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        front: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
        matched: 'linear-gradient(135deg, #10b981, #059669)',
        hover: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)',
      },
      accent: {
        primary: '#3b82f6',
        secondary: '#6366f1',
        success: '#10b981',
        warning: '#f59e0b',
      },
      shadow: 'rgba(0, 0, 0, 0.1)',
      border: '#e2e8f0',
    },
  },
  dark: {
    name: 'Dark',
    colors: {
      background: {
        primary: '#0f172a',
        secondary: '#1e293b',
        tertiary: '#334155',
      },
      text: {
        primary: '#f8fafc',
        secondary: '#cbd5e1',
        tertiary: '#94a3b8',
      },
      card: {
        back: 'linear-gradient(135deg, #1e40af, #1d4ed8)',
        front: 'linear-gradient(135deg, #334155, #475569)',
        matched: 'linear-gradient(135deg, #047857, #065f46)',
        hover: 'linear-gradient(135deg, #475569, #64748b)',
      },
      accent: {
        primary: '#60a5fa',
        secondary: '#818cf8',
        success: '#34d399',
        warning: '#fbbf24',
      },
      shadow: 'rgba(0, 0, 0, 0.3)',
      border: '#475569',
    },
  },
  'high-contrast': {
    name: 'High Contrast',
    colors: {
      background: {
        primary: '#ffffff',
        secondary: '#000000',
        tertiary: '#ffffff',
      },
      text: {
        primary: '#000000',
        secondary: '#000000',
        tertiary: '#000000',
      },
      card: {
        back: 'linear-gradient(135deg, #000000, #333333)',
        front: 'linear-gradient(135deg, #ffffff, #f0f0f0)',
        matched: 'linear-gradient(135deg, #006600, #004400)',
        hover: 'linear-gradient(135deg, #e0e0e0, #d0d0d0)',
      },
      accent: {
        primary: '#0000ff',
        secondary: '#0000ff',
        success: '#006600',
        warning: '#ff6600',
      },
      shadow: 'rgba(0, 0, 0, 0.5)',
      border: '#000000',
    },
  },
  'colorblind-friendly': {
    name: 'Colorblind Friendly',
    colors: {
      background: {
        primary: '#f7f7f7',
        secondary: '#ffffff',
        tertiary: '#e8e8e8',
      },
      text: {
        primary: '#2c2c2c',
        secondary: '#555555',
        tertiary: '#777777',
      },
      card: {
        back: 'linear-gradient(135deg, #2c5aa0, #1e3a8a)',
        front: 'linear-gradient(135deg, #ffffff, #f0f0f0)',
        matched: 'linear-gradient(135deg, #2d5016, #1a3009)',
        hover: 'linear-gradient(135deg, #e0e0e0, #d0d0d0)',
      },
      accent: {
        primary: '#2c5aa0',
        secondary: '#7c3aed',
        success: '#2d5016',
        warning: '#d97706',
      },
      shadow: 'rgba(0, 0, 0, 0.15)',
      border: '#d0d0d0',
    },
  },
};
