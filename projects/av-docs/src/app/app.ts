import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  AvBadge,
  AvButton,
  AvCheckbox,
  AvCurrencyInput,
  AvDateTimePicker,
  AvInput,
  AvMultiSelect,
  AvSelect,
  ThemeService,
} from 'angular-visuals';

@Component({
  imports: [
    RouterOutlet,
    AvBadge,
    AvButton,
    AvInput,
    AvSelect,
    AvCheckbox,
    AvCurrencyInput,
    AvDateTimePicker,
    AvMultiSelect,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  array = signal<any[]>([
    { label: 'Produto Alpha', value: 'alpha' },
    { label: 'Produto Beta', value: 'beta' },
    { label: 'Produto Gamma', value: 'gamma' },
  ]);

  constructor(
    private themeService: ThemeService
  ) { }

  protected readonly title = signal('av-docs');
}
