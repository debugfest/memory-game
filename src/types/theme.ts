export type Theme = 'light' | 'dark' | 'high-contrast' | 'colorblind-friendly';

export interface ThemeConfig {
  name: string;
  colors: {
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    card: {
      back: string;
      front: string;
      matched: string;
      hover: string;
    };
    accent: {
      primary: string;
      secondary: string;
      success: string;
      warning: string;
    };
    shadow: string;
    border: string;
  };
}
