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
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { VISUALS_CONFIG } from '@av/lib/core/tokens';
import { ThemeService } from '@av/lib/core/services/ThemeService.service';
import { AvIcon } from '@av/lib/components/base/av-icon/av-icon.component';

type AvRounded = number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'av-multiselect, av-multi-select',
  standalone: true,
  imports: [CommonModule, OverlayModule, AvIcon],
  styleUrls: ['./av-multi-select.component.css'],
  templateUrl: './av-multi-select.component.html',
})
export class AvMultiSelect implements ControlValueAccessor {
  private readonly config = inject(VISUALS_CONFIG);
  private readonly themeService = inject(ThemeService);

  data = input.required<any[]>();
  placeholder = input<string>('Selecione as opções');
  labelKey = input<string>('label');
  labelFormat = input<string>('');
  valueKey = input<string>('value');
  label = input<string>('');
  icon = input<string>('');
  searchPlaceholder = input<string>('Pesquisar...');
  searchable = input<boolean>(true);
  variant = input<string>(this.config.theme.defaultVariant);
  ringColor = input<string | undefined>(undefined);
  rounded = input<AvRounded>('md');
  errorMessage = input<string>('');
  onSearch = input<((searchQuery: string) => void) | undefined>();
  valueChange = output<any[]>();

  @ViewChild('triggerEl') triggerEl!: ElementRef<HTMLDivElement>;

  isOpen = signal<boolean>(false);
  searchTerm = signal<string>('');
  value = signal<any[]>([]);
  disabled = signal<boolean>(false);

  onChange: (value: any[]) => void = () => { };
  onTouched: () => void = () => { };

  readonly activeVariant = computed(() => this.ringColor() || this.variant());

  readonly themeVars = computed<Record<string, string>>(() => {
    const variant = this.activeVariant();
    const isDark = this.themeService.dark();
    const accent = `var(--av-${variant}-${isDark ? 400 : 500})`;

    return {
      '--av-multi-accent': accent,
      '--av-multi-accent-strong': `var(--av-${variant}-${isDark ? 300 : 600})`,
      '--av-multi-soft': isDark
        ? `color-mix(in srgb, var(--av-${variant}-400) 16%, transparent)`
        : `var(--av-${variant}-50)`,
      '--av-multi-selected-bg': isDark
        ? `color-mix(in srgb, var(--av-${variant}-400) 20%, transparent)`
        : `var(--av-${variant}-100)`,
      '--av-multi-selected-color': isDark
        ? `var(--av-${variant}-100)`
        : `var(--av-${variant}-800)`,
    };
  });

  filteredData = computed(() => {
    const query = this.searchTerm().toLowerCase().trim();
    const items = this.data() || [];

    if (!query || this.onSearch()) return items;

    return items.filter((item) => {
      const labelValue = this.getItemLabel(item);
      return String(labelValue).toLowerCase().includes(query);
    });
  });

  selectedOptions = computed(() => {
    const items = this.data() || [];
    const currentValues = this.value() || [];

    return items.filter((item) => currentValues.includes(this.getItemValue(item)));
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

  get triggerClasses(): string {
    return [
      this.isOpen() ? 'av-multi-select__trigger--open' : '',
      this.disabled() ? 'av-multi-select__trigger--disabled' : '',
      this.isInvalid ? 'av-multi-select__trigger--invalid' : '',
    ].filter(Boolean).join(' ');
  }

  get isInvalid(): boolean {
    return !!(this.ngControl && this.ngControl.invalid && (this.ngControl.dirty || this.ngControl.touched));
  }

  getItemLabel(item: any): string {
    if (typeof item === 'object' && item !== null) {
      if (!this.labelFormat() || this.labelFormat().trim() === '') {
        return item[this.labelKey()];
      }

      let label = this.labelFormat();

      Object.keys(item).forEach((key) => {
        label = label.replaceAll(`{${key}}`, item[key] ?? '');
      });

      return label;
    }

    return item;
  }

  getItemValue(item: any): any {
    return typeof item === 'object' && item !== null ? item[this.valueKey()] : item;
  }

  isSelected(item: any): boolean {
    return (this.value() || []).includes(this.getItemValue(item));
  }

  toggleDropdown(): void {
    if (this.disabled()) return;

    this.isOpen.set(!this.isOpen());

    if (!this.isOpen()) {
      this.onTouched();
    }
  }

  closeDropdown(): void {
    this.isOpen.set(false);
    this.searchTerm.set('');
    this.onTouched();
  }

  toggleOption(item: any): void {
    const itemValue = this.getItemValue(item);
    const currentValues = [...(this.value() || [])];
    const index = currentValues.indexOf(itemValue);

    if (index > -1) {
      currentValues.splice(index, 1);
    } else {
      currentValues.push(itemValue);
    }

    this.value.set(currentValues);
    this.onChange(currentValues);
    this.valueChange.emit(currentValues);
  }

  removeOption(event: MouseEvent, item: any): void {
    event.stopPropagation();
    this.toggleOption(item);
  }

  handleSearchInput(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchTerm.set(query);

    if (this.onSearch()) {
      this.onSearch()!(query);
    }
  }

  writeValue(value: any[]): void {
    this.value.set(Array.isArray(value) ? value : []);
  }

  registerOnChange(fn: (value: any[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
