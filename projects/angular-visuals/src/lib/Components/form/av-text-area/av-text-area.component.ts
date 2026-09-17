import {
  Component,
  Input,
  Self,
  Optional,
  ElementRef,
  ViewChild,
  AfterViewInit,
  input,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NgControl,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { AvIcon } from '../../base/av-icon/av-icon.component';
import { VISUALS_CONFIG } from '../../../core/tokens';

@Component({
  selector: 'av-text-area',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AvIcon],
  templateUrl: './av-text-area.component.html',
  styleUrls: ['./av-text-area.component.css'],
})
export class AvTextArea implements ControlValueAccessor, AfterViewInit {
  private readonly config = inject(VISUALS_CONFIG);

  placeholder = input<string>('');
  type = input<string>('text');
  label = input<string>();
  icon = input<string>();
  loading = input<boolean>(false);
  autoFocus = input<boolean>(false);
  loadingIcon = input<string>('blocks-shuffle-3');
  variant = input<string>(this.config.theme.defaultVariant);
  rounded = input<number | "xs" | "sm" | "md" | "lg" | "xl" | "full">("md");

  errorMessage = input<string>('');

  @ViewChild('inputRef') inputEl!: ElementRef<HTMLInputElement>;

  value: any = '';
  disabled: boolean = false;

  // Funções de callback registradas pelo Angular Forms
  onChange: any = () => { };
  onTouched: any = () => { };

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

  get controlClasses(): string {
    return [
      this.isInvalid ? 'av-input__control--invalid' : '',
    ].filter(Boolean).join(' ');
  }

  get isInvalid(): boolean {
    return !!(this.ngControl && this.ngControl.invalid && (this.ngControl.dirty || this.ngControl.touched));
  }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }
}
