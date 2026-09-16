import {
  Component,
  computed,
  forwardRef,
  inject,
  input,
  model
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import { VISUALS_CONFIG } from '@av/core/tokens';
import { ThemeService } from '@av/core/services/ThemeService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'av-switch',
  imports: [CommonModule],
  styleUrl: './av-switch.component.css',
  templateUrl: './av-switch.component.html',

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AvSwitch),
      multi: true
    }
  ]
})
export class AvSwitch implements ControlValueAccessor {

  private readonly config = inject(VISUALS_CONFIG);
  private readonly themeService = inject(ThemeService);

  variant = input<string>(
    this.config.theme.defaultVariant
  );

  rounded = input<
    number |
    'xs' |
    'sm' |
    'md' |
    'lg' |
    'xl' |
    'full'
  >('md');

  checked = model(false);

  disabled = input(false);

  // Disabled vindo do Angular Forms
  protected formDisabled = false;

  readonly isDisabled = computed(() =>
    this.disabled() || this.formDisabled
  );

  readonly themeVars = computed<Record<string, string>>(() => {
    const variant = this.variant();
    const isDark = this.themeService.dark();

    return {
      '--av-switch-active-bg':
        `var(--av-${variant}-${isDark ? 400 : 500})`,

      '--av-switch-rounded':
        typeof this.rounded() === 'string'
          ? `var(--av-radius-${this.rounded()})`
          : `${this.rounded()}px`
    };
  });

  // --------------------------------
  // ControlValueAccessor
  // --------------------------------

  private onChange: (value: boolean) => void = () => { };
  private onTouched: () => void = () => { };

  writeValue(value: boolean | null): void {
    this.checked.set(value ?? false);
  }

  registerOnChange(
    fn: (value: boolean) => void
  ): void {
    this.onChange = fn;
  }

  registerOnTouched(
    fn: () => void
  ): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.formDisabled = disabled;
  }

  // --------------------------------
  // Interaction
  // --------------------------------

  toggle(): void {
    if (this.isDisabled()) return;

    const value = !this.checked();

    this.checked.set(value);

    this.onChange(value);
    this.onTouched();
  }
}
