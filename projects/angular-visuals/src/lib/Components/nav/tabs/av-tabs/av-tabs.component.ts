import { CommonModule } from '@angular/common';
import { Component, computed, contentChildren, effect, inject, input, output, signal } from '@angular/core';
import { VISUALS_CONFIG } from '@av/core/tokens';
import { ThemeService } from '@av/core/services/ThemeService.service';
import { AvIcon } from '@av/lib/components/base/av-icon/av-icon.component';
import { AvTab } from '../av-tab/av-tab.component';

@Component({
  selector: 'av-tabs, av-tab-container',
  standalone: true,
  imports: [CommonModule, AvIcon],
  styleUrls: ['./av-tabs.component.css'],
  templateUrl: './av-tabs.component.html',
})
export class AvTabs {
  private readonly config = inject(VISUALS_CONFIG);
  private readonly themeService = inject(ThemeService);

  variant = input<string>(this.config.theme.defaultVariant);
  activeTab = input<number | undefined>(undefined);

  tabChange = output<number>();
  activeTabChange = output<number>();

  items = contentChildren(AvTab, { descendants: true });
  currentItem = signal<number>(0);

  readonly themeVars = computed<Record<string, string>>(() => {
    const variant = this.variant();
    const isDark = this.themeService.dark();

    return {
      '--av-tabs-accent': `var(--av-${variant}-${isDark ? 400 : 500})`,
      '--av-tabs-accent-soft': isDark
        ? `color-mix(in srgb, var(--av-${variant}-400) 16%, transparent)`
        : `var(--av-${variant}-50)`,
    };
  });

  constructor() {
    effect(() => {
      const selected = this.activeTab();

      if (selected !== undefined) {
        this.currentItem.set(this.clampIndex(selected));
      }
    });

    effect(() => {
      const tabList = this.items();
      const currentIndex = this.clampIndex(this.currentItem());

      if (currentIndex !== this.currentItem()) {
        this.currentItem.set(currentIndex);
      }

      tabList.forEach((item, index) => {
        item.index.set(index);
        item.isActive.set(index === currentIndex);
      });
    });
  }

  selectTab(index: number, item?: AvTab): void {
    if (item?.disabled()) return;

    const nextIndex = this.clampIndex(index);
    this.currentItem.set(nextIndex);
    this.tabChange.emit(nextIndex);
    this.activeTabChange.emit(nextIndex);
  }

  labelFor(item: AvTab): string {
    return item.title() || item.label();
  }

  private clampIndex(index: number): number {
    const total = this.items().length;
    if (total <= 0) return 0;

    return Math.min(Math.max(index, 0), total - 1);
  }
}
