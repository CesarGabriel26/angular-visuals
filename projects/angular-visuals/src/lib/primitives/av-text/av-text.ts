import {
  Component,
  effect,
  input,
  OnDestroy,
  signal
} from '@angular/core';

@Component({
  imports: [],
  selector: 'av-text',
  standalone: true,
  styleUrl: './av-text.css',
  templateUrl: './av-text.html',
})
export class AvText implements OnDestroy {
  value = input<string | number>('');

  animation = input<| 'none'
    | 'fade'
    | 'slide'>('none');

  duration = input(250);

  protected current = signal<string | number>('');
  protected previous = signal<string | number | null>(null);

  protected animating = signal(false);

  private timeout?: ReturnType<typeof setTimeout>;

  constructor() {
    effect(() => {
      const value = this.value();

      if (value === this.current()) {
        return;
      }

      this.animateTo(value);
    });
  }

  private animateTo(value: string | number): void {
    clearTimeout(this.timeout);

    this.previous.set(this.current());
    this.current.set(value);

    this.animating.set(true);

    this.timeout = setTimeout(() => {
      this.previous.set(null);
      this.animating.set(false);
    }, this.duration());
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }
}
