import type { ComponentDoc } from '../types/component';
import {
  DropdownBasicExample,
  NavLinkBasicExample,
  SidenavBasicExample,
  StepBasicExample,
  StepperBasicExample,
  TabBasicExample,
  TabsBasicExample,
} from '../examples/navigation.examples';

export const TABS_DOC: ComponentDoc = {
  name: 'Tabs',
  tag: 'av-tabs, av-tab-container',
  category: 'navigation',
  description: 'Container de abas com cabecalho gerado a partir de AvTab.',
  examples: [
    {
      id: 'basic',
      title: 'Com icones',
      component: TabsBasicExample,
      code: `
<av-tabs>
  <av-tab title="Preview" icon="search">...</av-tab>
  <av-tab title="Code" icon="code">...</av-tab>
</av-tabs>
      `.trim(),
      size: 'full',
    },
  ],
  api: {
    inputs: [
      { name: 'activeTab', type: 'number | undefined' },
      { name: 'variant', type: 'string', default: 'defaultVariant' },
    ],
    outputs: [
      { name: 'tabChange', type: 'number' },
      { name: 'activeTabChange', type: 'number' },
    ],
  },
};

export const TAB_DOC: ComponentDoc = {
  name: 'Tab',
  tag: 'av-tab',
  category: 'navigation',
  description: 'Item projetado dentro de AvTabs.',
  examples: [
    {
      id: 'inside-tabs',
      title: 'Dentro de Tabs',
      component: TabBasicExample,
      code: `
<av-tabs>
  <av-tab title="Ativo">...</av-tab>
  <av-tab title="Disabled" [disabled]="true">...</av-tab>
</av-tabs>
      `.trim(),
      size: 'full',
    },
  ],
  api: {
    inputs: [
      { name: 'title', type: 'string', default: "''" },
      { name: 'label', type: 'string', default: "''" },
      { name: 'icon', type: 'string', default: "''" },
      { name: 'disabled', type: 'boolean', default: 'false' },
    ],
  },
};

export const STEPPER_DOC: ComponentDoc = {
  name: 'Stepper',
  tag: 'av-stepper',
  category: 'navigation',
  description: 'Fluxo de passos com cabecalho, estado atual e conteudo projetado.',
  examples: [
    {
      id: 'basic',
      title: 'Fluxo',
      component: StepperBasicExample,
      code: `
<av-stepper [currentStep]="1" [canSetStep]="true">
  <av-step title="Conta" icon="check">...</av-step>
  <av-step title="Perfil">...</av-step>
  <av-step title="Publicar">...</av-step>
</av-stepper>
      `.trim(),
      size: 'full',
    },
  ],
  api: {
    inputs: [
      { name: 'currentStep', type: 'number | undefined' },
      { name: 'canSetStep', type: 'boolean', default: 'false' },
      { name: 'noContent', type: 'boolean', default: 'false' },
      { name: 'variant', type: 'string', default: 'defaultVariant' },
    ],
    outputs: [
      { name: 'stepChange', type: 'number' },
    ],
  },
};

export const STEP_DOC: ComponentDoc = {
  name: 'Step',
  tag: 'av-step',
  category: 'navigation',
  description: 'Item projetado dentro de AvStepper.',
  examples: [
    {
      id: 'inside-stepper',
      title: 'Dentro de Stepper',
      component: StepBasicExample,
      code: `
<av-stepper [currentStep]="2">
  <av-step title="Upload" icon="check"></av-step>
  <av-step title="Validacao" icon="check"></av-step>
  <av-step title="Erro" [hasError]="true"></av-step>
</av-stepper>
      `.trim(),
      size: 'full',
    },
  ],
  api: {
    inputs: [
      { name: 'title', type: 'string', description: 'Titulo exibido no cabecalho.' },
      { name: 'icon', type: 'string', default: "''" },
      { name: 'hasError', type: 'boolean', default: 'false' },
    ],
  },
};

export const NAV_LINK_DOC: ComponentDoc = {
  name: 'NavLink',
  tag: 'av-nav-link',
  category: 'navigation',
  description: 'Link ou botao de navegacao com icone, descricao e badge.',
  examples: [
    {
      id: 'basic',
      title: 'Ativo',
      component: NavLinkBasicExample,
      code: `
<av-nav-link
  icon="search"
  label="Componentes"
  description="Lista de componentes"
  badge="New"
  [active]="true"
/>
      `.trim(),
      size: 'lg',
    },
  ],
  api: {
    inputs: [
      { name: 'label', type: 'string', default: "''" },
      { name: 'description', type: 'string', default: "''" },
      { name: 'icon', type: 'string', default: "''" },
      { name: 'badge', type: 'string | number | null', default: 'null' },
      { name: 'route', type: 'string | any[] | null', default: 'null' },
      { name: 'href', type: 'string', default: "''" },
      { name: 'active', type: 'boolean', default: 'false' },
    ],
  },
};

export const DROPDOWN_DOC: ComponentDoc = {
  name: 'Dropdown',
  tag: 'av-dropdown',
  category: 'navigation',
  description: 'Grupo expansivel para menus laterais ou listas de navegacao.',
  examples: [
    {
      id: 'basic',
      title: 'Expandido',
      component: DropdownBasicExample,
      code: `
<av-dropdown label="Componentes" icon="menu" [expanded]="true">
  <av-nav-link label="Button" />
  <av-nav-link label="Select" badge="New" />
</av-dropdown>
      `.trim(),
      size: 'lg',
    },
  ],
  api: {
    inputs: [
      { name: 'label', type: 'string', default: "''" },
      { name: 'icon', type: 'string', default: "''" },
      { name: 'badge', type: 'string | number | null', default: 'null' },
      { name: 'expanded', type: 'boolean | undefined' },
      { name: 'disabled', type: 'boolean', default: 'false' },
    ],
    outputs: [
      { name: 'expandedChange', type: 'boolean' },
    ],
  },
};

export const SIDENAV_DOC: ComponentDoc = {
  name: 'Sidenav',
  tag: 'av-sidenav',
  category: 'navigation',
  description: 'Navegacao lateral com slots de header, content e footer.',
  examples: [
    {
      id: 'basic',
      title: 'Layout lateral',
      component: SidenavBasicExample,
      code: `
<av-sidenav [width]="'14rem'">
  <div header>Docs</div>
  <div content>
    <av-nav-link label="Overview" [active]="true" />
  </div>
  <div footer>v0.1.0</div>
</av-sidenav>
      `.trim(),
      size: 'lg',
    },
  ],
  api: {
    inputs: [
      { name: 'width', type: 'number | string', default: "'16rem'" },
      { name: 'toggleable', type: 'boolean', default: 'false' },
      { name: 'opened', type: 'boolean | undefined' },
      { name: 'drawerBreakpoint', type: 'number | string', default: '768' },
      { name: 'closeOnBackdrop', type: 'boolean', default: 'true' },
      { name: 'closeOnNavigation', type: 'boolean', default: 'true' },
    ],
    outputs: [
      { name: 'openedChange', type: 'boolean' },
      { name: 'modeChange', type: "'side' | 'drawer'" },
    ],
  },
};
