import { Component } from '@angular/core';
import { AvButton } from 'angular-visuals';

@Component({
  standalone: true,
  imports: [AvButton],
  template: `
    <button av-button>
      Default
    </button>
  `,
})
export class ButtonDefaultExample {}

@Component({
  standalone: true,
  imports: [AvButton],
  styles: [`
    .button-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
    }
  `],
  template: `
    <div class="button-row">
      <button av-button variant="orange">Orange</button>
      <button av-button variant="blue">Blue</button>
      <button av-button variant="green">Green</button>
      <button av-button variant="purple">Purple</button>
    </div>
  `,
})
export class ButtonVariantsExample {}

@Component({
  standalone: true,
  imports: [AvButton],
  template: `
    <button av-button icon="check">
      Confirmar
    </button>
  `,
})
export class ButtonWithIconExample {}

@Component({
  standalone: true,
  imports: [AvButton],
  template: `
    <button av-button [loading]="true">
      Carregando
    </button>
  `,
})
export class ButtonLoadingExample {}

@Component({
  standalone: true,
  imports: [AvButton],
  styles: [`
    .button-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
    }
  `],
  template: `
    <div class="button-row">
      <button av-button rounded="xs">XS</button>
      <button av-button rounded="md">MD</button>
      <button av-button rounded="full">Full</button>
    </div>
  `,
})
export class ButtonRoundedExample {}
