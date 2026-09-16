import { Component, HostBinding, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvIconRegistry } from '@av/lib/core/services/IconRegistry.service';

type AvIconSize = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | number;

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'span[av-icon], i[av-icon]',
  templateUrl: './av-icon.component.html',
  styleUrls: ['./av-icon.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AvIcon {
  /** Nome do ícone (ex: 'search', 'user', 'settings') */
  name = input.required<string>();

  /** Tamanho em relação ao font-size herdado ou em pixels. */
  size = input<AvIconSize>('base');

  constructor(
    public iconRegistry: AvIconRegistry
  ) { }

  get sizeClass(): string {
    const size = this.size();

    return typeof size === 'number' ? 'av-icon--custom' : `av-icon--${size}`;
  }

  @HostBinding('class')
  get elementClasses(): string {
    return `av-icon ${this.sizeClass}`;
  }

  @HostBinding('style.font-size')
  get fontSize(): string | null {
    const size = this.size();

    return typeof size === 'number' ? `${size}px` : null;
  }
}
