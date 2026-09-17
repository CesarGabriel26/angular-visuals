import { NgComponentOutlet } from '@angular/common';
import { Component, HostBinding, computed, input, signal } from '@angular/core';
import { ComponentExample } from '../../types/component';
import { AvBadge, AvButton, AvIcon } from 'angular-visuals';

@Component({
  imports: [NgComponentOutlet, AvBadge, AvButton, AvIcon],
  selector: 'docs-example',
  styleUrl: './example-card.css',
  templateUrl: './example-card.html',
})
export class ExampleCardComponent {
  example = input.required<ComponentExample>();

  showCode = signal(false);

  readonly sizeClass = computed(() =>
    `example--${this.example().size ?? 'md'}`
  );

  @HostBinding('class')
  get hostClass(): string {
    return this.sizeClass();
  }

  async copyCode(): Promise<void> {
    await navigator.clipboard.writeText(this.example().code);
  }
}
