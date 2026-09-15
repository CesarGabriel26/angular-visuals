import { Component, HostBinding, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvIconRegistry } from 'angular-visuals';


@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'span[av-icon], i[av-icon]',
  templateUrl: './av-icon.component.html',
  styleUrls: ['./av-icon.component.css'],
})
export class AvIconComponent {
  /** Nome do ícone (ex: 'search', 'user', 'settings') */
  name = input.required<string>()

  /** Tamanho */
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'md';

  /** Aplica rotação contínua (útil para spinners e carregamentos) */
  @Input() spin: boolean = false;

  private readonly sizeMap: Record<string, string> = {
    sm: '16px',
    md: '20px',
    lg: '24px',
    xl: '32px',
    '2xl': '40px',
  };


  constructor(
    public iconRegistry: AvIconRegistry
  ) { }

  get parsedSize(): string {
    return this.sizeMap[this.size] || this.size;
  }

  @HostBinding('class')
  get elementClasses() {
    return 'flex items-center justify-center'
  }
}
