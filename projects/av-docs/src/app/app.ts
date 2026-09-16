import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AvBadge, AvButton, AvCarousel, AvCarouselItem, AvCheckbox, AvCurrencyInput, AvDateTimePicker, AvGrid, AvIcon, AvIconRegistry, AvInput, AvMultiSelect, AvProgressBar, AvProgressBarCircle, AvSelect, AvSlider, AvStep, AvStepper, AvTab, AvTabs, AvTable, ThemeService, AvSwitch, AvFileUpload, type AvFileUploadFile, type AvSliderValue, AvTextArea, AvTooltip } from 'angular-visuals';

@Component({
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AvBadge,
    AvButton,
    AvInput,
    AvSelect,
    AvCheckbox,
    AvCurrencyInput,
    AvDateTimePicker,
    AvMultiSelect,
    AvProgressBar,
    AvProgressBarCircle,
    AvTable,
    AvGrid,
    AvIcon,
    AvCarousel,
    AvCarouselItem,
    AvStepper,
    AvStep,
    AvTabs,
    AvTab,
    AvSlider,
    AvSwitch,
    AvFileUpload,
    AvTextArea,
    AvTooltip
],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly themeService = inject(ThemeService);
  private readonly iconRegistry = inject(AvIconRegistry);

  protected readonly icons = this.iconRegistry.getIcons();
  protected readonly sliderValue = 25;
  protected sliderRangeValue = signal<[number,number]>([25,80])
  protected uploadedFiles = signal<AvFileUploadFile[]>([]);

  array = signal<any[]>([
    { label: 'Produto Alpha', value: 'alpha' },
    { label: 'Produto Beta', value: 'beta' },
    { label: 'Produto Gamma', value: 'gamma' },
  ]);
  rows = signal([
    { name: 'Produto Alpha', status: 'Ativo', amount: 1280 },
    { name: 'Produto Beta', status: 'Pendente', amount: 640 },
    { name: 'Produto Gamma', status: 'Pausado', amount: 320 },
  ]);

  protected readonly title = signal('av-docs');

  protected updateSliderRange(value: AvSliderValue): void {
    if (Array.isArray(value)) {
      this.sliderRangeValue.set(value);
    }
  }
}
