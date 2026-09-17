import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { VISUALS_CONFIG } from '../../../../core/tokens';
import { ThemeService } from '../../../../core/services/ThemeService.service';

@Component({
  selector: 'av-progress-bar-circle',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./av-progress-bar-circle.component.css'],
  templateUrl: './av-progress-bar-circle.component.html',
})
export class AvProgressBarCircle {
  private readonly config = inject(VISUALS_CONFIG);
  private readonly themeService = inject(ThemeService);

  value = input.required<number>();
  max = input.required<number>();
  variant = input<string>(this.config.theme.defaultVariant);
  striped = input<boolean>(false);
  showPercent = input<boolean>(true);
  size = input<number>(120);
  strokeWidth = input<number>(12);

  private static nextId = 0;

  readonly stripeId =
    `av-progress-circle-stripe-${Math.random()}`;

  readonly radius = computed(() => 50 - this.strokeWidth() / 2);
  readonly circumference = computed(() => 2 * Math.PI * this.radius());

  readonly percentValue = computed(() => {
    if (this.max() <= 0) return 0;
    return Math.min(100, Math.max(0, (this.value() / this.max()) * 100));
  });

  readonly percentLabel = computed(() => Math.round(this.percentValue()));
  readonly dashOffset = computed(() => this.circumference() * (1 - this.percentValue() / 100));

  readonly themeVars = computed<Record<string, string>>(() => {
    const variant = this.variant();
    const isDark = this.themeService.dark();

    return {
      '--av-progress-circle-fill': `var(--av-${variant}-${isDark ? 400 : 500})`,
      '--av-progress-circle-track': isDark
        ? `color-mix(in srgb, var(--av-${variant}-400) 18%, var(--av-color-surface-muted))`
        : `var(--av-${variant}-100)`,
    };
  });
}
