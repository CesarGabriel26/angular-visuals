import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvBadge, ThemeService, AvButton, AvInput } from 'angular-visuals';

@Component({
  imports: [RouterOutlet, AvBadge, AvButton, AvInput],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  constructor(
    private themeService: ThemeService
  ) { }

  protected readonly title = signal('av-docs');
}
