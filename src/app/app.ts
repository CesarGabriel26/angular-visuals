import { mock } from './mock';
import { Component, computed, signal } from '@angular/core';
import {
  AvTableComponent as AvTable,
  PageChangeEvent,
  SortEvent
} from './lib/angular-visuals/components/av-table/av-table.component';
import { AvSortIconComponent as AvSortIcon } from './lib/angular-visuals/components/icons/av-sort-icon/av-sort-icon.component';
import { AvSortableColumnDirective as AvSortableColumn } from './lib/angular-visuals/directives/av-sortable-column.directive';

import { AvButtonComponent as AvButton } from './lib/angular-visuals/components/buttons/av-button/av-button.component';
import { AvButtonGroupComponent as AvButtonGroup } from './lib/angular-visuals/components/buttons/av-button-group/av-button-group.component';
import { AvToggleComponent as AvToggle } from './lib/angular-visuals/components/buttons/av-toggle/av-toggle.component';
import { AvBadgeComponent as AvBadge } from './lib/angular-visuals/components/av-badge/av-badge.component';

import { AvCarouselComponent as AvCarousel } from './lib/angular-visuals/components/carousel/av-carousel/av-carousel.component';
import { AvCarouselItemComponent as AvCarouselItem } from './lib/angular-visuals/components/carousel/av-carousel-item/av-carousel-item.component';

import { AvProgressBarComponent as AvProgressBar } from './lib/angular-visuals/components/progress-bars/av-progress-bar/av-progress-bar.component';
import { AvProgressBarCircleComponent as AvProgressBarCircle } from './lib/angular-visuals/components/progress-bars/av-progress-bar-circle/av-progress-bar-circle.component';

import { AvStepperComponent as AvStepper } from './lib/angular-visuals/components/stepper/av-stepper/av-stepper.component';
import { AvStepComponent as AvStep } from './lib/angular-visuals/components/stepper/av-step/av-step.component';

import { AvFormComponent as AvForm } from './lib/angular-visuals/components/forms/av-form/av-form.component';
import { AvCheckboxComponent as AvCheckbox } from './lib/angular-visuals/components/forms/av-checkbox/av-checkbox.component';
import { AvInputComponent as AvInput } from './lib/angular-visuals/components/forms/av-input/av-input.component';
import { AvSelectComponent as AvSelect } from './lib/angular-visuals/components/forms/av-select/av-select.component';
import { AvMultiSelectComponent as AvMultiSelect } from './lib/angular-visuals/components/forms/av-multi-select/av-multi-select.component';
import { AvCurrencyInputComponent as AvCurrencyInput } from './lib/angular-visuals/components/forms/av-currency-input/av-currency-input.component';
import { AvDateTimePickerComponent as AvDateTimePicker } from './lib/angular-visuals/components/forms/av-date-time-picker/av-date-time-picker.component';
import { AvIconComponent as AvIcon } from './lib/angular-visuals/components/icons/av-icon/av-icon.component';

type VariantHue = 'blue' | 'orange' | 'red' | 'slate' | 'gray';
type CarouselTransition = 'fade' | 'scroll';
type DemoPerson = (typeof mock)[number];
type DemoSortField = keyof DemoPerson;

@Component({
  imports: [
    AvTable, AvSortIcon, AvSortableColumn,
    AvButton, AvButtonGroup, AvToggle, AvBadge,
    AvCarousel, AvCarouselItem,
    AvProgressBar, AvProgressBarCircle,
    AvStepper, AvStep,
    AvForm, AvCheckbox, AvInput, AvSelect, AvMultiSelect, AvCurrencyInput, AvDateTimePicker,
    AvIcon,
  ],
  selector: 'app-root',
  styleUrls: ['./app.css'],
  templateUrl: './app.html',
})
export class App {
  readonly mock = mock;
  readonly variants: VariantHue[] = ['blue', 'orange', 'red', 'slate', 'gray'];
  readonly buttonVariants = ['blue', 'blue-outlined', 'orange', 'orange-outlined', 'red', 'red-outlined', 'slate', 'slate-outlined', 'gray', 'gray-outlined'];
  readonly iconNames = ['search', 'check', 'close', 'expand_more', 'calendar_today', 'schedule', 'payments', 'arrow_left', 'arrow_right', 'double_arrow_left', 'double_arrow_right'];
  readonly pageSizes = [5, 8, 12];
  readonly formOptions = [
    { label: 'Design System', value: 'design-system' },
    { label: 'Dashboard', value: 'dashboard' },
    { label: 'Backoffice', value: 'backoffice' },
    { label: 'Landing Page', value: 'landing-page' },
  ];
  readonly teamOptions = [
    { label: 'Produto', value: 'product' },
    { label: 'Engenharia', value: 'engineering' },
    { label: 'Design', value: 'design' },
    { label: 'Operações', value: 'ops' },
    { label: 'Growth', value: 'growth' },
  ];
  readonly navItems = [
    { href: '#overview', label: 'Overview', icon: 'search' },
    { href: '#buttons', label: 'Buttons & Toggles', icon: 'check' },
    { href: '#badges', label: 'Badges', icon: 'payments' },
    { href: '#progress', label: 'Progress', icon: 'schedule' },
    { href: '#stepper', label: 'Stepper', icon: 'arrow_right' },
    { href: '#forms', label: 'Forms & Inputs', icon: 'calendar_today' },
    { href: '#table', label: 'Table & Paginator', icon: 'double_arrow_right' },
    { href: '#carousel', label: 'Carousel', icon: 'expand_more' },
    { href: '#icons', label: 'Icons', icon: 'search' },
  ];

  readonly activeVariant = signal<VariantHue>('blue');
  readonly progressValue = signal(68);
  readonly stepIndex = signal(1);
  readonly carouselTransition = signal<CarouselTransition>('fade');
  readonly tablePageIndex = signal(0);
  readonly tablePageSize = signal(8);
  readonly sortField = signal<DemoSortField>('firstName');
  readonly sortOrder = signal<'asc' | 'desc'>('asc');

  readonly progressSecondary = computed(() => Math.max(12, 100 - this.progressValue()));

  readonly sortedRows = computed(() => {
    const field = this.sortField();
    const direction = this.sortOrder() === 'asc' ? 1 : -1;

    return [...this.mock].sort((left, right) => {
      const leftValue = String(left[field] ?? '');
      const rightValue = String(right[field] ?? '');
      return leftValue.localeCompare(rightValue, 'pt-BR') * direction;
    });
  });

  readonly pagedRows = computed(() => {
    const start = this.tablePageIndex() * this.tablePageSize();
    return this.sortedRows().slice(start, start + this.tablePageSize());
  });

  setVariant(variant: VariantHue): void {
    this.activeVariant.set(variant);
  }

  setProgressFromEvent(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.progressValue.set(Math.round(Number(input.value)));
  }

  setStep(index: number): void {
    this.stepIndex.set(index);
  }

  nextStep(): void {
    this.stepIndex.update((index) => (index + 1) % 4);
  }

  previousStep(): void {
    this.stepIndex.update((index) => (index + 3) % 4);
  }

  setCarouselTransition(transition: CarouselTransition): void {
    this.carouselTransition.set(transition);
  }

  handleSort(event: SortEvent): void {
    this.sortField.set(event.field as DemoSortField);
    this.sortOrder.set(event.order);
  }

  handlePage(event: PageChangeEvent): void {
    this.tablePageIndex.set(event.page);
    this.tablePageSize.set(event.pageSize);
  }

  rowBadgeVariant(index: number): VariantHue {
    return this.variants[index % this.variants.length];
  }
}
