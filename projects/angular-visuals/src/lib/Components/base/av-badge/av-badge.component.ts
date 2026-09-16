import {
  Component,
  HostBinding,
  inject,
  input
} from '@angular/core';

import { VISUALS_CONFIG } from '@av/lib/core/tokens';

@Component({
  selector: 'span[av-badge]',
  styleUrls: ['./av-badge.component.css'],
  templateUrl: './av-badge.component.html',
})
export class AvBadge {
  private readonly config = inject(VISUALS_CONFIG);

  variant = input<string>(
    this.config.theme.defaultVariant
  );

  @HostBinding('style.--av-badge-light-bg')
  get lightBackground(): string {
    return `var(--av-${this.variant()}-500)`;
  }

  @HostBinding('style.--av-badge-dark-bg')
  get darkBackground(): string {
    return `var(--av-${this.variant()}-600)`;
  }
}
