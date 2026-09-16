import { AvTooltip, type AvTooltipPosition } from './lib/Components/av-tooltip/av-tooltip';
import { AvTextArea } from './lib/Components/form/av-text-area/av-text-area.component';
import { AvFileUpload, type AvFileUploadFile, type AvFileUploadRejection, type AvFileUploadValue } from './lib/Components/form/av-file-upload/av-file-upload';
import { AvText } from './lib/primitives/av-text/av-text';
import { AvSwitch } from './lib/Components/form/av-switch/av-switch.component';
import { AvSlider, type AvSliderRangeValue, type AvSliderValue } from './lib/Components/form/av-slider/av-slider';
import { AvSelect } from './lib/Components/form/av-select/av-select.component';
import { AvInput } from './lib/Components/form/av-input/av-input.component';
import { AvCheckbox } from './lib/Components/form/av-checkbox/av-checkbox.component';
import { AvCurrencyInput } from './lib/Components/form/av-currency-input/av-currency-input.component';
import { AvDateTimePicker } from './lib/Components/form/av-date-time-picker/av-date-time-picker.component';
import { AvForm } from './lib/Components/form/av-form/av-form.component';
import { AvMultiSelect } from './lib/Components/form/av-multi-select/av-multi-select.component';
import { AvGrid } from './lib/Components/av-grid/grid.component';
import { AvIcon } from './lib/Components/av-icon/av-icon.component';
import { AvIconRegistry, type AvRegisteredIcon } from './Core/services/IconRegistry.service';
import { AvPaginator } from './lib/Components/av-paginator/av-paginator.component';
import { AvProgressBar, AvProgressBarCircle } from './lib/Components/progress-bars';
import { AvCarousel, AvCarouselItem } from './lib/Components/carousel';
import { AvStep, AvStepper } from './lib/Components/stepper';
import { AvTab, AvTabs } from './lib/Components/tabs';
import { AvTable } from './lib/Components/av-table/av-table.component';
import { AvButton } from './lib/Components/av-button/av-button.component';
import { AvBadge } from './lib/Components/av-badge/av-badge.component';
import { ThemeService } from './Core/services/ThemeService.service';
import { provideAngularVisuals } from './Core/tokens'

export {
  provideAngularVisuals,

  ThemeService,
  AvIconRegistry
}

export type {
  AvRegisteredIcon,
  AvFileUploadFile,
  AvFileUploadRejection,
  AvFileUploadValue,
  AvSliderRangeValue,
  AvSliderValue,
  AvTooltipPosition
}

export {
  AvBadge,
  AvButton,
  AvIcon,
  AvText,

  AvInput,
  AvSelect,
  AvCheckbox,
  AvCurrencyInput,
  AvDateTimePicker,
  AvForm,
  AvMultiSelect,
  AvGrid,
  AvPaginator,
  AvProgressBar,
  AvProgressBarCircle,
  AvCarousel,
  AvCarouselItem,
  AvStep,
  AvStepper,
  AvTab,
  AvTabs,
  AvTable,
  AvSlider,
  AvSwitch,
  AvFileUpload,
  AvTextArea,
  AvTooltip
}
