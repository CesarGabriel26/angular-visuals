import { AvInput } from './lib/Components/form/av-input/av-input.component';
import { AvIconRegistry } from './Core/services/IconRegistry.service';
import { AvButton } from './lib/Components/av-button/av-button.component';
import { AvBadge } from './lib/Components/av-badge/av-badge.component';
import { ThemeService } from './Core/services/ThemeService.service';
import { provideAngularVisuals } from './Core/tokens'

export {
  provideAngularVisuals,

  ThemeService,
  AvIconRegistry
}

export {
  AvBadge,
  AvButton,

  AvInput
}
