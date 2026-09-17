import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeService, AvButton } from 'angular-visuals';

@Component({
  standalone: true,
  imports: [CommonModule, AvButton, RouterLink],
  selector: 'app-overview.page',
  styleUrl: './overview.page.css',
  templateUrl: './overview.page.html',
})
export class OverviewPage {
  readonly themeService = inject(ThemeService);
}
