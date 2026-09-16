import { Component, inject, input } from '@angular/core';
import { VISUALS_CONFIG } from '@av/lib/core/tokens';

@Component({
  imports: [],
  selector: 'lib-av-divider',
  styleUrl: './av-divider.css',
  templateUrl: './av-divider.html',
})
export class AvDivider {
  private readonly config = inject(VISUALS_CONFIG);

  size = input<number>(1);
  direction = input<'vert' | 'hori'>('hori');
  variant = input<string>(this.config.theme.defaultVariant);

  get style() {
    return this.direction() == 'vert' ? `border-left ${4 * this.size()}px solid var(--av-${this.variant()}-600)` : `border-top ${4 * this.size()}px solid var(--av-${this.variant()}-600)`
  }
}
