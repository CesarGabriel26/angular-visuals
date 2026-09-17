import type { ComponentDoc } from '../types/component';
import { TooltipBasicExample } from '../examples/overlay.examples';

export const TOOLTIP_DOC: ComponentDoc = {
  name: 'Tooltip',
  tag: '[av-tooltip], [avTooltip]',
  category: 'overlay',
  description: 'Diretiva de tooltip baseada em CDK Overlay.',
  examples: [
    {
      id: 'basic',
      title: 'Hover',
      component: TooltipBasicExample,
      code: `
<button
  av-button
  avTooltip="Copiado para a area de transferencia"
  avTooltipPosition="top"
>
  Passe o mouse
</button>
      `.trim(),
      size: 'sm',
    },
  ],
  api: {
    inputs: [
      { name: 'avTooltip', type: 'string', description: 'Texto do tooltip.' },
      { name: 'avTooltipPosition', type: "'top' | 'right' | 'bottom' | 'left'", default: "'top'" },
      { name: 'avTooltipVariant', type: 'string', default: 'defaultVariant' },
      { name: 'avTooltipDisabled', type: 'boolean', default: 'false' },
      { name: 'avTooltipShowDelay', type: 'number', default: '120' },
      { name: 'avTooltipHideDelay', type: 'number', default: '60' },
      { name: 'avTooltipOffset', type: 'number', default: '8' },
    ],
  },
};
