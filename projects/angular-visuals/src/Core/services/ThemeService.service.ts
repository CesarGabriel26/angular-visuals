import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { VISUALS_CONFIG } from '../tokens';
import { AvThemeMode } from '../../types/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private config = inject(VISUALS_CONFIG);

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
}
