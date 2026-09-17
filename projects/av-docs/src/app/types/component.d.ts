import type { Type } from '@angular/core';

export type ComponentCategory =
  | 'base'
  | 'forms'
  | 'feedback'
  | 'layout'
  | 'navigation'
  | 'overlay'
  | 'data';

export type ExampleSize =
  | 'sm'
  | 'md'
  | 'lg'
  | 'full';

export interface ComponentDoc {
  name: string;
  tag: string;

  description?: string;

  category: ComponentCategory;

  examples: ComponentExample[];

  api?: ComponentApi;
}


export interface ComponentExample {
  id: string;

  title: string;
  description?: string;

  new?: boolean;

  code: string;

  component: Type<unknown>;

  size?: ExampleSize;
}

export interface ComponentInputDoc {
  name: string;
  type: string;
  default?: string;
  description?: string;
}

export interface ComponentOutputDoc {
  name: string;
  type: string;
  description?: string;
}

export interface ComponentApi {
  inputs?: ComponentInputDoc[];
  outputs?: ComponentOutputDoc[];
}
