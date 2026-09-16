# Angular Visuals

Biblioteca Angular de componentes visuais standalone, com paleta inspirada no Tailwind, tema claro/escuro por tokens CSS e registro interno de ícones SVG.

## Como usar

Importe os estilos globais uma vez na aplicação consumidora:

```css
@import "angular-visuals/styles/angular-visuals.css";
```

Registre a configuração no `ApplicationConfig`:

```ts
import { provideAngularVisuals } from 'angular-visuals';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAngularVisuals({
      theme: {
        mode: 'system',
        defaultVariant: 'orange',
      },
    }),
  ],
};
```

## Estrutura Atual

### Components

Componentes já presentes na lib:

| Categoria | Componentes |
| --- | --- |
| Base | `AvBadge`, `AvButton`, `AvIcon` |
| Forms | `AvForm`, `AvInput`, `AvSelect`, `AvMultiSelect`, `AvCheckbox`, `AvCurrencyInput`, `AvDateTimePicker`, `AvSwitch`, `AvSlider`, `AvFileUpload`, `AvTextarea`|
| Layout e dados | `AvGrid`, `AvTable`, `AvPaginator` |
| Navegação | `AvTabs`, `AvTab`, `AvStepper`, `AvStep` |
| Feedback | `AvProgressBar`, `AvProgressBarCircle` |
| Mídia | `AvCarousel`, `AvCarouselItem` |

### Primitives

Primitives já presentes:

- `AvText`: texto animado com transições `fade` e `slide`, útil para estados curtos como nomes de arquivos, contadores e carregamento.

Sugestões futuras:

- `AvBox`, `AvStack`, `AvInline`, `AvCluster`, `AvCenter`
- `AvHeading`, `AvVisuallyHidden`
- `AvDivider`, `AvSpacer`, `AvPortal`
- `AvOverlay`, `AvFocusTrap`, `AvClickOutside`

### Services

Serviços já presentes:

- `ThemeService`: controla `light`, `dark` e `system`, aplicando `data-av-theme` no `document.documentElement`.
- `AvIconRegistry`: registra SVGs padrão da lib e permite adicionar novos ícones em runtime.

O projeto já registra SVGs padrão automaticamente, incluindo ícones comuns e loaders animados.

```ts
import { AvIconRegistry } from 'angular-visuals';

const icons = iconRegistry.getIcons();
const iconNames = iconRegistry.getIconNames();

iconRegistry.registerIcon('custom-icon', '<svg>...</svg>');
```

`getIcons()` retorna uma lista de `{ name, svg }`, útil para construir um icon picker.

## Componentes Que Fazem Sentido Adicionar Depois

Formulários:
- `AvRadioGroup`
- `AvDateRangePicker`
- `AvCombobox`

Overlays:

- `AvDialog`
- `AvDrawer`
- `AvPopover`
- `AvTooltip`
- `AvDropdownMenu`
- `AvCommandPalette`

Feedback:

- `AvAlert`
- `AvToast`
- `AvSkeleton`
- `AvSpinner`
- `AvEmptyState`

Dados e navegação:

- `AvAccordion`
- `AvBreadcrumb`
- `AvTimeline`
- `AvTreeView`
- `AvDataTable` com sorting/filtering embutido

Serviços futuros:

- `ToastService`
- `OverlayService`
- `BreakpointService`
- `IconPickerService`
- helpers de forms para erros e máscaras

## Build

```bash
ng build angular-visuals
```

Os artefatos são gerados em `dist/angular-visuals`.

## Publicação

```bash
cd dist/angular-visuals
npm publish
```
