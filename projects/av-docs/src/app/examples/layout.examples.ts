import { Component } from '@angular/core';
import { AvGrid, AvPaginator, AvTable } from 'angular-visuals';

const layoutStyles = `
  .tile {
    border: 1px solid var(--av-color-border-soft);
    border-radius: var(--av-radius-sm);
    background: var(--av-color-surface);
    color: var(--av-color-text);
    padding: 1rem;
    text-align: center;
  }

  .layout-demo {
    width: min(100%, 36rem);
  }
`;

@Component({
  standalone: true,
  imports: [AvGrid],
  styles: [layoutStyles],
  template: `
    <div av-grid class="layout-demo" [cols]="cols" [gap]="1">
      <div class="tile">01</div>
      <div class="tile">02</div>
      <div class="tile">03</div>
      <div class="tile">04</div>
      <div class="tile">05</div>
      <div class="tile">06</div>
    </div>
  `,
})
export class GridBasicExample {
  cols = { xs: 1, sm: 2, md: 3 };
}

@Component({
  standalone: true,
  imports: [AvTable],
  styles: [layoutStyles],
  template: `
    <av-table class="layout-demo" [value]="people">
      <ng-template #header>
        <tr>
          <th>Nome</th>
          <th>Papel</th>
          <th>Status</th>
        </tr>
      </ng-template>

      <ng-template #body let-person>
        <tr>
          <td>{{ person.name }}</td>
          <td>{{ person.role }}</td>
          <td>{{ person.status }}</td>
        </tr>
      </ng-template>
    </av-table>
  `,
})
export class TableBasicExample {
  people = [
    { name: 'Ana', role: 'Design', status: 'Ativo' },
    { name: 'Bruno', role: 'Frontend', status: 'Ativo' },
    { name: 'Clara', role: 'Produto', status: 'Pausado' },
  ];
}

@Component({
  standalone: true,
  imports: [AvPaginator],
  template: `
    <av-paginator
      [pageIndex]="2"
      [totalPages]="8"
    />
  `,
})
export class PaginatorBasicExample {}
