import { Component, HostBinding, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvIconRegistry } from '../../../Core/services/IconRegistry.service';


@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'span[av-icon], i[av-icon]',
  templateUrl: './av-icon.component.html',
  styleUrls: ['./av-icon.component.css'],
})
export class AvIcon {
  /** Nome do ícone (ex: 'search', 'user', 'settings') */
  name = input.required<string>()

  /** Tamanho */
  size = input<string>('base');

  constructor(
    public iconRegistry: AvIconRegistry
  ) { }

  get sizeClass(): string {
    return `av-text-${this.size()}`
  }

  @HostBinding('class')
  get elementClasses() {
    return 'flex items-center justify-center'
  }
}
