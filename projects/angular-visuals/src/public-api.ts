import { AvTooltip, type AvTooltipPosition } from '@av/lib/components/overlay/av-tooltip/av-tooltip';
import { AvTextArea } from '@av/lib/components/form/av-text-area/av-text-area.component';
import { AvFileUpload, type AvFileUploadFile, type AvFileUploadRejection, type AvFileUploadValue } from '@av/lib/components/form/av-file-upload/av-file-upload';
import { AvText } from '@av/lib/primitives/av-text/av-text';
import { AvSwitch } from '@av/lib/components/form/av-switch/av-switch.component';
import { AvSlider, type AvSliderRangeValue, type AvSliderValue } from '@av/lib/components/form/av-slider/av-slider';
import { AvSelect } from '@av/lib/components/form/av-select/av-select.component';
import { AvInput } from '@av/lib/components/form/av-input/av-input.component';
import { AvCheckbox } from '@av/lib/components/form/av-checkbox/av-checkbox.component';
import { AvCurrencyInput } from '@av/lib/components/form/av-currency-input/av-currency-input.component';
import { AvDateTimePicker } from '@av/lib/components/form/av-date-time-picker/av-date-time-picker.component';
import { AvForm } from '@av/lib/components/form/av-form/av-form.component';
import { AvMultiSelect } from '@av/lib/components/form/av-multi-select/av-multi-select.component';
import { AvGrid } from '@av/lib/components/layout/av-grid/grid.component';
import { AvIcon } from '@av/lib/components/base/av-icon/av-icon.component';
import { AvIconRegistry, type AvRegisteredIcon } from '@av/core/services/IconRegistry.service';
import { AvPaginator } from '@av/lib/components/layout/av-paginator/av-paginator.component';
import { AvProgressBar, AvProgressBarCircle } from '@av/lib/components/feedback/progress-bars';
import { AvCarousel, AvCarouselItem } from '@av/lib/components/midia/carousel';
import { AvStep, AvStepper } from '@av/lib/components/nav/stepper';
import { AvTab, AvTabs } from '@av/lib/components/nav/tabs';
import { AvTable } from '@av/lib/components/layout/av-table/av-table.component';
import { AvButton } from '@av/lib/components/base/av-button/av-button.component';
import { AvBadge } from '@av/lib/components/base/av-badge/av-badge.component';
import { ThemeService } from '@av/core/services/ThemeService.service';
import { provideAngularVisuals } from '@av/core/tokens'

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
