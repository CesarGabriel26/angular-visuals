import { InjectionToken, Provider, makeEnvironmentProviders, EnvironmentProviders } from '@angular/core';
import { VisualsConfig } from '../../types/theme';

export const VISUALS_CONFIG = new InjectionToken<VisualsConfig>('VISUALS_CONFIG');

export function provideAngularVisuals(config: VisualsConfig): EnvironmentProviders {
  const providers: Provider[] = [
    {
      provide: VISUALS_CONFIG,
      useValue: config
    },
  ];
  return makeEnvironmentProviders(providers);
}
