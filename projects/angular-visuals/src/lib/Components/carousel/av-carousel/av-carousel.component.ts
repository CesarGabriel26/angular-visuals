import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  booleanAttribute,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { VISUALS_CONFIG } from '../../../../Core/tokens';
import { ThemeService } from '../../../../Core/services/ThemeService.service';
import { AvIcon } from '../../av-icon/av-icon.component';
import { AvCarouselItem } from '../av-carousel-item/av-carousel-item.component';

@Component({
  selector: 'av-carousel',
  standalone: true,
  imports: [CommonModule, AvIcon],
  styleUrls: ['./av-carousel.component.css'],
  templateUrl: './av-carousel.component.html',
})
export class AvCarousel implements OnDestroy {
  private readonly config = inject(VISUALS_CONFIG);
  private readonly themeService = inject(ThemeService);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  @ViewChild('content') contentContainer?: ElementRef<HTMLDivElement>;

  auto = input<boolean, unknown>(true, { transform: booleanAttribute });
  controls = input<boolean, unknown>(true, { transform: booleanAttribute });
  dots = input<boolean, unknown>(true, { transform: booleanAttribute });
  transition = input<'scroll' | 'fade'>('fade');
  variant = input<string>(this.config.theme.defaultVariant);
  transitionDelay = input<number | undefined>(undefined);

  indexChange = output<number>();

  items = contentChildren(AvCarouselItem, { descendants: true });
  currentItem = signal<number>(0);

  readonly themeVars = computed<Record<string, string>>(() => {
    const variant = this.variant();
    const isDark = this.themeService.dark();

    return {
      '--av-carousel-accent': `var(--av-${variant}-${isDark ? 400 : 500})`,
      '--av-carousel-control-bg': isDark ? 'rgb(15 23 42 / .72)' : 'rgb(255 255 255 / .72)',
      '--av-carousel-control-color': 'var(--av-color-text)',
      '--av-carousel-dot-bg': isDark ? 'rgb(148 163 184 / .48)' : 'rgb(15 23 42 / .28)',
    };
  });

  readonly canNavigate = computed(() => this.items().length > 1);

  constructor() {
    effect((onCleanup) => {
      const itemList = this.items();
      const currentIndex = this.normalizeIndex(this.currentItem());
      const transition = this.transition();

      if (currentIndex !== this.currentItem()) {
        this.currentItem.set(currentIndex);
      }

      itemList.forEach((item, index) => {
        item.index.set(index);
        item.transition.set(transition);
        item.isActive.set(index === currentIndex);
      });

      queueMicrotask(() => this.scrollToCurrent());

      if (this.auto() && itemList.length > 1) {
        const activeItem = itemList[currentIndex];
        const delay = activeItem?.duration() ?? this.transitionDelay() ?? 5000;

        this.intervalId = setInterval(() => this.next(), delay);
        onCleanup(() => this.clearTimer());
      }
    });
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  next(): void {
    const total = this.items().length;
    if (total <= 0) return;

    this.changeTo((this.currentItem() + 1) % total);
  }

  previous(): void {
    const total = this.items().length;
    if (total <= 0) return;

    this.changeTo((this.currentItem() - 1 + total) % total);
  }

  changeTo(index: number): void {
    const nextIndex = this.normalizeIndex(index);

    this.currentItem.set(nextIndex);
    this.indexChange.emit(nextIndex);
  }

  private normalizeIndex(index: number): number {
    const total = this.items().length;
    if (total <= 0) return 0;

    return Math.min(Math.max(index, 0), total - 1);
  }

  private scrollToCurrent(): void {
    if (this.transition() !== 'scroll') return;

    const container = this.contentContainer?.nativeElement;
    if (!container) return;

    container.scrollTo({
      left: container.clientWidth * this.currentItem(),
      behavior: 'smooth',
    });
  }

  private clearTimer(): void {
    if (!this.intervalId) return;

    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}
