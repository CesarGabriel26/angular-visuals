import { CommonModule } from '@angular/common';
import {
  Component,
  booleanAttribute,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { VISUALS_CONFIG } from '@av/lib/core/tokens';
import { ThemeService } from '@av/lib/core/services/ThemeService.service';
import { AvIcon } from '@av/lib/components/base/av-icon/av-icon.component';
import { AvStep } from '../av-step/av-step.component';

@Component({
  selector: 'av-stepper',
  standalone: true,
  imports: [CommonModule, AvIcon],
  styleUrls: ['./av-stepper.component.css'],
  templateUrl: './av-stepper.component.html',
})
export class AvStepper {
  private readonly config = inject(VISUALS_CONFIG);
  private readonly themeService = inject(ThemeService);

  canSetStep = input<boolean, unknown>(false, { transform: booleanAttribute });
  noContent = input<boolean, unknown>(false, { transform: booleanAttribute });
  variant = input<string>(this.config.theme.defaultVariant);
  currentStep = input<number | undefined>(undefined);
  stepChange = output<number>();

  items = contentChildren(AvStep, { descendants: true });
  currentItem = signal<number>(0);

  readonly themeVars = computed<Record<string, string>>(() => {
    const variant = this.variant();
    const isDark = this.themeService.dark();

    return {
      '--av-stepper-accent': `var(--av-${variant}-${isDark ? 400 : 500})`,
      '--av-stepper-accent-soft': isDark
        ? `color-mix(in srgb, var(--av-${variant}-400) 18%, transparent)`
        : `var(--av-${variant}-50)`,
      '--av-stepper-track': 'var(--av-color-border-soft)',
    };
  });

  constructor() {
    effect(() => {
      const selected = this.currentStep();

      if (selected !== undefined) {
        this.currentItem.set(this.clampIndex(selected));
      }
    });

    effect(() => {
      const stepList = this.items();
      const currentIndex = this.clampIndex(this.currentItem());

      if (currentIndex !== this.currentItem()) {
        this.currentItem.set(currentIndex);
      }

      stepList.forEach((item, index) => {
        item.index.set(index);
        item.isActive.set(index === currentIndex);
      });
    });
  }

  isDone(index: number): boolean {
    return this.currentItem() > index;
  }

  isActive(index: number): boolean {
    return this.currentItem() === index;
  }

  next(): void {
    this.changeTo(this.currentItem() + 1);
  }

  previous(): void {
    this.changeTo(this.currentItem() - 1);
  }

  changeTo(index: number): void {
    if (!this.canSetStep() && index !== this.currentItem() + 1 && index !== this.currentItem() - 1) return;

    const nextIndex = this.clampIndex(index);

    if (nextIndex === this.currentItem()) return;

    this.currentItem.set(nextIndex);
    this.stepChange.emit(nextIndex);
  }

  private clampIndex(index: number): number {
    const total = this.items().length;
    if (total <= 0) return 0;

    return Math.min(Math.max(index, 0), total - 1);
  }
}
