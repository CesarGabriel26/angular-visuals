import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Optional,
  Self,
  ViewChild,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { VISUALS_CONFIG } from '@av/lib/core/tokens';
import { ThemeService } from '@av/lib/core/services/ThemeService.service';

type AvRounded = number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'av-currency-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './av-currency-input.component.html',
  styleUrls: ['./av-currency-input.component.css'],
})
export class AvCurrencyInput implements ControlValueAccessor, AfterViewInit {
  private readonly config = inject(VISUALS_CONFIG);
  private readonly themeService = inject(ThemeService);

  label = input<string>('');
  currencySymbol = input<string>('R$');
  locale = input<string>('pt-BR');
  currencyCode = input<string>('BRL');
  placeholder = input<string>('0,00');
  variant = input<string>(this.config.theme.defaultVariant);
  ringColor = input<string | undefined>(undefined);
  rounded = input<AvRounded>('md');
  autoFocus = input<boolean>(false);
  errorMessage = input<string>('');

  @ViewChild('inputRef') inputEl!: ElementRef<HTMLInputElement>;

  formattedValue = signal<string>('');
  rawValue = signal<number | null>(null);
  disabled = signal<boolean>(false);

  onChange: (value: number | null) => void = () => { };
  onTouched: () => void = () => { };

  readonly activeVariant = computed(() => this.ringColor() || this.variant());

  readonly themeVars = computed<Record<string, string>>(() => {
    const variant = this.activeVariant();
    const isDark = this.themeService.dark();

    return {
      '--av-currency-accent': `var(--av-${variant}-${isDark ? 400 : 500})`,
      '--av-currency-symbol-bg': isDark
        ? `color-mix(in srgb, var(--av-${variant}-400) 12%, transparent)`
        : `var(--av-${variant}-50)`,
    };
  });

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngAfterViewInit(): void {
    if (this.autoFocus() && this.inputEl) {
      setTimeout(() => this.inputEl.nativeElement.focus(), 0);
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

  private formatCurrency(value: number | null): string {
    if (value === null || Number.isNaN(value)) return '';

    return new Intl.NumberFormat(this.locale(), {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  onInput(event: Event): void {
    const inputNode = event.target as HTMLInputElement;
    const digits = inputNode.value.replace(/\D/g, '');

    if (!digits) {
      this.rawValue.set(null);
      this.formattedValue.set('');
      this.onChange(null);
      return;
    }

    const numericValue = Number(digits) / 100;

    this.rawValue.set(numericValue);
    this.formattedValue.set(this.formatCurrency(numericValue));
    inputNode.value = this.formattedValue();
    this.onChange(numericValue);
  }

  handleBlur(): void {
    this.formattedValue.set(this.formatCurrency(this.rawValue()));
    this.onTouched();
  }

  writeValue(value: number | string | null): void {
    const numericValue = typeof value === 'number'
      ? value
      : typeof value === 'string' && value.trim() !== ''
        ? Number(value)
        : null;

    const normalizedValue = numericValue !== null && !Number.isNaN(numericValue)
      ? numericValue
      : null;

    this.rawValue.set(normalizedValue);
    this.formattedValue.set(this.formatCurrency(normalizedValue));
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
