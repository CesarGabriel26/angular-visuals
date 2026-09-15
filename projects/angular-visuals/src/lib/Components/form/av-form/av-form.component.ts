import { Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'form[av-form]',
  standalone: true,
  styleUrls: ['./av-form.component.css'],
  templateUrl: './av-form.component.html',
})
export class AvForm {
  glass = input<boolean>(false);

  @HostBinding('class')
  get elementClasses(): string {
    return ['av-form', this.glass() ? 'av-form--glass' : 'av-form--solid'].join(' ');
  }
}
