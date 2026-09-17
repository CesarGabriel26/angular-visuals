import { CommonModule } from '@angular/common';
import { Component, Optional, Self, computed, inject, input, output, signal } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { VISUALS_CONFIG } from '../../../core/tokens';
import { ThemeService } from '../../../core/services/ThemeService.service';
import { AvIcon } from '../../base/av-icon/av-icon.component';

type AvRounded = number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'av-checkbox',
  standalone: true,
  imports: [CommonModule, AvIcon],
  templateUrl: './av-checkbox.component.html',
  styleUrls: ['./av-checkbox.component.css'],
})
export class AvCheckbox implements ControlValueAccessor {
  private readonly config = inject(VISUALS_CONFIG);
  private readonly themeService = inject(ThemeService);

  label = input<string>('');
  icon = input<string>('check');
  variant = input<string>(this.config.theme.defaultVariant);
  ringColor = input<string | undefined>(undefined);
  rounded = input<AvRounded>('md');
  errorMessage = input<string>('');

  changed = output<boolean>();
  valueChange = output<boolean>();

  value = signal<boolean>(false);
  disabled = signal<boolean>(false);

  onChange: (value: boolean) => void = () => { };
  onTouched: () => void = () => { };

  readonly activeVariant = computed(() => this.ringColor() || this.variant());

  readonly themeVars = computed<Record<string, string>>(() => {
    const variant = this.activeVariant();
    const isDark = this.themeService.dark();

    return {
      '--av-checkbox-accent': `var(--av-${variant}-500)`,
      '--av-checkbox-accent-hover': `var(--av-${variant}-${isDark ? 400 : 600})`,
      '--av-checkbox-accent-soft': isDark
        ? `color-mix(in srgb, var(--av-${variant}-400) 20%, transparent)`
        : `var(--av-${variant}-50)`,
    };
  });

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  get roundedStyle(): string {
    if (typeof this.rounded() === 'string') {
      return `var(--av-radius-${this.rounded()})`;
    }

    return `${this.rounded()}px`;
  }

  get isInvalid(): boolean {
    return !!(this.ngControl && this.ngControl.invalid && (this.ngControl.dirty || this.ngControl.touched));
  }

  handleChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;

    this.value.set(checked);
    this.onChange(checked);
    this.changed.emit(checked);
    this.valueChange.emit(checked);
  }

  writeValue(value: boolean): void {
    this.value.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
