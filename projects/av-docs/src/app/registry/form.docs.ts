import type { ComponentDoc } from '../types/component';
import {
  CheckboxBasicExample,
  CurrencyInputBasicExample,
  DateTimePickerBasicExample,
  FileUploadBasicExample,
  FormBasicExample,
  InputBasicExample,
  MultiSelectBasicExample,
  SelectBasicExample,
  SliderBasicExample,
  SliderRangeExample,
  TextAreaBasicExample,
} from '../examples/form.examples';

export const INPUT_DOC: ComponentDoc = {
  name: 'Input',
  tag: 'av-input',
  category: 'forms',
  description: 'Campo de texto com label, icone, loading e mensagens de erro.',
  examples: [
    {
      id: 'basic',
      title: 'Basico',
      component: InputBasicExample,
      code: `
<av-input
  label="Nome"
  icon="search"
  placeholder="Buscar componente"
/>
      `.trim(),
      size: 'lg',
    },
  ],
  api: {
    inputs: [
      { name: 'label', type: 'string' },
      { name: 'placeholder', type: 'string', default: "''" },
      { name: 'type', type: 'string', default: "'text'" },
      { name: 'icon', type: 'string' },
      { name: 'loading', type: 'boolean', default: 'false' },
      { name: 'variant', type: 'string', default: 'defaultVariant' },
      { name: 'errorMessage', type: 'string', default: "''" },
    ],
  },
};

export const TEXT_AREA_DOC: ComponentDoc = {
  name: 'TextArea',
  tag: 'av-text-area',
  category: 'forms',
  description: 'Campo multilinha para textos longos.',
  examples: [
    {
      id: 'basic',
      title: 'Basico',
      component: TextAreaBasicExample,
      code: `
<av-text-area
  label="Descricao"
  placeholder="Escreva uma descricao curta"
/>
      `.trim(),
      size: 'lg',
    },
  ],
  api: {
    inputs: [
      { name: 'label', type: 'string' },
      { name: 'placeholder', type: 'string', default: "''" },
      { name: 'icon', type: 'string' },
      { name: 'loading', type: 'boolean', default: 'false' },
      { name: 'variant', type: 'string', default: 'defaultVariant' },
      { name: 'errorMessage', type: 'string', default: "''" },
    ],
  },
};

export const SELECT_DOC: ComponentDoc = {
  name: 'Select',
  tag: 'av-select',
  category: 'forms',
  description: 'Select com busca opcional, overlay e suporte a ControlValueAccessor.',
  examples: [
    {
      id: 'basic',
      title: 'Basico',
      component: SelectBasicExample,
      code: `
<av-select
  label="Pais"
  [data]="countries"
  [searchable]="false"
  value="br"
/>
      `.trim(),
      size: 'lg',
    },
  ],
  api: {
    inputs: [
      { name: 'data', type: 'any[]', description: 'Lista de opcoes.' },
      { name: 'labelKey', type: 'string', default: "'label'" },
      { name: 'valueKey', type: 'string', default: "'value'" },
      { name: 'placeholder', type: 'string', default: "'Selecione uma opcao'" },
      { name: 'searchable', type: 'boolean', default: 'true' },
      { name: 'value', type: 'any', default: 'null' },
    ],
    outputs: [
      { name: 'valueChange', type: 'any' },
    ],
  },
};

export const MULTI_SELECT_DOC: ComponentDoc = {
  name: 'MultiSelect',
  tag: 'av-multi-select, av-multiselect',
  category: 'forms',
  description: 'Selecao multipla com chips, busca e suporte a Angular Forms.',
  examples: [
    {
      id: 'basic',
      title: 'Com chips',
      component: MultiSelectBasicExample,
      code: `
<av-multi-select
  label="Tags"
  [data]="tags"
  [(ngModel)]="selected"
/>
      `.trim(),
      size: 'lg',
    },
  ],
  api: {
    inputs: [
      { name: 'data', type: 'any[]', description: 'Lista de opcoes.' },
      { name: 'labelKey', type: 'string', default: "'label'" },
      { name: 'valueKey', type: 'string', default: "'value'" },
      { name: 'searchable', type: 'boolean', default: 'true' },
      { name: 'placeholder', type: 'string', default: "'Selecione as opcoes'" },
    ],
    outputs: [
      { name: 'valueChange', type: 'any[]' },
    ],
  },
};

export const CHECKBOX_DOC: ComponentDoc = {
  name: 'Checkbox',
  tag: 'av-checkbox',
  category: 'forms',
  description: 'Controle booleano com label, icone e integracao com forms.',
  examples: [
    {
      id: 'basic',
      title: 'Basico',
      component: CheckboxBasicExample,
      code: `
<av-checkbox
  label="Receber novidades"
  [(ngModel)]="checked"
/>
      `.trim(),
      size: 'lg',
    },
  ],
  api: {
    inputs: [
      { name: 'label', type: 'string', default: "''" },
      { name: 'icon', type: 'string', default: "'check'" },
      { name: 'variant', type: 'string', default: 'defaultVariant' },
      { name: 'rounded', type: "number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'md'" },
    ],
    outputs: [
      { name: 'valueChange', type: 'boolean' },
      { name: 'changed', type: 'boolean' },
    ],
  },
};

export const SLIDER_DOC: ComponentDoc = {
  name: 'Slider',
  tag: 'av-slider',
  category: 'forms',
  description: 'Controle numerico com modo simples ou range.',
  examples: [
    {
      id: 'basic',
      title: 'Valor unico',
      component: SliderBasicExample,
      code: `
<av-slider
  label="Progresso"
  [value]="64"
  [showValue]="true"
  valueSuffix="%"
/>
      `.trim(),
      size: 'lg',
    },
    {
      id: 'range',
      title: 'Range',
      component: SliderRangeExample,
      code: `
<av-slider
  label="Faixa"
  [range]="true"
  [value]="[24, 76]"
  [showValue]="true"
  valueSuffix="%"
/>
      `.trim(),
      size: 'lg',
    },
  ],
  api: {
    inputs: [
      { name: 'value', type: 'number | [number, number] | string | null' },
      { name: 'min', type: 'number', default: '0' },
      { name: 'max', type: 'number', default: '100' },
      { name: 'step', type: 'number', default: '1' },
      { name: 'range', type: 'boolean', default: 'false' },
      { name: 'showValue', type: 'boolean', default: 'false' },
    ],
    outputs: [
      { name: 'valueChange', type: 'number | [number, number]' },
      { name: 'changed', type: 'number | [number, number]' },
    ],
  },
};

export const CURRENCY_INPUT_DOC: ComponentDoc = {
  name: 'CurrencyInput',
  tag: 'av-currency-input',
  category: 'forms',
  description: 'Input monetario com formatacao por locale.',
  examples: [
    {
      id: 'basic',
      title: 'BRL',
      component: CurrencyInputBasicExample,
      code: `
<av-currency-input
  label="Valor"
  [(ngModel)]="value"
/>
      `.trim(),
      size: 'lg',
    },
  ],
  api: {
    inputs: [
      { name: 'label', type: 'string', default: "''" },
      { name: 'currencySymbol', type: 'string', default: "'R$'" },
      { name: 'locale', type: 'string', default: "'pt-BR'" },
      { name: 'currencyCode', type: 'string', default: "'BRL'" },
      { name: 'placeholder', type: 'string', default: "'0,00'" },
    ],
  },
};

export const DATE_TIME_PICKER_DOC: ComponentDoc = {
  name: 'DateTimePicker',
  tag: 'av-date-time-picker, av-date-picker',
  category: 'forms',
  description: 'Picker de data, hora ou data e hora usando overlay.',
  examples: [
    {
      id: 'basic',
      title: 'Data e hora',
      component: DateTimePickerBasicExample,
      code: `
<av-date-time-picker
  label="Agenda"
  mode="datetime"
  [(ngModel)]="value"
/>
      `.trim(),
      size: 'lg',
    },
  ],
  api: {
    inputs: [
      { name: 'mode', type: "'date' | 'time' | 'datetime'", default: "'datetime'" },
      { name: 'label', type: 'string', default: "''" },
      { name: 'placeholder', type: 'string', default: "'Selecione...'" },
      { name: 'locale', type: 'string', default: "'pt-BR'" },
      { name: 'variant', type: 'string', default: 'defaultVariant' },
    ],
  },
};

export const FILE_UPLOAD_DOC: ComponentDoc = {
  name: 'FileUpload',
  tag: 'av-file-upload',
  category: 'forms',
  description: 'Campo de upload com dropzone, lista de arquivos e validacao visual.',
  examples: [
    {
      id: 'basic',
      title: 'Dropzone',
      component: FileUploadBasicExample,
      code: `
<av-file-upload
  label="Anexo"
  helper="PDF, PNG ou JPG ate 10 MB"
  accept=".pdf,.png,.jpg"
/>
      `.trim(),
      size: 'lg',
    },
  ],
  api: {
    inputs: [
      { name: 'label', type: 'string', default: "''" },
      { name: 'helper', type: 'string', default: "''" },
      { name: 'accept', type: 'string', default: "''" },
      { name: 'multiple', type: 'boolean', default: 'false' },
      { name: 'clearable', type: 'boolean', default: 'true' },
      { name: 'showList', type: 'boolean', default: 'true' },
    ],
  },
};

export const FORM_DOC: ComponentDoc = {
  name: 'Form',
  tag: 'form[av-form]',
  category: 'forms',
  description: 'Wrapper visual para formularios da biblioteca.',
  examples: [
    {
      id: 'basic',
      title: 'Formulario',
      component: FormBasicExample,
      code: `
<form av-form>
  <av-input label="Titulo" />
  <av-text-area label="Resumo" />
</form>
      `.trim(),
      size: 'lg',
    },
  ],
  api: {
    inputs: [
      { name: 'glass', type: 'boolean', default: 'false' },
    ],
  },
};
