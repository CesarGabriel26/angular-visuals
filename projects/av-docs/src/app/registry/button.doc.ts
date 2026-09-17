import type { ComponentDoc } from '../types/component';
import {
  ButtonDefaultExample,
  ButtonLoadingExample,
  ButtonRoundedExample,
  ButtonVariantsExample,
  ButtonWithIconExample,
} from '../examples/button.examples';

export const BUTTON_DOC: ComponentDoc = {
  name: 'Button',
  tag: 'button[av-button], a[av-button]',
  category: 'base',
  description:
    'Botao interativo com suporte a variantes, icones, loading e controle de arredondamento.',
  examples: [
    {
      id: 'default',
      title: 'Default',
      component: ButtonDefaultExample,
      code: `
<button av-button>
  Default
</button>
      `.trim(),
      size: 'sm',
    },
    {
      id: 'variants',
      title: 'Variantes',
      description: 'A cor e definida pelo token passado em variant.',
      component: ButtonVariantsExample,
      code: `
<button av-button variant="orange">Orange</button>
<button av-button variant="blue">Blue</button>
<button av-button variant="green">Green</button>
<button av-button variant="purple">Purple</button>
      `.trim(),
      size: 'lg',
    },
    {
      id: 'with-icon',
      title: 'Com icone',
      component: ButtonWithIconExample,
      code: `
<button av-button icon="check">
  Confirmar
</button>
      `.trim(),
      size: 'sm',
    },
    {
      id: 'loading',
      title: 'Loading',
      component: ButtonLoadingExample,
      code: `
<button av-button [loading]="true">
  Carregando
</button>
      `.trim(),
      size: 'sm',
    },
    {
      id: 'rounded',
      title: 'Arredondamento',
      component: ButtonRoundedExample,
      code: `
<button av-button rounded="xs">XS</button>
<button av-button rounded="md">MD</button>
<button av-button rounded="full">Full</button>
      `.trim(),
      size: 'lg',
    },
  ],
  api: {
    inputs: [
      {
        name: 'icon',
        type: 'string',
        description: 'Nome do icone exibido antes do conteudo.',
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description: 'Alterna o botao para o estado de carregamento.',
      },
      {
        name: 'loadingIcon',
        type: 'string',
        default: "'blocks-shuffle-3'",
        description: 'Icone usado quando loading esta ativo.',
      },
      {
        name: 'variant',
        type: 'string',
        default: 'defaultVariant',
        description: 'Define a paleta visual usada pelo botao.',
      },
      {
        name: 'rounded',
        type: "number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
        default: "'md'",
        description: 'Controla o raio de borda do botao.',
      },
    ],
  },
};
