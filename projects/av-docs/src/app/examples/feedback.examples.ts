import { Component } from '@angular/core';
import { AvProgressBar, AvProgressBarCircle } from 'angular-visuals';

@Component({
  standalone: true,
  imports: [AvProgressBar],
  styles: [`
    .progress-demo {
      width: min(100%, 26rem);
    }
  `],
  template: `
    <av-progress-bar
      class="progress-demo"
      [value]="72"
      [max]="100"
      variant="orange"
    />
  `,
})
export class ProgressBarBasicExample {}

@Component({
  standalone: true,
  imports: [AvProgressBar],
  styles: [`
    .progress-demo {
      width: min(100%, 26rem);
    }
  `],
  template: `
    <av-progress-bar
      class="progress-demo"
      [value]="48"
      [max]="100"
      [striped]="true"
      [gradient]="true"
      percentPos="fill"
      variant="blue"
    />
  `,
})
export class ProgressBarStripedExample {}

@Component({
  standalone: true,
  imports: [AvProgressBarCircle],
  template: `
    <av-progress-bar-circle
      [value]="68"
      [max]="100"
      [size]="132"
      variant="green"
    />
  `,
})
export class ProgressBarCircleBasicExample {}
