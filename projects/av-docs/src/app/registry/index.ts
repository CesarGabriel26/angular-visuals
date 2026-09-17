import type { ComponentCategory, ComponentDoc } from '../types/component';
import { ICON_DOC } from './base.doc';
import { BADGE_DOC } from './badge.doc';
import { BUTTON_DOC } from './button.doc';
import {
  CHECKBOX_DOC,
  CURRENCY_INPUT_DOC,
  DATE_TIME_PICKER_DOC,
  FILE_UPLOAD_DOC,
  FORM_DOC,
  INPUT_DOC,
  MULTI_SELECT_DOC,
  SELECT_DOC,
  SLIDER_DOC,
  TEXT_AREA_DOC,
} from './form.docs';
import {
  PROGRESS_BAR_CIRCLE_DOC,
  PROGRESS_BAR_DOC,
} from './feedback.docs';
import {
  GRID_DOC,
  PAGINATOR_DOC,
  TABLE_DOC,
} from './layout.docs';
import {
  CAROUSEL_DOC,
  CAROUSEL_ITEM_DOC,
} from './media.docs';
import {
  CLUSTER_DOC,
  DIVIDER_DOC,
  INLINE_DOC,
  STACK_DOC,
  TEXT_DOC,
} from './primitives.doc';
import {
  DROPDOWN_DOC,
  NAV_LINK_DOC,
  SIDENAV_DOC,
  STEP_DOC,
  STEPPER_DOC,
  TAB_DOC,
  TABS_DOC,
} from './navigation.docs';
import { TOOLTIP_DOC } from './overlay.docs';
import { SWITCH_DOC } from './switch.doc';

export const COMPONENT_DOCS = {
  button: BUTTON_DOC,
  badge: BADGE_DOC,
  icon: ICON_DOC,
  text: TEXT_DOC,
  stack: STACK_DOC,
  inline: INLINE_DOC,
  cluster: CLUSTER_DOC,
  divider: DIVIDER_DOC,
  input: INPUT_DOC,
  'text-area': TEXT_AREA_DOC,
  select: SELECT_DOC,
  'multi-select': MULTI_SELECT_DOC,
  checkbox: CHECKBOX_DOC,
  switch: SWITCH_DOC,
  slider: SLIDER_DOC,
  'currency-input': CURRENCY_INPUT_DOC,
  'date-time-picker': DATE_TIME_PICKER_DOC,
  'file-upload': FILE_UPLOAD_DOC,
  form: FORM_DOC,
  'progress-bar': PROGRESS_BAR_DOC,
  'progress-bar-circle': PROGRESS_BAR_CIRCLE_DOC,
  grid: GRID_DOC,
  table: TABLE_DOC,
  paginator: PAGINATOR_DOC,
  tabs: TABS_DOC,
  tab: TAB_DOC,
  stepper: STEPPER_DOC,
  step: STEP_DOC,
  'nav-link': NAV_LINK_DOC,
  dropdown: DROPDOWN_DOC,
  sidenav: SIDENAV_DOC,
  carousel: CAROUSEL_DOC,
  'carousel-item': CAROUSEL_ITEM_DOC,
  tooltip: TOOLTIP_DOC,
} satisfies Record<string, ComponentDoc>;

export type ComponentDocSlug = keyof typeof COMPONENT_DOCS;

export interface ComponentDocNavItem {
  slug: ComponentDocSlug;
  name: string;
  tag: string;
  category: ComponentCategory;
  hasNew: boolean;
}

export const COMPONENT_DOC_LIST: ComponentDocNavItem[] = Object.entries(
  COMPONENT_DOCS
).map(([slug, doc]) => ({
  slug: slug as ComponentDocSlug,
  name: doc.name,
  tag: doc.tag,
  category: doc.category,
  hasNew: doc.examples.some((example) => example.new),
}));
