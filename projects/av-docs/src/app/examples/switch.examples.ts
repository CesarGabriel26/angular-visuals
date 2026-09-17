import { Component, signal } from '@angular/core';
import { AvSwitch } from 'angular-visuals';

@Component({
  standalone: true,
  imports: [AvSwitch],
  template: `
    <av-switch />
  `,
})
export class SwitchDefaultExample {}

@Component({
  standalone: true,
  imports: [AvSwitch],
  template: `
    <av-switch [checked]="true" />
  `,
})
export class SwitchCheckedExample {}

@Component({
  standalone: true,
  imports: [AvSwitch],
  styles: [`
    .switch-state {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--av-color-text);
      font-size: 0.9rem;
    }
  `],
  template: `
    <div class="switch-state">
      <av-switch [(checked)]="enabled" />
      <span>{{ enabled() ? 'Ativo' : 'Inativo' }}</span>
    </div>
  `,
})
export class SwitchBoundExample {
  enabled = signal(true);
}

@Component({
  standalone: true,
  imports: [AvSwitch],
  styles: [`
    .switch-row {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  `],
  template: `
    <div class="switch-row">
      <av-switch [disabled]="true" />
      <av-switch [checked]="true" [disabled]="true" />
    </div>
  `,
})
export class SwitchDisabledExample {}
