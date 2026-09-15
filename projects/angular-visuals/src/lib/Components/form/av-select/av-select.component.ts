import {
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  Optional,
  Self,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { AvIcon } from '../../av-icon/av-icon.component';
import { VISUALS_CONFIG } from '../../../../Core/tokens';
import { ThemeService } from '../../../../Core/services/ThemeService.service';
import { AvInput } from '../av-input/av-input.component';

@Component({
  selector: 'av-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, OverlayModule, AvIcon, AvInput],
  styleUrls: ['./av-select.component.css'],
  templateUrl: './av-select.component.html',
})
export class AvSelect implements ControlValueAccessor {
  private readonly config = inject(VISUALS_CONFIG);
  private readonly themeService = inject(ThemeService);

  data = input.required<any[]>();

  placeholder = input<string>('Selecione uma opção');
  labelKey = input<string>('label');
  labelFormat = input<string>('');
  valueKey = input<string>('value');
  label = input<string>('');
  icon = input<string>('');
  searchPlaceholder = input<string>('Pesquisar...');
  searchable = input<boolean>(true);
  loading = input<boolean>(false);
  loadingIcon = input<string>('blocks-shuffle-3');
  variant = input<string>(this.config.theme.defaultVariant);
  rounded = input<number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
  errorMessage = input<string>('');
  value = input<any>(null);
  onSearch = input<(searchQuery: string) => void>();
  valueChange = output<any>();

  @ViewChild('triggerEl') triggerEl!: ElementRef<HTMLDivElement>;

  isOpen = signal<boolean>(false);
  searchTerm = signal<string>('');
  _value = signal<any>(null);
  disabled = signal<boolean>(false);

  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    effect(() => {
      this._value.set(this.value());
    });
  }

  get roundedStyle(): string {
    if (typeof this.rounded() === 'string') {
      return `var(--av-radius-${this.rounded()})`;
    }

    return `${this.rounded()}px`;
  }

  get themeVars(): Record<string, string> {
    const isDark = this.themeService.dark();

    return {
      '--av-select-color': isDark ? 'var(--av-white)' : '#374151',
      '--av-select-muted-color': isDark ? 'var(--av-white)' : 'var(--av-neutral-400)',
      '--av-select-trigger-bg': isDark ? 'var(--av-neutral-900)' : '#fff',
      '--av-select-trigger-border': isDark ? 'var(--av-neutral-700)' : 'var(--av-neutral-300)',
      '--av-select-trigger-hover-border': isDark ? 'var(--av-neutral-600)' : 'var(--av-neutral-400)',
      '--av-select-panel-bg': isDark ? 'var(--av-neutral-900)' : '#fff',
      '--av-select-panel-border': isDark ? 'var(--av-neutral-700)' : 'var(--av-neutral-200)',
      '--av-select-panel-shadow': isDark ? '0 20px 30px rgb(15 23 42 / .35)' : '0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1)',
      '--av-select-search-bg': isDark ? 'rgba(15, 23, 42, .95)' : '#f9fafb',
      '--av-select-search-border': isDark ? 'var(--av-neutral-700)' : '#f3f4f6',
      '--av-select-search-color': isDark ? 'var(--av-white)' : '#374151',
      '--av-select-option-hover-bg': isDark ? 'rgba(148, 163, 184, .12)' : '#f3f4f6',
      '--av-select-option-selected-bg': isDark ? 'var(--av-select-soft, rgba(59, 130, 246, .18))' : 'var(--av-select-soft, #eff6ff)',
      '--av-select-empty-color': isDark ? 'var(--av-white)' : 'var(--av-neutral-400)',
    };
  }

  filteredData = computed(() => {
    const query = this.searchTerm().toLowerCase().trim();
    const items = this.data() || [];

    if (!query || this.onSearch()) return items;

    return items.filter((item) => {
      const labelValue = this.getItemLabel(item);
      return String(labelValue).toLowerCase().includes(query);
    });
  });

  selectedOption = computed(() => {
    const items = this.data() || [];
    return items.find((item) => this.getItemValue(item) === this._value());
  });

  get triggerClasses(): string {
    return [
      this.isOpen() ? 'av-select__trigger--open' : '',
      this.disabled() ? 'av-select__trigger--disabled' : '',
      this.isInvalid ? 'av-select__trigger--invalid' : '',
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
    return this.getItemValue(item) === this._value();
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

  selectOption(item: any): void {
    const val = this.getItemValue(item);
    this._value.set(val);
    this.onChange(val);
    this.valueChange.emit(val);
    this.closeDropdown();
  }

  handleSearchInput(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchTerm.set(query);

    if (this.onSearch()) {
      this.onSearch()!(query);
    }
  }

  writeValue(value: any): void {
    this._value.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
