import type { ComponentDoc } from '../types/component';
import {
  GridBasicExample,
  PaginatorBasicExample,
  TableBasicExample,
} from '../examples/layout.examples';

export const GRID_DOC: ComponentDoc = {
  name: 'Grid',
  tag: 'div[av-grid]',
  category: 'layout',
  description: 'Grid responsivo com colunas por breakpoint e gap em rem.',
  examples: [
    {
      id: 'basic',
      title: 'Responsivo',
      component: GridBasicExample,
      code: `
<div av-grid [cols]="{ xs: 1, sm: 2, md: 3 }" [gap]="1">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
      `.trim(),
      size: 'full',
    },
  ],
  api: {
    inputs: [
      { name: 'cols', type: 'AvGridColumns', description: 'Mapa de colunas por breakpoint.' },
      { name: 'gap', type: 'number', default: '0.5' },
      { name: 'empty', type: 'boolean', default: 'false' },
    ],
  },
};

export const TABLE_DOC: ComponentDoc = {
  name: 'Table',
  tag: 'av-table',
  category: 'data',
  description: 'Tabela com templates projetados para cabecalho e linhas.',
  examples: [
    {
      id: 'basic',
      title: 'Com templates',
      component: TableBasicExample,
      code: `
<av-table [value]="people">
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
      `.trim(),
      size: 'full',
    },
  ],
  api: {
    inputs: [
      { name: 'value', type: 'T[]', default: '[]' },
      { name: 'emptyMessage', type: 'string', default: "'Nenhum registro encontrado.'" },
      { name: 'paginator', type: 'boolean', default: 'false' },
      { name: 'pageSize', type: 'number', default: '25' },
      { name: 'pageIndex', type: 'number', default: '0' },
      { name: 'totalRecords', type: 'number', default: '0' },
    ],
    outputs: [
      { name: 'onSort', type: 'SortEvent' },
      { name: 'onPage', type: 'PageChangeEvent' },
    ],
  },
};

export const PAGINATOR_DOC: ComponentDoc = {
  name: 'Paginator',
  tag: 'av-paginator',
  category: 'data',
  description: 'Controle de paginacao reutilizavel para tabelas e listas.',
  examples: [
    {
      id: 'basic',
      title: 'Paginacao',
      component: PaginatorBasicExample,
      code: `
<av-paginator
  [pageIndex]="2"
  [totalPages]="8"
/>
      `.trim(),
      size: 'lg',
    },
  ],
  api: {
    inputs: [
      { name: 'pageIndex', type: 'number', description: 'Indice zero-based da pagina atual.' },
      { name: 'totalPages', type: 'number', description: 'Total de paginas.' },
      { name: 'variant', type: 'string', default: 'defaultVariant' },
    ],
    outputs: [
      { name: 'pageChanged', type: 'number' },
    ],
  },
};
