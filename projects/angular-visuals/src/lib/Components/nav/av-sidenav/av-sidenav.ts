import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  HostBinding,
  HostListener,
  PLATFORM_ID,
  Renderer2,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { VISUALS_CONFIG } from '../../../core/tokens';
import { ThemeService } from '../../../core/services/ThemeService.service';

export type AvSidenavMode = 'side' | 'drawer';
export type AvSidenavTrigger = ElementRef<HTMLElement> | HTMLElement | null | undefined;

@Component({
  imports: [CommonModule],
  selector: 'av-sidenav',
  styleUrl: './av-sidenav.css',
  templateUrl: './av-sidenav.html',
})
export class AvSidenav {
  private readonly config = inject(VISUALS_CONFIG);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly renderer = inject(Renderer2);
  private readonly themeService = inject(ThemeService);

  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly projectedToggleTrigger = contentChild<ElementRef<HTMLElement>>('toggleTrigger');
  private readonly drawerModeState = signal<boolean>(false);
  private readonly internalOpened = signal<boolean>(true);
  private missingTriggerWarned = false;
  private previousBodyOverflow: string | null = null;
  private lastMode: AvSidenavMode = 'side';

  ariaLabel = input<string>('Navegação principal');
  backdropLabel = input<string>('Fechar navegação');
  closeOnBackdrop = input<boolean, unknown>(true, { transform: booleanAttribute });
  closeOnNavigation = input<boolean, unknown>(true, { transform: booleanAttribute });
  drawerBreakpoint = input<number | string>(768);
  opened = input<boolean | undefined, unknown>(undefined, {
    transform: (value: unknown) => value === undefined ? undefined : booleanAttribute(value),
  });
  toggleable = input<boolean, unknown>(false, { transform: booleanAttribute });
  toggleTrigger = input<AvSidenavTrigger>(null);
  variant = input<string>(this.config.theme.defaultVariant);
  width = input<number | string>('16rem');

  openedChange = output<boolean>();
  modeChange = output<AvSidenavMode>();

  readonly drawerMode = computed<boolean>(() => this.drawerModeState());
  readonly isOpen = computed<boolean>(() => {
    if (!this.toggleable()) return true;

    return this.opened() ?? this.internalOpened();
  });

  readonly themeVars = computed<Record<string, string>>(() => {
    const variant = this.variant();
    const isDark = this.themeService.dark();

    console.log(variant);


    return {
      '--av-sidenav-accent': `var(--av-${variant}-${isDark ? 400 : 500})`,
      '--av-sidenav-accent-soft': isDark
        ? `color-mix(in srgb, var(--av-${variant}-400) 16%, transparent)`
        : `var(--av-${variant}-50)`,
      '--av-sidenav-border': 'var(--av-color-border-soft)',
      '--av-sidenav-surface': 'var(--av-color-surface)',
      '--av-sidenav-text': 'var(--av-color-text)',
      '--av-sidenav-muted': 'var(--av-color-text-muted)',
    };
  });

  @HostBinding('class.av-sidenav-host--drawer')
  get drawerClass(): boolean {
    return this.drawerMode();
  }

  @HostBinding('class.av-sidenav-host--closed')
  get closedClass(): boolean {
    return !this.isOpen();
  }

  @HostBinding('class.av-sidenav-host--toggleable')
  get toggleableClass(): boolean {
    return this.toggleable();
  }

  @HostBinding('style.--av-sidenav-width')
  get widthStyle(): string {
    return this.coerceCssLength(this.width());
  }

  constructor() {
    effect((onCleanup) => {
      if (!this.isBrowser) return;

      const mediaQuery = window.matchMedia(this.mediaQuery());
      const updateMode = (): void => {
        this.setDrawerMode(mediaQuery.matches);
      };

      updateMode();
      mediaQuery.addEventListener('change', updateMode);
      onCleanup(() => mediaQuery.removeEventListener('change', updateMode));
    });

    effect(() => {
      const controlledOpened = this.opened();

      if (controlledOpened !== undefined) {
        this.internalOpened.set(controlledOpened);
      }
    });

    effect(() => {
      this.drawerMode();
      this.isOpen();
      this.toggleable();
      this.updateBodyScroll();
    });

    effect((onCleanup) => {
      if (!this.toggleable()) return;

      const trigger = this.resolveToggleTrigger();

      if (!trigger) {
        this.warnMissingTrigger();
        return;
      }

      this.renderer.setAttribute(trigger, 'aria-controls', this.navId);
      this.renderer.setAttribute(trigger, 'aria-haspopup', 'dialog');

      const removeClickListener = this.renderer.listen(trigger, 'click', (event: Event) => {
        event.preventDefault();
        this.toggle();
      });

      onCleanup(() => {
        removeClickListener();
        this.renderer.removeAttribute(trigger, 'aria-controls');
        this.renderer.removeAttribute(trigger, 'aria-expanded');
        this.renderer.removeAttribute(trigger, 'aria-haspopup');
      });
    });

    effect(() => {
      if (!this.toggleable()) return;

      const trigger = this.resolveToggleTrigger();
      if (!trigger) return;

      this.renderer.setAttribute(trigger, 'aria-expanded', String(this.isOpen()));
    });

    this.destroyRef.onDestroy(() => {
      this.restoreBodyScroll();
    });
  }

  readonly navId = `av-sidenav-${Math.random().toString(36).slice(2, 9)}`;

  open(): void {
    this.setOpenState(true);
  }

  close(options: { restoreFocus?: boolean } = {}): void {
    this.setOpenState(false);

    if (options.restoreFocus) {
      this.resolveToggleTrigger()?.focus();
    }
  }

  toggle(): void {
    this.setOpenState(!this.isOpen());
  }

  closeFromBackdrop(): void {
    if (!this.closeOnBackdrop()) return;

    this.close({ restoreFocus: true });
  }

  handleNavigation(): void {
    if (!this.drawerMode() || !this.closeOnNavigation()) return;

    this.close();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: Event): void {
    if (!this.drawerMode() || !this.isOpen()) return;

    event.preventDefault();
    this.close({ restoreFocus: true });
  }

  private get mode(): AvSidenavMode {
    return this.drawerMode() ? 'drawer' : 'side';
  }

  private mediaQuery(): string {
    const breakpoint = this.drawerBreakpoint();

    if (typeof breakpoint === 'number') {
      return `(max-width: ${breakpoint}px)`;
    }

    const value = breakpoint.trim();
    if (value.startsWith('(')) return value;

    return `(max-width: ${value})`;
  }

  private setDrawerMode(isDrawer: boolean): void {
    this.drawerModeState.set(isDrawer);

    if (this.opened() === undefined && this.toggleable()) {
      this.internalOpened.set(!isDrawer);
    }

    if (this.mode !== this.lastMode) {
      this.lastMode = this.mode;
      this.modeChange.emit(this.mode);
    }
  }

  private setOpenState(open: boolean): void {
    if (!this.toggleable()) return;

    this.internalOpened.set(open);
    this.openedChange.emit(open);
    this.updateBodyScroll();
  }

  private updateBodyScroll(): void {
    if (!this.isBrowser) return;

    const shouldLock = this.drawerMode() && this.isOpen() && this.toggleable();

    if (shouldLock && this.previousBodyOverflow === null) {
      this.previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return;
    }

    if (!shouldLock && this.previousBodyOverflow !== null) {
      document.body.style.overflow = this.previousBodyOverflow;
      this.previousBodyOverflow = null;
    }
  }

  private restoreBodyScroll(): void {
    if (!this.isBrowser) return;

    if (this.previousBodyOverflow !== null) {
      document.body.style.overflow = this.previousBodyOverflow;
      this.previousBodyOverflow = null;
    }
  }

  private resolveToggleTrigger(): HTMLElement | null {
    const trigger = this.toggleTrigger();
    const projectedTrigger = this.projectedToggleTrigger();

    if (trigger instanceof ElementRef) {
      return trigger.nativeElement;
    }

    if (typeof HTMLElement !== 'undefined' && trigger instanceof HTMLElement) {
      return trigger;
    }

    return projectedTrigger?.nativeElement ?? null;
  }

  private warnMissingTrigger(): void {
    if (this.missingTriggerWarned) return;

    this.missingTriggerWarned = true;
    console.warn(
      'AvSidenav: quando toggleable estiver habilitado, forneça um botão com #toggleTrigger e passe-o em [toggleTrigger].'
    );
  }

  private coerceCssLength(value: number | string): string {
    if (typeof value === 'number') {
      return `${value}px`;
    }

    return value;
  }
}
