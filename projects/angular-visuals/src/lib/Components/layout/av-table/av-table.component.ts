import { CommonModule } from '@angular/common';
import { Component, TemplateRef, computed, contentChild, inject, input, output } from '@angular/core';
import { VISUALS_CONFIG } from '@av/core/tokens';
import { AvPaginator } from '../av-paginator/av-paginator.component';
import { AvSelect } from '@av/lib/components/form/av-select/av-select.component';

export interface SortEvent {
  field: string;
  order: 'asc' | 'desc';
}

export interface PageChangeEvent {
  page: number;
  pageSize: number;
}

@Component({
  selector: 'av-table',
  standalone: true,
  imports: [CommonModule, AvSelect, AvPaginator],
  templateUrl: './av-table.component.html',
  styleUrls: ['./av-table.component.css'],
})
export class AvTable<T = any> {
  private readonly config = inject(VISUALS_CONFIG);

  variant = input<string>(this.config.theme.defaultVariant);
  value = input<T[]>([]);
  emptyMessage = input<string>('Nenhum registro encontrado.');

  paginator = input<boolean>(false);
  pageSize = input<number>(25);
  pageIndex = input<number>(0);
  totalRecords = input<number>(0);
  rowsPerPageOptions = input<number[]>([]);
  currentPageLabel = input<string>('Página {currentPage} de {totalPages} · {totalRecords} itens');

  sortField = input<string>('');
  sortOrder = input<'asc' | 'desc'>('asc');

  onSort = output<SortEvent>();
  onPage = output<PageChangeEvent>();

  headerTemplate = contentChild<TemplateRef<any>>('header');
  bodyTemplate = contentChild<TemplateRef<any>>('body');

  totalPages = computed(() => {
    const size = this.pageSize();
    const total = this.totalRecords();
    if (!size || size <= 0 || total <= 0) return 0;
    return Math.ceil(total / size);
  });

  pageSizeOptions = computed(() => {
    return this.rowsPerPageOptions().map((option) => ({
      label: String(option),
      value: option,
    }));
  });

  formattedPageLabel = computed(() => {
    const totalPages = this.totalPages();
    const currentPage = totalPages === 0
      ? 0
      : Math.min(Math.max(this.pageIndex(), 0), totalPages - 1) + 1;

    return this.currentPageLabel()
      .replace('{currentPage}', String(currentPage))
      .replace('{totalPages}', String(totalPages))
      .replace('{totalRecords}', String(this.totalRecords()));
  });

  sort(field: string): void {
    const newOrder: 'asc' | 'desc' = this.sortField() === field && this.sortOrder() === 'asc'
      ? 'desc'
      : 'asc';

    this.onSort.emit({ field, order: newOrder });
  }

  changePage(newPage: number): void {
    if (newPage < 0 || newPage >= this.totalPages()) return;

    this.onPage.emit({ page: newPage, pageSize: this.pageSize() });
  }

  changePageSize(value: number): void {
    const newSize = Number(value);
    if (!Number.isFinite(newSize) || newSize <= 0) return;

    this.onPage.emit({ page: 0, pageSize: newSize });
  }
}
