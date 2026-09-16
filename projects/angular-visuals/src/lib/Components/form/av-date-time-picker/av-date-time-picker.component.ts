import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import {
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
import { VISUALS_CONFIG } from '@av/core/tokens';
import { ThemeService } from '@av/core/services/ThemeService.service';
import { AvIcon } from '@av/lib/components/base/av-icon/av-icon.component';

export type DatePickerMode = 'date' | 'time' | 'datetime';

type AvRounded = number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'av-date-time-picker, av-date-picker',
  standalone: true,
  imports: [CommonModule, OverlayModule, AvIcon],
  templateUrl: './av-date-time-picker.component.html',
  styleUrls: ['./av-date-time-picker.component.css'],
})
export class AvDateTimePicker implements ControlValueAccessor {
  private readonly config = inject(VISUALS_CONFIG);
  private readonly themeService = inject(ThemeService);

  mode = input<DatePickerMode>('datetime');
  label = input<string>('');
  placeholder = input<string>('Selecione...');
  locale = input<string>('pt-BR');
  icon = input<string>('');
  variant = input<string>(this.config.theme.defaultVariant);
  ringColor = input<string | undefined>(undefined);
  rounded = input<AvRounded>('md');
  errorMessage = input<string>('');

  @ViewChild('triggerEl') triggerEl!: ElementRef<HTMLButtonElement>;

  isOpen = signal<boolean>(false);
  disabled = signal<boolean>(false);
  selectedDate = signal<Date | null>(null);
  viewDate = signal<Date>(new Date());
  activeTab = signal<'date' | 'time'>('date');
  hours = signal<number>(new Date().getHours());
  minutes = signal<number>(0);

  readonly weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  readonly hourOptions = Array.from({ length: 24 }, (_, index) => index);
  readonly minuteOptions = Array.from({ length: 12 }, (_, index) => index * 5);

  onChange: (value: string | null) => void = () => { };
  onTouched: () => void = () => { };

  readonly activeVariant = computed(() => this.ringColor() || this.variant());

  readonly themeVars = computed<Record<string, string>>(() => {
    const variant = this.activeVariant();
    const isDark = this.themeService.dark();

    return {
      '--av-date-accent': `var(--av-${variant}-${isDark ? 400 : 500})`,
      '--av-date-accent-strong': `var(--av-${variant}-${isDark ? 300 : 600})`,
      '--av-date-accent-soft': isDark
        ? `color-mix(in srgb, var(--av-${variant}-400) 16%, transparent)`
        : `var(--av-${variant}-50)`,
    };
  });

  calendarDays = computed(() => {
    const year = this.viewDate().getFullYear();
    const month = this.viewDate().getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  });

  monthLabel = computed(() => {
    return new Intl.DateTimeFormat(this.locale(), {
      month: 'long',
      year: 'numeric',
    }).format(this.viewDate());
  });

  displayValue = computed(() => {
    const date = this.selectedDate();
    if (!date) return '';

    const time = `${String(this.hours()).padStart(2, '0')}:${String(this.minutes()).padStart(2, '0')}`;

    if (this.mode() === 'date') {
      return date.toLocaleDateString(this.locale());
    }

    if (this.mode() === 'time') {
      return time;
    }

    return `${date.toLocaleDateString(this.locale())} ${time}`;
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

  get defaultIcon(): string {
    if (this.icon()) return this.icon();
    return this.mode() === 'time' ? 'schedule' : 'calendar_today';
  }

  get isInvalid(): boolean {
    return !!(this.ngControl && this.ngControl.invalid && (this.ngControl.dirty || this.ngControl.touched));
  }

  toggleDropdown(): void {
    if (this.disabled()) return;

    this.isOpen.set(!this.isOpen());

    if (this.isOpen()) {
      this.activeTab.set(this.mode() === 'time' ? 'time' : 'date');
    } else {
      this.onTouched();
    }
  }

  closeDropdown(): void {
    this.isOpen.set(false);
    this.onTouched();
  }

  changeMonth(offset: number): void {
    const current = this.viewDate();
    this.viewDate.set(new Date(current.getFullYear(), current.getMonth() + offset, 1));
  }

  selectDay(day: Date | null): void {
    if (!day) return;

    const updated = new Date(day.getFullYear(), day.getMonth(), day.getDate(), this.hours(), this.minutes());
    this.selectedDate.set(updated);
    this.emitValue(updated);

    if (this.mode() === 'datetime') {
      this.activeTab.set('time');
      return;
    }

    if (this.mode() === 'date') {
      this.closeDropdown();
    }
  }

  selectHour(hour: number): void {
    this.hours.set(hour);
    this.updateTimeInSelectedDate();
  }

  selectMinute(minute: number): void {
    this.minutes.set(minute);
    this.updateTimeInSelectedDate();
  }

  confirmSelection(): void {
    if (!this.selectedDate()) {
      this.updateTimeInSelectedDate();
    }

    this.closeDropdown();
  }

  updateTimeInSelectedDate(): void {
    const current = this.selectedDate() || new Date();
    const updated = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate(),
      this.hours(),
      this.minutes(),
    );

    this.selectedDate.set(updated);
    this.viewDate.set(updated);
    this.emitValue(updated);
  }

  isDaySelected(day: Date | null): boolean {
    if (!day || !this.selectedDate()) return false;

    const selected = this.selectedDate()!;
    return day.getDate() === selected.getDate()
      && day.getMonth() === selected.getMonth()
      && day.getFullYear() === selected.getFullYear();
  }

  private emitValue(date: Date): void {
    this.onChange(date.toISOString());
  }

  writeValue(value: string | Date | null): void {
    if (!value) {
      this.selectedDate.set(null);
      return;
    }

    const parsedDate = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
      this.selectedDate.set(null);
      return;
    }

    this.selectedDate.set(parsedDate);
    this.viewDate.set(parsedDate);
    this.hours.set(parsedDate.getHours());
    this.minutes.set(parsedDate.getMinutes());
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
