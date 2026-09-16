import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'av-cluster',
  styleUrl: './av-cluster.css',
  templateUrl: './av-cluster.html',
})
export class AvCluster {
  gap = input<number>(1)

  get gapValue() {
    return `${4 * this.gap()}px`
  }
}
