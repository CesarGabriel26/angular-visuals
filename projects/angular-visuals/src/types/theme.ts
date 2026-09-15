export type AvThemeMode = 'light' | 'dark' | 'system';

export interface VisualsThemeConfig {
  mode: AvThemeMode;
  defaultVariant: string;
  defaultIntensity: number;
}

export interface VisualsConfig {
  theme: VisualsThemeConfig;
}
