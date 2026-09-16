import { CommonModule } from '@angular/common';
import { Component, ElementRef, booleanAttribute, computed, inject, input, output } from '@angular/core';
import { AvIcon } from '@av/lib/components/base/av-icon/av-icon.component';
import { VISUALS_CONFIG } from '@av/lib/core/tokens';
import { ThemeService } from '@av/lib/core/services/ThemeService.service';

@Component({
  imports: [CommonModule, AvIcon],
  selector: 'av-nav-link',
  styleUrl: './av-nav-link.component.css',
  templateUrl: './av-nav-link.component.html',
})
export class AvNavLink {
  private readonly config = inject(VISUALS_CONFIG);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly themeService = inject(ThemeService);

  active = input<boolean, unknown>(false, { transform: booleanAttribute });
  badge = input<string | number | null>(null);
  description = input<string>('');
  disabled = input<boolean, unknown>(false, { transform: booleanAttribute });
  href = input<string>('');
  icon = input<string>('');
  label = input<string>('');
  rel = input<string>('');
  target = input<string>('');
  variant = input<string>(this.config.theme.defaultVariant);

  selected = output<Event>();

  readonly themeVars = computed<Record<string, string>>(() => {
    const variant = this.variant();
    const isDark = this.themeService.dark();

    return {
      '--av-nav-link-accent': `var(--av-${variant}-${isDark ? 400 : 500})`,
      '--av-nav-link-accent-hover': `var(--av-${variant}-${isDark ? 300 : 700})`,
      '--av-nav-link-accent-soft': isDark
        ? `color-mix(in srgb, var(--av-${variant}-400) 16%, transparent)`
        : `var(--av-${variant}-50)`,
      '--av-nav-link-text': 'var(--av-color-text-muted)',
      '--av-nav-link-text-active': isDark ? `var(--av-${variant}-100)` : `var(--av-${variant}-800)`,
    };
  });

  readonly relValue = computed<string | null>(() => {
    if (this.rel()) return this.rel();

    return this.target() === '_blank' ? 'noopener noreferrer' : null;
  });

  handleClick(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.selected.emit(event);
    this.elementRef.nativeElement.dispatchEvent(
      new CustomEvent('av-nav-link-select', {
        bubbles: true,
        composed: true,
        detail: { source: this },
      })
    );
  }
}
