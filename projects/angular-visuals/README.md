# Angular Visuals

Angular Visuals é uma biblioteca de componentes standalone para Angular, criada para aplicações que precisam de uma base visual consistente sem abrir mão da composição nativa do framework.

A biblioteca oferece estilos modernos baseados em uma paleta de cores inspirada no Tailwind, tokens CSS para temas claro e escuro, componentes reutilizáveis para formulários, layout, navegação, feedback e mídia, além de um registro interno de ícones SVG.

> O pacote ainda está em desenvolvimento e será publicado futuramente no npm. Os comandos abaixo mostram o fluxo de instalação planejado.

## Instalação

Depois da publicação, instale a biblioteca e suas dependências peer:

```bash
npm install angular-visuals
```

A biblioteca usa Angular e Angular CDK como `peerDependencies`. Em uma aplicação Angular compatível, importe os estilos globais uma única vez, por exemplo em `src/styles.css`:

```css
@import "angular-visuals/styles/angular-visuals.css";
```

## Configuração

Registre `provideAngularVisuals` no `ApplicationConfig`. `mode` aceita `light`, `dark` ou `system`, e `defaultVariant` define a variante de cor padrão dos componentes:

```ts
import { ApplicationConfig } from '@angular/core';
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

Os componentes são standalone e podem ser importados diretamente no componente consumidor:

```ts
import { Component } from '@angular/core';
import { AvBadge, AvButton, AvIcon, AvInput } from 'angular-visuals';

@Component({
  standalone: true,
  imports: [AvBadge, AvButton, AvIcon, AvInput],
  template: `
    <button av-button variant="orange" icon="check">Salvar</button>
    <span av-badge variant="green">Ativo</span>
    <av-input label="Nome" placeholder="Digite seu nome" />
  `,
})
export class ExampleComponent {}
```

## Componentes disponíveis

| Categoria | Componentes |
| --- | --- |
| Base | `AvBadge`, `AvButton`, `AvIcon` |
| Formulários | `AvForm`, `AvInput`, `AvSelect`, `AvMultiSelect`, `AvCheckbox`, `AvCurrencyInput`, `AvDateTimePicker`, `AvSwitch`, `AvSlider`, `AvFileUpload`, `AvTextArea` |
| Layout e dados | `AvGrid`, `AvTable`, `AvPaginator` |
| Navegação | `AvSidenav`, `AvNavLink`, `AvDropdown`, `AvTabs`, `AvTab`, `AvStepper`, `AvStep` |
| Feedback | `AvProgressBar`, `AvProgressBarCircle` |
| Mídia | `AvCarousel`, `AvCarouselItem` |
| Overlay | `AvTooltip` |
| Primitives | `AvText` |

### Primitives

`AvText` exibe texto com transições `fade` e `slide`. É útil para nomes de arquivos, contadores, mensagens curtas e estados de carregamento:
`AvStack` — layout vertical.
`AvInline` — layout horizontal.
`AvCluster` — layout inline com wrap para ações e tags.
`AvDivider` — separador para menus, diálogos e layouts.


```html
<av-text [text]="status" animation="fade" />
```

### Navegação lateral

`AvSidenav` cria uma navegação lateral responsiva. Abaixo do breakpoint configurado, ele entra em modo drawer; para habilitar abrir e fechar, use `toggleable` e passe um botão com `#toggleTrigger`.

```html
<button #toggleTrigger type="button" av-button icon="menu">Menu</button>

<av-sidenav toggleable [toggleTrigger]="toggleTrigger" variant="orange">
  <av-nav-link label="Início" icon="search" href="/" active />
  <av-nav-link label="Agenda" icon="calendar_today" href="/agenda" badge="3" />

  <av-dropdown label="Financeiro" icon="payments">
    <av-nav-link label="Receitas" href="/financeiro/receitas" />
    <av-nav-link label="Despesas" href="/financeiro/despesas" />
  </av-dropdown>
</av-sidenav>
```

## Serviços

### `ThemeService`

Controla o tema em runtime. O modo `system` acompanha a preferência de tema do sistema e a biblioteca aplica `data-av-theme="light"` ou `data-av-theme="dark"` no elemento raiz do documento.

```ts
import { Component, inject } from '@angular/core';
import { ThemeService } from 'angular-visuals';

@Component({
  template: `
    <button type="button" (click)="useLight()">Claro</button>
    <button type="button" (click)="useDark()">Escuro</button>
    <button type="button" (click)="useSystem()">Sistema</button>
  `,
})
export class ThemeControls {
  private readonly theme = inject(ThemeService);

  useLight() { this.theme.setMode('light'); }
  useDark() { this.theme.setMode('dark'); }
  useSystem() { this.theme.setMode('system'); }
}
```

### `AvIconRegistry`

O registro já inclui os ícones padrão e loaders animados da biblioteca. Também é possível registrar SVGs próprios em runtime, consultar um ícone ou obter um catálogo completo:

> **Atenção:** ícones registrados são renderizados automaticamente com `1em × 1em`, relativo ao `font-size` herdado.

```ts
import { inject } from '@angular/core';
import { AvIconRegistry } from 'angular-visuals';

const iconRegistry = inject(AvIconRegistry);

iconRegistry.registerIcon('custom-icon', '<svg viewBox="0 0 24 24">...</svg>');

const icon = iconRegistry.getIcon('custom-icon');
const iconNames = iconRegistry.getIconNames();
const icons = iconRegistry.getIcons(); // { name, svg }[]
```

Depois de registrado, o ícone pode ser usado pelos componentes que aceitam nome de ícone, como `AvIcon` e `AvButton`:

```html
<span av-icon name="custom-icon"></span>
<button av-button icon="custom-icon">Ação</button>
```

## Roadmap
### Fase 1: Feedback e primitives

1. `AvSpinner` — loading indeterminado simples.
2. `AvSkeleton` — estado de carregamento reutilizável.
3. `AvAlert` — feedback com `variant`, `appearance` e `AvIcon`.
4. `AvEmptyState` — estado vazio para tabelas, selects, árvores e outras telas.
9. `AvVisuallyHidden` — conteúdo visualmente oculto para acessibilidade.



10. `AvToast` — feedback temporário em overlay.
11. `ToastService` — API programática para exibir toasts.
12. `AvDialog` — base para overlays complexos.
13. `AvPopover` — conteúdo contextual usando a infraestrutura de overlay.
14. `AvDrawer` — variação estrutural de diálogo.

### Fase 3: Componentes básicos

15. `AvAccordion` — conteúdo expansível.
16. `AvBreadcrumb` — navegação hierárquica.
17. `AvRadioGroup` e `AvRadio` — controles de seleção única para completar os forms.

### Fase 4: Componentes compostos

18. `AvCombobox` — input, overlay, seleção e busca.
19. `AvDateRangePicker` — evolução do `AvDateTimePicker`.
20. `AvDataTable` — tabela com ordenação, filtros, seleção, loading, estado vazio e paginação.

### Fase 5: Componentes avançados

21. `AvTimeline` — visualização de eventos em sequência.
22. `AvTreeView` — árvore com seleção, expansão e teclado.
23. `AvCommandPalette` — busca e navegação por teclado composta por diálogo, input, ícones e estado vazio.
24. `AvIconPicker` — catálogo de ícones usando registry, combobox, grid e popover.

### Fase 6: Conveniências

25. `AvHeading` — tipografia semântica conveniente.
26. `AvBox` — primitive de composição para casos simples.
27. `AvCenter` — centralização de conteúdo.
28. `AvSpacer` — espaçamento explícito em layouts.

Componentes adicionais que podem entrar antes da versão `1.0`, conforme as necessidades dos consumidores: `AvAvatar`, `AvChip` ou `AvTag`, `AvButtonGroup`, `AvInputGroup` e `AvKbd`.
