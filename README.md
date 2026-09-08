# angular-visuals

Roadmap de componentes que podem entrar na lib.

Regra de implementacao: cada componente deve trazer tudo o que precisa para funcionar, incluindo estilos locais, estados visuais e variacoes. Evitar `shared visuals`, imports globais de CSS da lib e objetos TypeScript exportando classes Tailwind.

## Ja existentes na lib

- `av-button`
- `av-button-group`
- `av-toggle`
- `av-badge`
- `av-carousel`
- `av-carousel-item`
- `av-form`
- `av-input`
- `av-select`
- `av-multi-select`
- `av-currency-input`
- `av-date-time-picker`
- `av-checkbox`
- `av-icon`
- `av-sort-icon`
- `av-paginator`
- `av-table`
- `av-progress-bar`
- `av-progress-bar-circle`
- `av-stepper`
- `av-step`

## Componentes simples para adicionar

Componentes simples tendem a ficar em um unico componente standalone, sem precisar quebrar em subcomponentes.

- `av-divider`: separador horizontal ou vertical.
- `av-avatar`: imagem, iniciais, fallback e status.
- `av-tooltip`: dica curta acionada por hover/focus.
- `av-chip`: marcador compacto com opcao removivel.
- `av-alert`: mensagem contextual com variantes de sucesso, aviso, erro e informacao.
- `av-empty-state`: estado vazio com titulo, descricao, icone/arte e acao.
- `av-copy-button`: botao para copiar texto com feedback de copiado.
- `av-kbd`: tecla/atalho visual.
- `av-rating`: nota por estrelas ou icones.
- `av-skeleton`: placeholder de carregamento para texto, avatar, bloco e card.
- `av-spinner`: indicador de carregamento circular.
- `av-meter`: medidor pequeno para score, uso ou limite.
- `av-status-dot`: ponto de status com label opcional.

## Componentes compostos para quebrar em subcomponentes

Use subcomponentes quando o componente tiver regioes semanticas, itens repetidos, slots projetados, controle de foco/teclado ou partes que precisam ser usadas separadamente.

### Navigation

- `av-tabs`
  - `av-tab-list`
  - `av-tab`
  - `av-tab-panel`
- `av-breadcrumbs`
  - `av-breadcrumb-item`
  - `av-breadcrumb-separator`
- `av-menu`
  - `av-menu-trigger`
  - `av-menu-content`
  - `av-menu-item`
  - `av-menu-group`
  - `av-menu-separator`
- `av-side-nav`
  - `av-side-nav-group`
  - `av-side-nav-item`
  - `av-side-nav-section`
- `av-command-palette`
  - `av-command-trigger`
  - `av-command-dialog`
  - `av-command-group`
  - `av-command-item`
  - `av-command-empty`

### Display

- `av-card`
  - `av-card-header`
  - `av-card-body`
  - `av-card-footer`
  - `av-card-actions`
  - `av-card-media`
- `av-kpi`
  - `av-kpi-label`
  - `av-kpi-value`
  - `av-kpi-trend`
  - `av-kpi-meta`
- `av-list`
  - `av-list-item`
  - `av-list-item-icon`
  - `av-list-item-content`
  - `av-list-item-action`
- `av-accordion`
  - `av-accordion-item`
  - `av-accordion-header`
  - `av-accordion-panel`
- `av-timeline`
  - `av-timeline-item`
  - `av-timeline-marker`
  - `av-timeline-content`
- `av-description-list`
  - `av-description-item`
  - `av-description-term`
  - `av-description-detail`

### Forms

- `av-field`
  - `av-label`
  - `av-hint`
  - `av-error`
  - `av-prefix`
  - `av-suffix`
- `av-radio-group`
  - `av-radio`
  - `av-radio-card`
- `av-slider`
  - `av-slider-track`
  - `av-slider-thumb`
  - `av-slider-mark`
- `av-file-upload`
  - `av-file-dropzone`
  - `av-file-item`
  - `av-file-list`
- `av-combobox`
  - `av-combobox-trigger`
  - `av-combobox-panel`
  - `av-combobox-option`
  - `av-combobox-empty`
- `av-segmented-control`
  - `av-segmented-item`

### Overlay

- `av-dialog`
  - `av-dialog-trigger`
  - `av-dialog-content`
  - `av-dialog-header`
  - `av-dialog-body`
  - `av-dialog-footer`
  - `av-dialog-close`
- `av-drawer`
  - `av-drawer-trigger`
  - `av-drawer-content`
  - `av-drawer-header`
  - `av-drawer-body`
  - `av-drawer-footer`
- `av-popover`
  - `av-popover-trigger`
  - `av-popover-content`
  - `av-popover-arrow`
- `av-toast`
  - `av-toast-viewport`
  - `av-toast-item`
  - `av-toast-title`
  - `av-toast-description`
  - `av-toast-action`

### Data

- `av-data-grid`
  - `av-data-grid-toolbar`
  - `av-data-grid-column`
  - `av-data-grid-cell`
  - `av-data-grid-row-actions`
  - `av-data-grid-empty`
- `av-tree`
  - `av-tree-node`
  - `av-tree-toggle`
  - `av-tree-content`
- `av-kanban`
  - `av-kanban-board`
  - `av-kanban-column`
  - `av-kanban-card`
  - `av-kanban-card-actions`
- `av-calendar`
  - `av-calendar-header`
  - `av-calendar-grid`
  - `av-calendar-day`
  - `av-calendar-event`
- `av-filter-bar`
  - `av-filter-chip`
  - `av-filter-menu`
  - `av-filter-action`

### Feedback e workflow

- `av-wizard`
  - `av-wizard-step`
  - `av-wizard-header`
  - `av-wizard-body`
  - `av-wizard-footer`
- `av-banner`
  - `av-banner-icon`
  - `av-banner-content`
  - `av-banner-action`
- `av-result`
  - `av-result-icon`
  - `av-result-title`
  - `av-result-description`
  - `av-result-actions`

## Prioridade sugerida

1. `av-card`, `av-tabs`, `av-tooltip`, `av-alert`, `av-skeleton`
2. `av-dialog`, `av-popover`, `av-toast`, `av-field`, `av-radio-group`
3. `av-menu`, `av-accordion`, `av-avatar`, `av-chip`, `av-empty-state`
4. `av-data-grid`, `av-tree`, `av-calendar`, `av-command-palette`
5. `av-kanban`, `av-wizard`, `av-file-upload`, `av-slider`

## Checklist para novos componentes

- Criar componente standalone com template, CSS local e export no `index.ts` da categoria.
- Evitar objetos TypeScript com classes Tailwind.
- Preferir classes semanticas do proprio componente, como `av-card--outlined` ou `av-dialog__header`.
- Concentrar variantes visuais no CSS do componente.
- Se houver subcomponentes, cada um tambem deve ter seus estilos necessarios.
- Atualizar a demo em `src/app/app.html` quando o componente ficar pronto.
