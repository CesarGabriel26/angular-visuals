import { AvSelect } from './lib/Components/form/av-select/av-select.component';
import { AvInput } from './lib/Components/form/av-input/av-input.component';
import { AvCheckbox } from './lib/Components/form/av-checkbox/av-checkbox.component';
import { AvCurrencyInput } from './lib/Components/form/av-currency-input/av-currency-input.component';
import { AvDateTimePicker } from './lib/Components/form/av-date-time-picker/av-date-time-picker.component';
import { AvForm } from './lib/Components/form/av-form/av-form.component';
import { AvMultiSelect } from './lib/Components/form/av-multi-select/av-multi-select.component';
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

  AvInput,
  AvSelect,
  AvCheckbox,
  AvCheckbox as AvCheckboxComponent,
  AvCurrencyInput,
  AvCurrencyInput as AvCurrencyInputComponent,
  AvDateTimePicker,
  AvDateTimePicker as AvDateTimePickerComponent,
  AvForm,
  AvForm as AvFormComponent,
  AvMultiSelect,
  AvMultiSelect as AvMultiSelectComponent
}
