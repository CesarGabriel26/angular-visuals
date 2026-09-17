import type { ComponentDoc } from '../types/component';
import {
  ProgressBarBasicExample,
  ProgressBarCircleBasicExample,
  ProgressBarStripedExample,
} from '../examples/feedback.examples';

export const PROGRESS_BAR_DOC: ComponentDoc = {
  name: 'ProgressBar',
  tag: 'av-progress-bar',
  category: 'feedback',
  description: 'Barra de progresso linear com porcentagem, stripes e gradiente.',
  examples: [
    {
      id: 'basic',
      title: 'Basico',
      component: ProgressBarBasicExample,
      code: `
<av-progress-bar
  [value]="72"
  [max]="100"
  variant="orange"
/>
      `.trim(),
      size: 'lg',
    },
    {
      id: 'striped',
      title: 'Striped',
      component: ProgressBarStripedExample,
      code: `
<av-progress-bar
  [value]="48"
  [max]="100"
  [striped]="true"
  [gradient]="true"
  percentPos="fill"
  variant="blue"
/>
      `.trim(),
      size: 'lg',
    },
  ],
  api: {
    inputs: [
      { name: 'value', type: 'number', description: 'Valor atual.' },
      { name: 'max', type: 'number', description: 'Valor maximo.' },
      { name: 'striped', type: 'boolean', default: 'false' },
      { name: 'showPercent', type: 'boolean', default: 'true' },
      { name: 'percentPos', type: "'fill' | 'center'", default: "'center'" },
      { name: 'gradient', type: 'boolean', default: 'false' },
      { name: 'height', type: 'number', default: '20' },
    ],
  },
};

export const PROGRESS_BAR_CIRCLE_DOC: ComponentDoc = {
  name: 'ProgressBarCircle',
  tag: 'av-progress-bar-circle',
  category: 'feedback',
  description: 'Indicador circular de progresso baseado em valor e maximo.',
  examples: [
    {
      id: 'basic',
      title: 'Circular',
      component: ProgressBarCircleBasicExample,
      code: `
<av-progress-bar-circle
  [value]="68"
  [max]="100"
  [size]="132"
  variant="green"
/>
      `.trim(),
      size: 'sm',
    },
  ],
  api: {
    inputs: [
      { name: 'value', type: 'number', description: 'Valor atual.' },
      { name: 'max', type: 'number', description: 'Valor maximo.' },
      { name: 'showPercent', type: 'boolean', default: 'true' },
      { name: 'size', type: 'number', default: '120' },
      { name: 'strokeWidth', type: 'number', default: '12' },
    ],
  },
};
