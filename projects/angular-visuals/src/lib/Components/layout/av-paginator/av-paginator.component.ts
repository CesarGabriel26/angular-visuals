import { Component, computed, inject, input, output } from '@angular/core';
import { VISUALS_CONFIG } from '../../../core/tokens';
import { AvButton } from '../../base/av-button/av-button.component';
import { AvIcon } from '../../base/av-icon/av-icon.component';

@Component({
  selector: 'av-paginator',
  standalone: true,
  imports: [AvButton, AvIcon],
  styleUrls: ['./av-paginator.component.css'],
  templateUrl: './av-paginator.component.html',
})
export class AvPaginator {
  private readonly config = inject(VISUALS_CONFIG);

  variant = input<string>(this.config.theme.defaultVariant);
  pageIndex = input.required<number>();
  totalPages = input.required<number>();
  pageChanged = output<number>();

  readonly safeTotalPages = computed(() => Math.max(0, this.totalPages()));
  readonly currentPage = computed(() => {
    if (this.safeTotalPages() <= 0) return 0;
    return Math.min(Math.max(this.pageIndex(), 0), this.safeTotalPages() - 1);
  });
  readonly canGoBack = computed(() => this.currentPage() > 0);
  readonly canGoForward = computed(() => this.currentPage() + 1 < this.safeTotalPages());

  changePage(page: number): void {
    if (this.safeTotalPages() <= 0) return;

    const nextPage = Math.min(Math.max(page, 0), this.safeTotalPages() - 1);

    if (nextPage === this.currentPage()) return;

    this.pageChanged.emit(nextPage);
  }
}
