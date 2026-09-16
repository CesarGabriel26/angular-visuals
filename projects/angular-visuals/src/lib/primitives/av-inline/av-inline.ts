import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'av-inline',
  styleUrl: './av-inline.css',
  templateUrl: './av-inline.html',
})
export class AvInline {
  gap = input<number>(1)

  get gapValue() {
    return `${4 * this.gap()}px`
  }
}
