import type { ComponentDoc } from '../types/component';
import {
  ClusterExample,
  DividerExample,
  InlineExample,
  StackExample,
  TextAnimatedExample,
} from '../examples/primitives.examples';

export const TEXT_DOC: ComponentDoc = {
  name: 'Text',
  tag: 'av-text',
  category: 'base',
  description:
    'Texto com transicao simples para valores que mudam ao longo do tempo.',
  examples: [
    {
      id: 'animated',
      title: 'Animado',
      component: TextAnimatedExample,
      code: `
<av-text [value]="label()" animation="slide" />
      `.trim(),
      size: 'lg',
    },
  ],
  api: {
    inputs: [
      { name: 'value', type: 'string | number', default: "''" },
      { name: 'animation', type: "'none' | 'fade' | 'slide'", default: "'none'" },
      { name: 'duration', type: 'number', default: '250' },
    ],
  },
};

export const STACK_DOC: ComponentDoc = {
  name: 'Stack',
  tag: 'av-stack',
  category: 'layout',
  description:
    'Primitiva de layout para empilhar conteudo verticalmente com gap consistente.',
  examples: [
    {
      id: 'default',
      title: 'Vertical',
      component: StackExample,
      code: `
<av-stack [gap]="3">
  <div>Header</div>
  <div>Content</div>
  <div>Footer</div>
</av-stack>
      `.trim(),
      size: 'lg',
    },
  ],
  api: {
    inputs: [
      { name: 'gap', type: 'number', default: '1', description: 'Multiplicador de 4px para o espaco entre itens.' },
    ],
  },
};

export const INLINE_DOC: ComponentDoc = {
  name: 'Inline',
  tag: 'av-inline',
  category: 'layout',
  description:
    'Primitiva para alinhar conteudo em linha com espacamento previsivel.',
  examples: [
    {
      id: 'default',
      title: 'Horizontal',
      component: InlineExample,
      code: `
<av-inline [gap]="3">
  <span av-badge variant="orange">Alpha</span>
  <span av-badge variant="blue">Beta</span>
  <span av-badge variant="green">Stable</span>
</av-inline>
      `.trim(),
      size: 'lg',
    },
  ],
  api: {
    inputs: [
      { name: 'gap', type: 'number', default: '1', description: 'Multiplicador de 4px para o espaco entre itens.' },
    ],
  },
};

export const CLUSTER_DOC: ComponentDoc = {
  name: 'Cluster',
  tag: 'av-cluster',
  category: 'layout',
  description:
    'Primitiva para agrupar acoes ou chips com quebra natural de linha.',
  examples: [
    {
      id: 'actions',
      title: 'Acoes',
      component: ClusterExample,
      code: `
<av-cluster [gap]="3">
  <button av-button variant="orange">Salvar</button>
  <button av-button variant="blue">Duplicar</button>
  <button av-button variant="slate">Cancelar</button>
</av-cluster>
      `.trim(),
      size: 'lg',
    },
  ],
  api: {
    inputs: [
      { name: 'gap', type: 'number', default: '1', description: 'Multiplicador de 4px para o espaco entre itens.' },
    ],
  },
};

export const DIVIDER_DOC: ComponentDoc = {
  name: 'Divider',
  tag: 'lib-av-divider',
  category: 'layout',
  description:
    'Separador visual simples para dividir blocos de conteudo.',
  examples: [
    {
      id: 'default',
      title: 'Horizontal',
      component: DividerExample,
      code: `
<lib-av-divider variant="orange"></lib-av-divider>
      `.trim(),
      size: 'lg',
    },
  ],
  api: {
    inputs: [
      { name: 'size', type: 'number', default: '1' },
      { name: 'direction', type: "'vert' | 'hori'", default: "'hori'" },
      { name: 'variant', type: 'string', default: 'defaultVariant' },
    ],
  },
};
