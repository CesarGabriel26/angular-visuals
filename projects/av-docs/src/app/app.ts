import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvInline, AvSidenav, ThemeService, AvNavLink, AvDropdown, AvButton } from 'angular-visuals';
@Component({
  imports: [
    AvSidenav,
    AvInline,
    AvNavLink,
    AvDropdown,
    RouterOutlet,
    AvButton
],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  readonly themeService = inject(ThemeService);
}
