import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'av-stack',
  styleUrl: './av-stack.css',
  templateUrl: './av-stack.html',
})
export class AvStack {
  gap = input<number>(1)

  get gapValue() {
    return `${4 * this.gap()}px`
  }
}
