import { Component, booleanAttribute, input, signal } from '@angular/core';

@Component({
  selector: 'av-step',
  standalone: true,
  styleUrls: ['./av-step.component.css'],
  templateUrl: './av-step.component.html',
})
export class AvStep {
  title = input.required<string>();
  icon = input<string>('');
  hasError = input<boolean, unknown>(false, { transform: booleanAttribute });

  isActive = signal<boolean>(false);
  index = signal<number>(0);
}
