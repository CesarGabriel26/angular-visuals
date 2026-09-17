import { CommonModule } from '@angular/common';
import { Component, booleanAttribute, computed, effect, inject, input, output, signal } from '@angular/core';
import { AvIcon } from '../../base/av-icon/av-icon.component';
import { VISUALS_CONFIG } from '../../../core/tokens';
import { ThemeService } from '../../../core/services/ThemeService.service';

@Component({
  imports: [CommonModule, AvIcon],
  selector: 'av-dropdown',
  styleUrl: './av-dropdown.component.css',
  templateUrl: './av-dropdown.component.html',
})
export class AvDropdown {
  private readonly config = inject(VISUALS_CONFIG);
  private readonly themeService = inject(ThemeService);

  badge = input<string | number | null>(null);
  disabled = input<boolean, unknown>(false, { transform: booleanAttribute });
  expanded = input<boolean | undefined, unknown>(undefined, {
    transform: (value: unknown) => value === undefined ? undefined : booleanAttribute(value),
  });
  icon = input<string>('');
  label = input<string>('');
  variant = input<string>(this.config.theme.defaultVariant);

  expandedChange = output<boolean>();

  private readonly internalExpanded = signal<boolean>(false);

  readonly panelId = `av-dropdown-${Math.random().toString(36).slice(2, 9)}`;
  readonly isExpanded = computed<boolean>(() => this.expanded() ?? this.internalExpanded());
  readonly themeVars = computed<Record<string, string>>(() => {
    const variant = this.variant();
    const isDark = this.themeService.dark();

    return {
      '--av-dropdown-accent': `var(--av-${variant}-${isDark ? 400 : 500})`,
      '--av-dropdown-accent-hover': `var(--av-${variant}-${isDark ? 300 : 700})`,
      '--av-dropdown-accent-soft': isDark
        ? `color-mix(in srgb, var(--av-${variant}-400) 16%, transparent)`
        : `var(--av-${variant}-50)`,
      '--av-dropdown-text': 'var(--av-color-text-muted)',
      '--av-dropdown-text-active': isDark ? `var(--av-${variant}-100)` : `var(--av-${variant}-800)`,
    };
  });

  constructor() {
    effect(() => {
      const controlledExpanded = this.expanded();

      if (controlledExpanded !== undefined) {
        this.internalExpanded.set(controlledExpanded);
      }
    });
  }

  toggle(): void {
    if (this.disabled()) return;

    const next = !this.isExpanded();
    this.internalExpanded.set(next);
    this.expandedChange.emit(next);
  }
}
