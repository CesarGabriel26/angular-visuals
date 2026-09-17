import { Component } from '@angular/core';
import { AvBadge } from 'angular-visuals';

@Component({
  standalone: true,
  imports: [AvBadge],
  template: `
    <span av-badge>
      New
    </span>
  `,
})
export class BadgeDefaultExample {}

@Component({
  standalone: true,
  imports: [AvBadge],
  styles: [`
    .badge-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 0.65rem;
    }
  `],
  template: `
    <div class="badge-row">
      <span av-badge variant="orange">New</span>
      <span av-badge variant="blue">Info</span>
      <span av-badge variant="green">Ok</span>
      <span av-badge variant="red">Error</span>
      <span av-badge variant="purple">Beta</span>
    </div>
  `,
})
export class BadgeVariantsExample {}
