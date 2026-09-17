import type { ComponentDoc } from '../types/component';
import {
  SwitchBoundExample,
  SwitchCheckedExample,
  SwitchDefaultExample,
  SwitchDisabledExample,
} from '../examples/switch.examples';

export const SWITCH_DOC: ComponentDoc = {
  name: 'Switch',
  tag: 'av-switch',
  category: 'forms',
  description:
    'Controle binario com suporte a two-way binding e integracao com Angular Forms.',
  examples: [
    {
      id: 'default',
      title: 'Default',
      component: SwitchDefaultExample,
      code: `
<av-switch></av-switch>
      `.trim(),
      size: 'sm',
    },
    {
      id: 'checked',
      title: 'Marcado',
      component: SwitchCheckedExample,
      code: `
<av-switch [checked]="true"></av-switch>
      `.trim(),
      size: 'sm',
    },
    {
      id: 'bound',
      title: 'Two-way binding',
      description: 'O exemplo usa model input com um signal no componente host.',
      component: SwitchBoundExample,
      code: `
enabled = signal(true);

<av-switch [(checked)]="enabled"></av-switch>
<span>{{ enabled() ? 'Ativo' : 'Inativo' }}</span>
      `.trim(),
      size: 'lg',
    },
    {
      id: 'disabled',
      title: 'Disabled',
      component: SwitchDisabledExample,
      code: `
<av-switch [disabled]="true"></av-switch>
<av-switch [checked]="true" [disabled]="true"></av-switch>
      `.trim(),
      size: 'lg',
    },
  ],
  api: {
    inputs: [
      {
        name: 'variant',
        type: 'string',
        default: 'defaultVariant',
        description: 'Define a paleta visual usada pelo switch ativo.',
      },
      {
        name: 'rounded',
        type: "number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
        default: "'md'",
        description: 'Controla o raio de borda do trilho e do thumb.',
      },
      {
        name: 'checked',
        type: 'ModelSignal<boolean>',
        default: 'false',
        description: 'Estado marcado do controle.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Impede interacao com o controle.',
      },
    ],
    outputs: [
      {
        name: 'checkedChange',
        type: 'boolean',
        description: 'Emitido automaticamente pelo model input checked.',
      },
    ],
  },
};
