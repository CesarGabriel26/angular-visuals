import { Component, HostBinding, inject, input } from '@angular/core';
import { VISUALS_CONFIG } from '../../../Core/tokens';
import { AvIcon } from '../av-icon/av-icon.component';

@Component({
  imports: [AvIcon],
  selector: 'button[av-button], a[av-button]',
  styleUrl: './av-button.component.css',
  templateUrl: './av-button.component.html',
})
export class AvButton {
  private readonly config = inject(VISUALS_CONFIG);

  icon = input<string>();
  loadingIcon = input<string>();
  loading = input<boolean>(false)
  variant = input<string>(this.config.theme.defaultVariant);
  rounded = input<number | "xs" | "sm" | "md" | "lg" | "xl" | "full">("md");

  @HostBinding('style.border-radius')
  get roundedClass(): string {
    if (typeof this.rounded() === "string") {
      return `var(--av-radius-${this.rounded()})`;
    }
    return `${this.rounded()}px`
  }

  @HostBinding('style.--av-button-light-bg')
  get lightBackground(): string {
    return `var(--av-${this.variant()}-500)`;
  }

  @HostBinding('style.--av-button-light-hover-bg')
  get lightHoverBackground(): string {
    return `var(--av-${this.variant()}-600)`;
  }

  @HostBinding('style.--av-button-dark-bg')
  get darkBackground(): string {
    return `var(--av-${this.variant()}-700)`;
  }

  @HostBinding('style.--av-button-dark-hover-bg')
  get darkHoverBackground(): string {
    return `var(--av-${this.variant()}-600)`;
  }
}

