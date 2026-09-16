import { Component, booleanAttribute, input, signal } from '@angular/core';

@Component({
  selector: 'av-tab',
  standalone: true,
  templateUrl: './av-tab.component.html',
  styleUrl: './av-tab.component.css',
})
export class AvTab {
  title = input<string>('');
  label = input<string>('');
  icon = input<string>('');
  disabled = input<boolean, unknown>(false, { transform: booleanAttribute });

  isActive = signal<boolean>(false);
  index = signal<number>(0);
}
