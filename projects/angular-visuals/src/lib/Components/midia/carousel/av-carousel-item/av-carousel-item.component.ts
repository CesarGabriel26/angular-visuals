import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'av-carousel-item',
  standalone: true,
  styleUrls: ['./av-carousel-item.component.css'],
  templateUrl: './av-carousel-item.component.html',
})
export class AvCarouselItem {
  duration = input<number | undefined>(undefined);

  isActive = signal<boolean>(false);
  index = signal<number>(0);
  transition = signal<'scroll' | 'fade'>('fade');

  get itemClasses(): string {
    return [
      'av-carousel-item',
      `av-carousel-item--${this.transition()}`,
      this.isActive() ? 'av-carousel-item--active' : 'av-carousel-item--inactive',
    ].join(' ');
  }
}
