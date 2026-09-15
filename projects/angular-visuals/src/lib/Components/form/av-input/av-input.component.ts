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
import { AvIcon } from '../../av-icon/av-icon.component';
import { VISUALS_CONFIG } from '../../../../Core/tokens';

@Component({
  selector: 'av-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AvIcon],
  templateUrl: './av-input.component.html',
  styleUrls: ['./av-input.component.css'],
})
export class AvInput implements ControlValueAccessor, AfterViewInit {
  private readonly config = inject(VISUALS_CONFIG);

  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() label: string = '';

  @Input() autoFocus: boolean = false;

  icon = input<string>();
  loadingIcon = input<string>();
  loading = input<boolean>(false)
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
    if (this.autoFocus && this.inputEl) {
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
