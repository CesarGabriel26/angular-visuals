import { Component, computed, input } from '@angular/core';

export interface AvGridColumns {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  '2xl'?: number;
}

@Component({
  selector: 'div[av-grid]',
  standalone: true,
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
  host: {
    '[class.av-grid--empty]': 'empty()',
    '[style.--av-grid-cols-xs]': 'gridVars()["--av-grid-cols-xs"]',
    '[style.--av-grid-cols-sm]': 'gridVars()["--av-grid-cols-sm"]',
    '[style.--av-grid-cols-md]': 'gridVars()["--av-grid-cols-md"]',
    '[style.--av-grid-cols-lg]': 'gridVars()["--av-grid-cols-lg"]',
    '[style.--av-grid-cols-xl]': 'gridVars()["--av-grid-cols-xl"]',
    '[style.--av-grid-cols-2xl]': 'gridVars()["--av-grid-cols-2xl"]',
    '[style.--av-grid-gap]': 'gap() + "rem"',
  },
})
export class AvGrid {
  cols = input<AvGridColumns>({
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    '2xl': 6,
  });
  empty = input<boolean>(false);
  gap = input<number>(.5);

  readonly gridVars = computed(() => {
    const cols = this.cols();
    const xs = this.normalize(cols.xs, 1);
    const sm = this.normalize(cols.sm, xs);
    const md = this.normalize(cols.md, sm);
    const lg = this.normalize(cols.lg, md);
    const xl = this.normalize(cols.xl, lg);
    const xxl = this.normalize(cols['2xl'], xl);

    return {
      '--av-grid-cols-xs': String(xs),
      '--av-grid-cols-sm': String(sm),
      '--av-grid-cols-md': String(md),
      '--av-grid-cols-lg': String(lg),
      '--av-grid-cols-xl': String(xl),
      '--av-grid-cols-2xl': String(xxl),
    };
  });

  private normalize(value: number | undefined, fallback: number): number {
    if (!value || value < 1) return fallback;
    return Math.floor(value);
  }
}
