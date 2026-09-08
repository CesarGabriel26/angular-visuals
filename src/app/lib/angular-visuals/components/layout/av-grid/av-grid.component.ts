import { CommonModule } from '@angular/common';
import { Component, contentChild, HostBinding, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'div[av-grid]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'av-grid.component.html',
  styles: [`
    :host {
      display: grid;
      grid-template-columns: repeat(var(--av-cols-xs, 1), minmax(0, 1fr));
      gap: var(--av-gap-xs, 1rem);
    }

    @media (min-width: 640px) {
      :host {
        grid-template-columns: repeat(var(--av-cols-sm, var(--av-cols-xs, 1)), minmax(0, 1fr));
        gap: var(--av-gap-sm, var(--av-gap-xs, 1rem));
      }
    }

    @media (min-width: 768px) {
      :host {
        grid-template-columns: repeat(var(--av-cols-md, var(--av-cols-sm, var(--av-cols-xs, 1))), minmax(0, 1fr));
        gap: var(--av-gap-md, var(--av-gap-sm, var(--av-gap-xs, 1rem)));
      }
    }

    @media (min-width: 1024px) {
      :host {
        grid-template-columns: repeat(var(--av-cols-lg, var(--av-cols-md, var(--av-cols-sm, var(--av-cols-xs, 1)))), minmax(0, 1fr));
      }
    }
  `]
})
export class AvGridComponent {
  empty = input<boolean>(false)
  cols = input<{ xs?: number; sm?: number; md?: number; lg?: number; xl?: number } | number>(1);

  empytemplate = contentChild<TemplateRef<any>>('empty');

  @HostBinding('style.--av-cols-xs') get colsXs() { return this.getVal('xs'); }
  @HostBinding('style.--av-cols-sm') get colsSm() { return this.getVal('sm'); }
  @HostBinding('style.--av-cols-md') get colsMd() { return this.getVal('md'); }
  @HostBinding('style.--av-cols-lg') get colsLg() { return this.getVal('lg'); }

  private getVal(breakpoint: string) {
    const c = this.cols();
    if (typeof c === 'number') return breakpoint === 'xs' ? c : null;
    return (c as any)?.[breakpoint] ?? null;
  }
}
