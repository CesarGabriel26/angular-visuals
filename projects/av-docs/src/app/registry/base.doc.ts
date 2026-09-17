import type { ComponentDoc } from '../types/component';
import {
  IconSetExample,
  IconSizesExample,
} from '../examples/base.examples';

export const ICON_DOC: ComponentDoc = {
  name: 'Icon',
  tag: 'span[av-icon], i[av-icon]',
  category: 'base',
  description:
    'Renderiza icones registrados no AvIconRegistry com controle de tamanho.',
  examples: [
    {
      id: 'set',
      title: 'Conjunto',
      component: IconSetExample,
      code: `
<span av-icon name="search" size="xl"></span>
<span av-icon name="check" size="xl"></span>
<span av-icon name="calendar_today" size="xl"></span>
<span av-icon name="payments" size="xl"></span>
      `.trim(),
      size: 'lg',
    },
    {
      id: 'sizes',
      title: 'Tamanhos',
      component: IconSizesExample,
      code: `
<span av-icon name="search" size="sm"></span>
<span av-icon name="search" size="base"></span>
<span av-icon name="search" size="lg"></span>
<span av-icon name="search" [size]="32"></span>
      `.trim(),
      size: 'lg',
    },
  ],
  api: {
    inputs: [
      {
        name: 'name',
        type: 'string',
        description: 'Nome do icone registrado.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | number",
        default: "'base'",
        description: 'Tamanho visual do icone.',
      },
    ],
  },
};
