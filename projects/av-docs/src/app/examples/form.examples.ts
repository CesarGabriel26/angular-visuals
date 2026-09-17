import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AvCheckbox,
  AvCurrencyInput,
  AvDateTimePicker,
  AvFileUpload,
  AvForm,
  AvInput,
  AvMultiSelect,
  AvSelect,
  AvSlider,
  AvSwitch,
  AvTextArea,
} from 'angular-visuals';

const formStyles = `
  .field-demo {
    width: min(100%, 22rem);
  }

  .field-stack {
    display: grid;
    gap: 1rem;
    width: min(100%, 24rem);
  }

  .state-line {
    color: var(--av-color-text-muted);
    font-size: 0.8rem;
  }
`;

const countries = [
  { label: 'Brasil', value: 'br' },
  { label: 'Portugal', value: 'pt' },
  { label: 'Canada', value: 'ca' },
];

const tags = [
  { label: 'Angular', value: 'angular' },
  { label: 'Design System', value: 'design' },
  { label: 'Forms', value: 'forms' },
  { label: 'Docs', value: 'docs' },
];

@Component({
  standalone: true,
  imports: [AvInput],
  styles: [formStyles],
  template: `
    <av-input
      class="field-demo"
      label="Nome"
      icon="search"
      placeholder="Buscar componente"
    />
  `,
})
export class InputBasicExample {}

@Component({
  standalone: true,
  imports: [AvTextArea],
  styles: [formStyles],
  template: `
    <av-text-area
      class="field-demo"
      label="Descricao"
      placeholder="Escreva uma descricao curta"
    />
  `,
})
export class TextAreaBasicExample {}

@Component({
  standalone: true,
  imports: [AvSelect],
  styles: [formStyles],
  template: `
    <av-select
      class="field-demo"
      label="Pais"
      placeholder="Selecione"
      [data]="countries"
      [searchable]="false"
      value="br"
    />
  `,
})
export class SelectBasicExample {
  countries = countries;
}

@Component({
  standalone: true,
  imports: [AvMultiSelect, FormsModule],
  styles: [formStyles],
  template: `
    <div class="field-stack">
      <av-multi-select
        label="Tags"
        [data]="tags"
        [(ngModel)]="selected"
      />
      <span class="state-line">{{ selected.join(', ') }}</span>
    </div>
  `,
})
export class MultiSelectBasicExample {
  tags = tags;
  selected = ['angular', 'docs'];
}

@Component({
  standalone: true,
  imports: [AvCheckbox, FormsModule],
  styles: [formStyles],
  template: `
    <div class="field-stack">
      <av-checkbox
        label="Receber novidades"
        [(ngModel)]="checked"
      />
      <span class="state-line">{{ checked ? 'Marcado' : 'Desmarcado' }}</span>
    </div>
  `,
})
export class CheckboxBasicExample {
  checked = true;
}

@Component({
  standalone: true,
  imports: [AvSwitch],
  template: `
    <av-switch [checked]="true" />
  `,
})
export class SwitchCompactExample {}

@Component({
  standalone: true,
  imports: [AvSlider],
  styles: [formStyles],
  template: `
    <av-slider
      class="field-demo"
      label="Progresso"
      [value]="64"
      [showValue]="true"
      valueSuffix="%"
    />
  `,
})
export class SliderBasicExample {}

@Component({
  standalone: true,
  imports: [AvSlider],
  styles: [formStyles],
  template: `
    <av-slider
      class="field-demo"
      label="Faixa"
      [range]="true"
      [value]="value"
      [showValue]="true"
      valueSuffix="%"
    />
  `,
})
export class SliderRangeExample {
  value: [number, number] = [24, 76];
}

@Component({
  standalone: true,
  imports: [AvCurrencyInput, FormsModule],
  styles: [formStyles],
  template: `
    <av-currency-input
      class="field-demo"
      label="Valor"
      [(ngModel)]="value"
    />
  `,
})
export class CurrencyInputBasicExample {
  value = 1299.9;
}

@Component({
  standalone: true,
  imports: [AvDateTimePicker, FormsModule],
  styles: [formStyles],
  template: `
    <av-date-time-picker
      class="field-demo"
      label="Agenda"
      mode="datetime"
      [(ngModel)]="value"
    />
  `,
})
export class DateTimePickerBasicExample {
  value = new Date(2026, 8, 17, 14, 30).toISOString();
}

@Component({
  standalone: true,
  imports: [AvFileUpload],
  styles: [formStyles],
  template: `
    <av-file-upload
      class="field-demo"
      label="Anexo"
      helper="PDF, PNG ou JPG ate 10 MB"
      accept=".pdf,.png,.jpg"
    />
  `,
})
export class FileUploadBasicExample {}

@Component({
  standalone: true,
  imports: [AvForm, AvInput, AvTextArea],
  styles: [formStyles],
  template: `
    <form av-form class="field-stack">
      <av-input label="Titulo" placeholder="Nome do componente" />
      <av-text-area label="Resumo" placeholder="O que este componente resolve?" />
    </form>
  `,
})
export class FormBasicExample {}
