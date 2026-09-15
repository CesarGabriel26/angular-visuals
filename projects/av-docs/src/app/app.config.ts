import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideAngularVisuals } from 'angular-visuals';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAngularVisuals({
      theme: {
        mode: 'light',
        defaultVariant: 'emerald',
      }
    })
  ],
};
