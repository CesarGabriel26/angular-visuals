import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { VISUALS_CONFIG } from '../tokens';
import { AvThemeMode } from '@av/types/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private config = inject(VISUALS_CONFIG);
  private readonly colorIntensities = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

  readonly mode = signal<AvThemeMode>(this.config.theme.mode);
  readonly systemDark = signal(false);

  readonly dark = computed(() => {
    const mode = this.mode();

    if (mode === 'dark') return true;
    if (mode === 'light') return false;

    return this.systemDark();
  });

  constructor() {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    this.systemDark.set(media.matches);
    this.setPrimaryColorVariables();

    media.addEventListener('change', event => {
      this.systemDark.set(event.matches);
    });

    effect(() => {
      const isDark = this.dark();
      const root = document.documentElement;

      if (isDark) {
        root.setAttribute('data-av-theme', 'dark');
      } else {
        root.setAttribute('data-av-theme', 'light');
      }
    });
  }

  setMode(mode: AvThemeMode) {
    this.mode.set(mode);
  }

  private setPrimaryColorVariables(): void {
    const root = document.documentElement;
    const variant = this.config.theme.defaultVariant;

    for (const intensity of this.colorIntensities) {
      root.style.setProperty(`--av-primary-${intensity}`, `var(--av-${variant}-${intensity})`);
    }
  }
}
