import { Component } from '@angular/core';
import { AvButton, AvTooltip } from 'angular-visuals';

@Component({
  standalone: true,
  imports: [AvButton, AvTooltip],
  template: `
    <button
      av-button
      type="button"
      avTooltip="Copiado para a area de transferencia"
      avTooltipPosition="top"
    >
      Passe o mouse
    </button>
  `,
})
export class TooltipBasicExample {}
