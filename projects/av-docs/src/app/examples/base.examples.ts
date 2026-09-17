import { Component } from '@angular/core';
import { AvIcon } from 'angular-visuals';

@Component({
  standalone: true,
  imports: [AvIcon],
  styles: [`
    .icon-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      color: var(--av-color-text);
    }
  `],
  template: `
    <div class="icon-row">
      <span av-icon name="search" size="xl"></span>
      <span av-icon name="check" size="xl"></span>
      <span av-icon name="calendar_today" size="xl"></span>
      <span av-icon name="payments" size="xl"></span>
    </div>
  `,
})
export class IconSetExample {}

@Component({
  standalone: true,
  imports: [AvIcon],
  styles: [`
    .icon-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      color: var(--av-color-text);
    }
  `],
  template: `
    <div class="icon-row">
      <span av-icon name="search" size="sm"></span>
      <span av-icon name="search" size="base"></span>
      <span av-icon name="search" size="lg"></span>
      <span av-icon name="search" [size]="32"></span>
    </div>
  `,
})
export class IconSizesExample {}
