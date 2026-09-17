import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  Component,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  numberAttribute,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { VISUALS_CONFIG } from '../../../core/tokens';
import { ThemeService } from '../../../core/services/ThemeService.service';

export type AvSliderRangeValue = [number, number];
export type AvSliderValue = number | AvSliderRangeValue;

type AvSliderInputValue = AvSliderValue | string | null | undefined;
type AvSliderThumb = 'lower' | 'upper';
type AvRounded = number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  imports: [CommonModule],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AvSlider),
    },
  ],
  selector: 'av-slider, lib-av-slider',
  standalone: true,
  styleUrl: './av-slider.css',
  templateUrl: './av-slider.html',
})
export class AvSlider implements ControlValueAccessor {
  private readonly config = inject(VISUALS_CONFIG);
  private readonly themeService = inject(ThemeService);

  label = input<string>('');
  value = input<AvSliderInputValue>(null);
  min = input<number, unknown>(0, { transform: numberAttribute });
  max = input<number, unknown>(100, { transform: numberAttribute });
  step = input<number, unknown>(1, { transform: numberAttribute });
  range = input<boolean, unknown>(false, { transform: booleanAttribute });
  thumbLabel = input<boolean, unknown>(true, { transform: booleanAttribute });
  showValue = input<boolean, unknown>(false, { transform: booleanAttribute });
  disabled = input<boolean, unknown>(false, { transform: booleanAttribute });
  variant = input<string>(this.config.theme.defaultVariant);
  ringColor = input<string | undefined>(undefined);
  rounded = input<AvRounded>('full');
  valuePrefix = input<string>('');
  valueSuffix = input<string>('');
  displayWith = input<((value: number) => string) | undefined>(undefined);
  ariaLabel = input<string>('Slider');
  lowerAriaLabel = input<string>('Valor inicial');
  upperAriaLabel = input<string>('Valor final');

  valueChange = output<AvSliderValue>();
  changed = output<AvSliderValue>();

  protected readonly lowerValue = signal(50);
  protected readonly upperValue = signal(100);
  protected readonly formDisabled = signal(false);
  protected readonly activeThumb = signal<AvSliderThumb>('lower');

  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());

  protected readonly safeMin = computed(() => this.coerceNumber(this.min(), 0));

  protected readonly safeMax = computed(() => {
    const min = this.safeMin();
    const max = this.coerceNumber(this.max(), min + 100);

    return max > min ? max : min + 1;
  });

  protected readonly safeStep = computed(() => {
    const step = this.coerceNumber(this.step(), 1);

    return step > 0 ? step : 1;
  });

  protected readonly roundedStyle = computed(() => {
    const rounded = this.rounded();

    return typeof rounded === 'string'
      ? `var(--av-radius-${rounded})`
      : `${rounded}px`;
  });

  protected readonly activeVariant = computed(() => this.ringColor() || this.variant());

  protected readonly lowerPercent = computed(() => this.toPercent(this.lowerValue()));

  protected readonly upperPercent = computed(() =>
    this.range() ? this.toPercent(this.upperValue()) : this.lowerPercent()
  );

  protected readonly fillLeft = computed(() =>
    this.range() ? Math.min(this.lowerPercent(), this.upperPercent()) : 0
  );

  protected readonly fillWidth = computed(() =>
    this.range()
      ? Math.abs(this.upperPercent() - this.lowerPercent())
      : this.lowerPercent()
  );

  protected readonly displayValue = computed(() => {
    if (this.range()) {
      return `${this.formatValue(this.lowerValue())} - ${this.formatValue(this.upperValue())}`;
    }

    return this.formatValue(this.lowerValue());
  });

  protected readonly themeVars = computed<Record<string, string>>(() => {
    const variant = this.activeVariant();
    const isDark = this.themeService.dark();
    const accentStep = isDark ? 400 : 500;
    const strongStep = isDark ? 300 : 600;

    return {
      '--av-slider-accent': `var(--av-${variant}-${accentStep})`,
      '--av-slider-accent-strong': `var(--av-${variant}-${strongStep})`,
      '--av-slider-focus-ring': `color-mix(in srgb, var(--av-${variant}-${accentStep}) 26%, transparent)`,
      '--av-slider-track': isDark
        ? `color-mix(in srgb, var(--av-${variant}-400) 14%, var(--av-color-surface-muted))`
        : `color-mix(in srgb, var(--av-${variant}-500) 12%, var(--av-color-surface-muted))`,
      '--av-slider-rounded': this.roundedStyle(),
    };
  });

  private onChange: (value: AvSliderValue) => void = () => { };
  private onTouched: () => void = () => { };

  constructor() {
    effect(() => {
      this.syncExternalValue(
        this.value(),
        this.range(),
        this.safeMin(),
        this.safeMax(),
        this.safeStep()
      );
    });
  }

  writeValue(value: AvSliderInputValue): void {
    this.syncExternalValue(
      value,
      this.range(),
      this.safeMin(),
      this.safeMax(),
      this.safeStep()
    );
  }

  registerOnChange(fn: (value: AvSliderValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.formDisabled.set(disabled);
  }

  protected onInput(thumb: AvSliderThumb, event: Event): void {
    const target = event.target as HTMLInputElement;

    this.activeThumb.set(thumb);
    this.setThumbValue(thumb, target.value, true);
  }

  protected onTrackPointerDown(event: PointerEvent): void {
    if (this.isDisabled()) return;

    const target = event.currentTarget as HTMLElement;
    const bounds = target.getBoundingClientRect();
    const ratio = bounds.width <= 0
      ? 0
      : (event.clientX - bounds.left) / bounds.width;
    const value = this.safeMin() + this.clamp(ratio, 0, 1) * (this.safeMax() - this.safeMin());
    const thumb = this.closestThumb(value);

    this.activeThumb.set(thumb);
    this.setThumbValue(thumb, value, true);
    this.markTouched();
  }

  protected markTouched(): void {
    this.onTouched();
  }

  protected formatValue(value: number): string {
    const displayWith = this.displayWith();

    if (displayWith) {
      return displayWith(value);
    }

    return `${this.valuePrefix()}${this.trimValue(value)}${this.valueSuffix()}`;
  }

  private syncExternalValue(
    value: AvSliderInputValue,
    range: boolean,
    min: number,
    max: number,
    step: number
  ): void {
    if (range) {
      const [lower, upper] = this.coerceRangeValue(value, min, max, step);

      this.lowerValue.set(lower);
      this.upperValue.set(upper);
      return;
    }

    const nextValue = this.coerceSingleValue(value, min, max, step);

    this.lowerValue.set(nextValue);
    this.upperValue.set(nextValue);
  }

  private setThumbValue(thumb: AvSliderThumb, value: unknown, emit: boolean): void {
    const nextValue = this.normalizeValue(value);

    if (this.range()) {
      if (thumb === 'lower') {
        this.lowerValue.set(Math.min(nextValue, this.upperValue()));
      } else {
        this.upperValue.set(Math.max(nextValue, this.lowerValue()));
      }
    } else {
      this.lowerValue.set(nextValue);
      this.upperValue.set(nextValue);
    }

    if (emit) {
      this.emitValue();
    }
  }

  private emitValue(): void {
    const value: AvSliderValue = this.range()
      ? [this.lowerValue(), this.upperValue()]
      : this.lowerValue();

    this.onChange(value);
    this.valueChange.emit(value);
    this.changed.emit(value);
  }

  private closestThumb(value: number): AvSliderThumb {
    if (!this.range()) return 'lower';

    const lowerDistance = Math.abs(value - this.lowerValue());
    const upperDistance = Math.abs(value - this.upperValue());

    return lowerDistance <= upperDistance ? 'lower' : 'upper';
  }

  private coerceSingleValue(
    value: AvSliderInputValue,
    min: number,
    max: number,
    step: number
  ): number {
    if (Array.isArray(value)) {
      return this.normalizeValue(value[0], min, max, step);
    }

    if (typeof value === 'string' && value.includes(',')) {
      return this.normalizeValue(value.split(',')[0], min, max, step);
    }

    if (value === null || value === undefined) {
      return this.normalizeValue(min + (max - min) / 2, min, max, step);
    }

    return this.normalizeValue(value, min, max, step);
  }

  private coerceRangeValue(
    value: AvSliderInputValue,
    min: number,
    max: number,
    step: number
  ): AvSliderRangeValue {
    let lower: unknown = min;
    let upper: unknown = max;

    if (Array.isArray(value)) {
      [lower, upper] = value;
    } else if (typeof value === 'string' && value.includes(',')) {
      [lower, upper] = value.split(',');
    } else if (value !== null && value !== undefined) {
      lower = value;
    }

    const normalizedLower = this.normalizeValue(lower, min, max, step);
    const normalizedUpper = this.normalizeValue(upper, min, max, step);

    return normalizedLower <= normalizedUpper
      ? [normalizedLower, normalizedUpper]
      : [normalizedUpper, normalizedLower];
  }

  private normalizeValue(
    value: unknown,
    min = this.safeMin(),
    max = this.safeMax(),
    step = this.safeStep()
  ): number {
    const numeric = this.coerceNumber(value, min);
    const clamped = this.clamp(numeric, min, max);
    const steps = Math.round((clamped - min) / step);
    const stepped = min + steps * step;
    const precision = this.stepPrecision(step);

    return this.clamp(Number(stepped.toFixed(precision)), min, max);
  }

  private toPercent(value: number): number {
    const min = this.safeMin();
    const max = this.safeMax();

    return ((this.clamp(value, min, max) - min) / (max - min)) * 100;
  }

  private coerceNumber(value: unknown, fallback: number): number {
    const numeric = Number(value);

    return Number.isFinite(numeric) ? numeric : fallback;
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  private stepPrecision(step: number): number {
    const [, decimals = ''] = String(step).split('.');

    return decimals.length;
  }

  private trimValue(value: number): string {
    return Number.isInteger(value)
      ? String(value)
      : String(Number(value.toFixed(4)));
  }
}
