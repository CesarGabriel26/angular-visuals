export type AvThemeMode = 'light' | 'dark' | 'system';

export interface VisualsThemeConfig {
  mode: AvThemeMode;
  defaultVariant: string;
}

export interface VisualsConfig {
  theme: VisualsThemeConfig;
}
