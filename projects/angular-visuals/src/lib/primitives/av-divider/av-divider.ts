import { Component, inject, input } from '@angular/core';
import { VISUALS_CONFIG } from '../../core/tokens';

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

  get borderStyle(): string {
    return `${4 * this.size()}px solid var(--av-${this.variant()}-600)`;
  }

  get isVertical(): boolean {
    return this.direction() === 'vert';
  }
}
