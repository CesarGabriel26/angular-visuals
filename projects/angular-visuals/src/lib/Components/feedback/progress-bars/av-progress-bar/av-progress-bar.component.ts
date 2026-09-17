import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { VISUALS_CONFIG } from '../../../../core/tokens';
import { ThemeService } from '../../../../core/services/ThemeService.service';

@Component({
  selector: 'av-progress-bar, av-progress-bard',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./av-progress-bar.component.css'],
  templateUrl: './av-progress-bar.component.html',
})
export class AvProgressBar {
  private readonly config = inject(VISUALS_CONFIG);
  private readonly themeService = inject(ThemeService);

  value = input.required<number>();
  max = input.required<number>();
  variant = input<string>(this.config.theme.defaultVariant);
  striped = input<boolean>(false);
  showPercent = input<boolean>(true);
  percentPos = input<'fill' | 'center'>('center');
  gradient = input<boolean>(false);
  from = input<string>('');
  to = input<string>('');
  height = input<number>(20);

  readonly percentValue = computed(() => {
    if (this.max() <= 0) return 0;
    return Math.min(100, Math.max(0, (this.value() / this.max()) * 100));
  });

  readonly percentLabel = computed(() => Math.round(this.percentValue()));

  readonly themeVars = computed<Record<string, string>>(() => {
    const variant = this.variant();
    const isDark = this.themeService.dark();
    const from = this.from() || `var(--av-${variant}-${isDark ? 400 : 500})`;
    const to = this.to() || `var(--av-${variant}-${isDark ? 500 : 600})`;

    return {
      '--av-progress-fill': `var(--av-${variant}-${isDark ? 400 : 500})`,
      '--av-progress-fill-strong': `var(--av-${variant}-${isDark ? 300 : 600})`,
      '--av-progress-gradient-from': from,
      '--av-progress-gradient-to': to,
      '--av-progress-track': isDark
        ? `color-mix(in srgb, var(--av-${variant}-400) 18%, var(--av-color-surface-muted))`
        : `var(--av-${variant}-100)`,
    };
  });
}
