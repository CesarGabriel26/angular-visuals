import type { ComponentDoc } from '../types/component';
import {
  CarouselBasicExample,
  CarouselItemBasicExample,
} from '../examples/media.examples';

export const CAROUSEL_DOC: ComponentDoc = {
  name: 'Carousel',
  tag: 'av-carousel',
  category: 'layout',
  description: 'Carousel com controles, dots, autoplay e transicoes fade ou scroll.',
  examples: [
    {
      id: 'basic',
      title: 'Slides',
      component: CarouselBasicExample,
      code: `
<av-carousel [auto]="false">
  <av-carousel-item>Slide 1</av-carousel-item>
  <av-carousel-item>Slide 2</av-carousel-item>
  <av-carousel-item>Slide 3</av-carousel-item>
</av-carousel>
      `.trim(),
      size: 'full',
    },
  ],
  api: {
    inputs: [
      { name: 'auto', type: 'boolean', default: 'true' },
      { name: 'controls', type: 'boolean', default: 'true' },
      { name: 'dots', type: 'boolean', default: 'true' },
      { name: 'transition', type: "'scroll' | 'fade'", default: "'fade'" },
      { name: 'transitionDelay', type: 'number | undefined' },
    ],
    outputs: [
      { name: 'indexChange', type: 'number' },
    ],
  },
};

export const CAROUSEL_ITEM_DOC: ComponentDoc = {
  name: 'CarouselItem',
  tag: 'av-carousel-item',
  category: 'layout',
  description: 'Item projetado dentro de AvCarousel.',
  examples: [
    {
      id: 'inside-carousel',
      title: 'Com duracao',
      component: CarouselItemBasicExample,
      code: `
<av-carousel transition="scroll" [auto]="false">
  <av-carousel-item [duration]="3000">
    Item com duracao
  </av-carousel-item>
  <av-carousel-item>
    Item padrao
  </av-carousel-item>
</av-carousel>
      `.trim(),
      size: 'full',
    },
  ],
  api: {
    inputs: [
      { name: 'duration', type: 'number | undefined', description: 'Tempo do item quando autoplay esta ativo.' },
    ],
  },
};
