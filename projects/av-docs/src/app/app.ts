import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AvInline, AvSidenav, ThemeService, AvNavLink, AvDropdown } from 'angular-visuals';
import { COMPONENT_DOC_LIST } from './registry';

@Component({
  standalone: true,
  imports: [
    AvSidenav,
    AvInline,
    AvNavLink,
    AvDropdown,
    RouterOutlet,
    RouterLink,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  readonly themeService = inject(ThemeService);
  readonly componentDocs = COMPONENT_DOC_LIST;
}
