import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  Component,
  ElementRef,
  forwardRef,
  inject,
  input,
  OnDestroy,
  output,
  signal,
  untracked,
  ViewChild,
  computed,
  effect
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { VISUALS_CONFIG } from '@av/lib/core/tokens';
import { ThemeService } from '@av/lib/core/services/ThemeService.service';
import { AvText } from '@av/lib/primitives/av-text/av-text';

export interface AvFileUploadFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  extension: string;
  lastModified: number;
  readableSize: string;
}

export interface AvFileUploadRejection {
  file: File;
  reason: 'accept';
  message: string;
}

export type AvFileUploadValue = AvFileUploadFile[];
type AvFileUploadInputValue = File | File[] | FileList | AvFileUploadFile | AvFileUploadFile[] | null | undefined;
type AvRounded = number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

let nextId = 0;

@Component({
  imports: [CommonModule, AvText],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AvFileUpload),
    },
  ],
  selector: 'av-file-upload',
  standalone: true,
  styleUrl: './av-file-upload.css',
  templateUrl: './av-file-upload.html',
})
export class AvFileUpload implements ControlValueAccessor, OnDestroy {
  private readonly config = inject(VISUALS_CONFIG);
  private readonly themeService = inject(ThemeService);

  @ViewChild('fileInput') private fileInput?: ElementRef<HTMLInputElement>;

  id = input<string>('');
  name = input<string>('');
  label = input<string>('');
  helper = input<string>('');
  emptyText = input<string>('Nenhum arquivo selecionado');
  loadingText = input<string>('Carregando...');
  dropText = input<string>('Solte para anexar');
  browseText = input<string>('Escolher');
  accept = input<string>('');
  capture = input<string | undefined>(undefined);
  value = input<AvFileUploadInputValue>(null);
  multiple = input<boolean, unknown>(false, { transform: booleanAttribute });
  disabled = input<boolean, unknown>(false, { transform: booleanAttribute });
  clearable = input<boolean, unknown>(true, { transform: booleanAttribute });
  showList = input<boolean, unknown>(true, { transform: booleanAttribute });
  variant = input<string>(this.config.theme.defaultVariant);
  ringColor = input<string | undefined>(undefined);
  rounded = input<AvRounded>('lg');
  errorMessage = input<string>('');

  valueChange = output<AvFileUploadValue>();
  filesChange = output<AvFileUploadValue>();
  rejected = output<AvFileUploadRejection[]>();
  cleared = output<void>();

  protected readonly inputId = `av-file-upload-${++nextId}`;
  protected readonly files = signal<AvFileUploadFile[]>([]);
  protected readonly dragging = signal(false);
  protected readonly statusOverride = signal<string | null>(null);
  protected readonly rejectionMessage = signal('');
  protected readonly formDisabled = signal(false);

  private statusTimeout?: ReturnType<typeof setTimeout>;
  private onChange: (value: AvFileUploadValue) => void = () => { };
  private onTouched: () => void = () => { };

  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  protected readonly activeVariant = computed(() => this.ringColor() || this.variant());

  protected readonly displayText = computed(() => {
    if (this.dragging()) return this.dropText();

    return this.statusOverride() || this.selectedLabel();
  });

  protected readonly supportingText = computed(() => {
    if (this.helper()) return this.helper();
    if (this.accept()) return `Aceita: ${this.accept()}`;

    return this.multiple()
      ? 'Selecione ou arraste vários arquivos'
      : 'Selecione ou arraste um arquivo';
  });

  protected readonly hostId = computed(() => this.id() || this.inputId);

  protected readonly themeVars = computed<Record<string, string>>(() => {
    const variant = this.activeVariant();
    const isDark = this.themeService.dark();
    const accentStep = isDark ? 400 : 500;

    return {
      '--av-file-upload-accent': `var(--av-${variant}-${accentStep})`,
      '--av-file-upload-accent-soft': isDark
        ? `color-mix(in srgb, var(--av-${variant}-400) 16%, transparent)`
        : `color-mix(in srgb, var(--av-${variant}-500) 10%, var(--av-color-surface))`,
      '--av-file-upload-ring': `color-mix(in srgb, var(--av-${variant}-${accentStep}) 24%, transparent)`,
      '--av-file-upload-rounded': this.roundedValue(),
    };
  });

  constructor() {
    effect(() => {
      const value = this.value();

      untracked(() => this.setFiles(this.normalizeInputValue(value), false));
    });
  }

  writeValue(value: AvFileUploadInputValue): void {
    this.setFiles(this.normalizeInputValue(value), false);
  }

  registerOnChange(fn: (value: AvFileUploadValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.formDisabled.set(disabled);
  }

  protected openPicker(event: Event): void {
    event.preventDefault();

    if (this.isDisabled()) return;

    this.fileInput?.nativeElement.click();
  }

  protected onNativeChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.handleFileList(input.files);
    input.value = '';
  }

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();

    if (this.isDisabled()) return;

    this.dragging.set(true);

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
  }

  protected onDragLeave(): void {
    this.dragging.set(false);
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(false);

    if (this.isDisabled()) return;

    this.handleFileList(event.dataTransfer?.files ?? null);
  }

  protected removeFile(fileId: string): void {
    if (this.isDisabled()) return;

    this.setFiles(this.files().filter((file) => file.id !== fileId), true);
    this.markTouched();
  }

  protected clear(): void {
    if (this.isDisabled()) return;

    this.setFiles([], true);
    this.cleared.emit();
    this.markTouched();
  }

  protected markTouched(): void {
    this.onTouched();
  }

  private handleFileList(fileList: FileList | null): void {
    const files = fileList ? Array.from(fileList) : [];

    this.rejectionMessage.set('');
    this.statusOverride.set(this.loadingText());
    clearTimeout(this.statusTimeout);

    const { accepted, rejections } = this.filterFiles(files);

    if (rejections.length) {
      this.rejected.emit(rejections);
      this.rejectionMessage.set(
        rejections.length === 1
          ? rejections[0].message
          : `${rejections.length} arquivos não correspondem ao filtro permitido.`
      );
    }

    if (accepted.length || !rejections.length) {
      this.setFiles(this.toEntries(accepted), true);
    }

    this.markTouched();

    this.statusTimeout = setTimeout(() => {
      this.statusOverride.set(null);
    }, 260);
  }

  private setFiles(files: AvFileUploadFile[], emit: boolean): void {
    const nextFiles = this.multiple() ? files : files.slice(0, 1);

    this.files.set(nextFiles);

    if (!nextFiles.length) {
      this.rejectionMessage.set('');
    }

    if (emit) {
      this.onChange(nextFiles);
      this.valueChange.emit(nextFiles);
      this.filesChange.emit(nextFiles);
    }
  }

  private normalizeInputValue(value: AvFileUploadInputValue): AvFileUploadFile[] {
    if (!value) return [];

    if (this.isFileList(value)) {
      return this.toEntries(Array.from(value));
    }

    if (this.isFile(value)) {
      return this.toEntries([value]);
    }

    if (Array.isArray(value)) {
      return value.flatMap((item, index) => {
        if (this.isUploadFile(item)) return item;
        if (this.isFile(item)) return [this.toEntry(item, index)];

        return [];
      });
    }

    if (this.isUploadFile(value)) {
      return [value];
    }

    return [];
  }

  private filterFiles(files: File[]): { accepted: File[]; rejections: AvFileUploadRejection[] } {
    const accepted: File[] = [];
    const rejections: AvFileUploadRejection[] = [];

    for (const file of files) {
      if (this.acceptsFile(file)) {
        accepted.push(file);
      } else {
        rejections.push({
          file,
          reason: 'accept',
          message: `${file.name} não corresponde ao filtro ${this.accept()}.`,
        });
      }
    }

    return { accepted, rejections };
  }

  private acceptsFile(file: File): boolean {
    const accept = this.accept().trim();

    if (!accept) return true;

    return accept.split(',').some((part) => {
      const rule = part.trim().toLowerCase();
      const fileName = file.name.toLowerCase();
      const fileType = file.type.toLowerCase();

      if (!rule) return true;
      if (rule.startsWith('.')) return fileName.endsWith(rule);
      if (rule.endsWith('/*')) return fileType.startsWith(rule.slice(0, -1));

      return fileType === rule;
    });
  }

  private toEntries(files: File[]): AvFileUploadFile[] {
    return files.map((file, index) => this.toEntry(file, index));
  }

  private toEntry(file: File, index: number): AvFileUploadFile {
    const extension = file.name.includes('.')
      ? file.name.split('.').pop()?.toLowerCase() ?? ''
      : '';

    return {
      extension,
      file,
      id: `${file.name}-${file.size}-${file.lastModified}-${index}`,
      lastModified: file.lastModified,
      name: file.name,
      readableSize: this.formatBytes(file.size),
      size: file.size,
      type: file.type || 'application/octet-stream',
    };
  }

  private selectedLabel(): string {
    const files = this.files();

    if (!files.length) return this.emptyText();
    if (files.length === 1) return files[0].name;

    return `${files.length} arquivos selecionados`;
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';

    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    const value = bytes / 1024 ** index;

    return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
  }

  private roundedValue(): string {
    const rounded = this.rounded();

    return typeof rounded === 'string'
      ? `var(--av-radius-${rounded})`
      : `${rounded}px`;
  }

  private isFile(value: unknown): value is File {
    return typeof File !== 'undefined' && value instanceof File;
  }

  private isFileList(value: unknown): value is FileList {
    return typeof FileList !== 'undefined' && value instanceof FileList;
  }

  private isUploadFile(value: unknown): value is AvFileUploadFile {
    return !!value && typeof value === 'object' && 'file' in value && this.isFile((value as AvFileUploadFile).file);
  }

  ngOnDestroy(): void {
    clearTimeout(this.statusTimeout);
  }
}
