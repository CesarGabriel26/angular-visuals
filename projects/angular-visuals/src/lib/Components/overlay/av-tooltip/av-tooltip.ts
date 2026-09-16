import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  computed,
  inject,
  input,
  numberAttribute,
  booleanAttribute,
  signal,
  Renderer2,
} from '@angular/core';
import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';
import { VISUALS_CONFIG } from '@av/lib/core/tokens';
import { ThemeService } from '@av/lib/core/services/ThemeService.service';

export type AvTooltipPosition = 'top' | 'right' | 'bottom' | 'left';

let nextTooltipId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  selector: 'av-tooltip-panel',
  styleUrl: './av-tooltip.css',
  templateUrl: './av-tooltip.html',
})
class AvTooltipPanel {
  readonly id = signal('');
  readonly text = signal('');
  readonly position = signal<AvTooltipPosition>('top');
  readonly themeVars = signal<Record<string, string>>({});
}

@Directive({
  exportAs: 'avTooltip',
  selector: '[av-tooltip], [avTooltip]',
  standalone: true,
})
export class AvTooltip implements OnDestroy {
  private readonly config = inject(VISUALS_CONFIG);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly overlay = inject(Overlay);
  private readonly renderer = inject(Renderer2);
  private readonly themeService = inject(ThemeService);

  text = input<string>('', { alias: 'av-tooltip' });
  textCamel = input<string>('', { alias: 'avTooltip' });
  position = input<AvTooltipPosition>('top', { alias: 'avTooltipPosition' });
  variant = input<string>(this.config.theme.defaultVariant, { alias: 'avTooltipVariant' });
  disabled = input<boolean, unknown>(false, {
    alias: 'avTooltipDisabled',
    transform: booleanAttribute,
  });
  showDelay = input<number, unknown>(120, {
    alias: 'avTooltipShowDelay',
    transform: numberAttribute,
  });
  hideDelay = input<number, unknown>(60, {
    alias: 'avTooltipHideDelay',
    transform: numberAttribute,
  });
  offset = input<number, unknown>(8, {
    alias: 'avTooltipOffset',
    transform: numberAttribute,
  });

  private readonly tooltipId = `av-tooltip-${++nextTooltipId}`;
  private overlayRef?: OverlayRef;
  private panel?: AvTooltipPanel;
  private positionStrategy?: FlexibleConnectedPositionStrategy;
  private positionSubscription?: Subscription;
  private showTimeout?: ReturnType<typeof setTimeout>;
  private hideTimeout?: ReturnType<typeof setTimeout>;
  private previousDescribedBy: string | null | undefined;

  private readonly content = computed(() => this.textCamel() || this.text());

  private readonly themeVars = computed<Record<string, string>>(() => {
    const variant = this.variant();
    const isDark = this.themeService.dark();
    const accent = `var(--av-${variant}-${isDark ? 400 : 500})`;

    return {
      '--av-tooltip-bg': isDark
        ? 'var(--av-color-surface-raised)'
        : 'var(--av-slate-950)',
      '--av-tooltip-border': isDark
        ? `color-mix(in srgb, ${accent} 34%, var(--av-color-border-soft))`
        : `color-mix(in srgb, ${accent} 44%, var(--av-slate-800))`,
      '--av-tooltip-color': isDark
        ? 'var(--av-color-text)'
        : 'var(--av-white)',
      '--av-tooltip-shadow': 'var(--av-shadow-raised)',
      '--av-tooltip-accent': accent,
    };
  });

  @HostListener('mouseenter')
  @HostListener('focusin')
  show(): void {
    if (this.disabled() || !this.content().trim()) return;

    clearTimeout(this.hideTimeout);
    clearTimeout(this.showTimeout);

    this.showTimeout = setTimeout(() => {
      this.open();
    }, Math.max(0, this.showDelay()));
  }

  @HostListener('mouseleave')
  @HostListener('focusout')
  hide(): void {
    clearTimeout(this.showTimeout);
    clearTimeout(this.hideTimeout);

    this.hideTimeout = setTimeout(() => {
      this.detach();
    }, Math.max(0, this.hideDelay()));
  }

  @HostListener('keydown.escape')
  hideImmediately(): void {
    clearTimeout(this.showTimeout);
    clearTimeout(this.hideTimeout);
    this.detach();
  }

  private open(): void {
    if (!this.overlayRef) {
      this.createOverlay();
    }

    this.positionStrategy?.withPositions(this.positionsFor(this.safePosition()));

    if (!this.overlayRef?.hasAttached()) {
      const portal = new ComponentPortal(AvTooltipPanel);
      const ref = this.overlayRef?.attach(portal);

      this.panel = ref?.instance;
      this.setAriaDescription();
    }

    this.updatePanel();
    this.overlayRef?.updatePosition();
  }

  private createOverlay(): void {
    this.positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withFlexibleDimensions(false)
      .withPush(true)
      .withViewportMargin(8)
      .withPositions(this.positionsFor(this.safePosition()));

    this.positionSubscription = this.positionStrategy.positionChanges.subscribe(({ connectionPair }) => {
      this.panel?.position.set(this.positionFromConnection(connectionPair));
    });

    this.overlayRef = this.overlay.create({
      panelClass: 'av-tooltip-overlay',
      positionStrategy: this.positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
  }

  private updatePanel(): void {
    if (!this.panel) return;

    this.panel.id.set(this.tooltipId);
    this.panel.text.set(this.content());
    this.panel.position.set(this.safePosition());
    this.panel.themeVars.set(this.themeVars());
  }

  private detach(): void {
    this.overlayRef?.detach();
    this.panel = undefined;
    this.restoreAriaDescription();
  }

  private setAriaDescription(): void {
    const host = this.elementRef.nativeElement;

    if (this.previousDescribedBy === undefined) {
      this.previousDescribedBy = host.getAttribute('aria-describedby');
    }

    const ids = [this.previousDescribedBy, this.tooltipId]
      .filter(Boolean)
      .join(' ');

    this.renderer.setAttribute(host, 'aria-describedby', ids);
  }

  private restoreAriaDescription(): void {
    const host = this.elementRef.nativeElement;

    if (this.previousDescribedBy) {
      this.renderer.setAttribute(host, 'aria-describedby', this.previousDescribedBy);
      return;
    }

    this.renderer.removeAttribute(host, 'aria-describedby');
  }

  private safePosition(): AvTooltipPosition {
    const position = this.position();

    return ['top', 'right', 'bottom', 'left'].includes(position)
      ? position
      : 'top';
  }

  private positionsFor(position: AvTooltipPosition): ConnectedPosition[] {
    const offset = Math.max(0, this.offset());
    const positions: Record<AvTooltipPosition, ConnectedPosition[]> = {
      top: [
        { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -offset },
        { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: offset },
      ],
      right: [
        { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: offset },
        { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -offset },
      ],
      bottom: [
        { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: offset },
        { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -offset },
      ],
      left: [
        { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -offset },
        { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: offset },
      ],
    };

    return positions[position];
  }

  private positionFromConnection(position: ConnectedPosition): AvTooltipPosition {
    if (position.overlayY === 'bottom' && position.originY === 'top') return 'top';
    if (position.overlayY === 'top' && position.originY === 'bottom') return 'bottom';
    if (position.overlayX === 'end' && position.originX === 'start') return 'left';

    return 'right';
  }

  ngOnDestroy(): void {
    clearTimeout(this.showTimeout);
    clearTimeout(this.hideTimeout);
    this.positionSubscription?.unsubscribe();
    this.overlayRef?.dispose();
    this.restoreAriaDescription();
  }
}
