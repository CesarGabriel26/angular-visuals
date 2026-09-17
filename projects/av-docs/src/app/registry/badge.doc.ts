import type { ComponentDoc } from '../types/component';
import {
  BadgeDefaultExample,
  BadgeVariantsExample,
} from '../examples/badge.examples';

export const BADGE_DOC: ComponentDoc = {
  name: 'Badge',
  tag: 'span[av-badge]',
  category: 'base',
  description:
    'Marcador compacto para status, novidades e pequenas informacoes contextuais.',
  examples: [
    {
      id: 'default',
      title: 'Default',
      component: BadgeDefaultExample,
      code: `
      <span av-badge>
        New
      </span>
      `.trim(),
      size: 'sm',
    },
    {
      id: 'variants',
      title: 'Variantes',
      component: BadgeVariantsExample,
      code: `
<span av-badge variant="orange">New</span>
<span av-badge variant="blue">Info</span>
<span av-badge variant="green">Ok</span>
<span av-badge variant="red">Error</span>
<span av-badge variant="purple">Beta</span>
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
        description: 'Define a paleta visual usada pelo badge.',
      },
    ],
  },
};
