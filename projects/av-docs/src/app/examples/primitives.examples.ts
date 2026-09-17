import { Component, signal } from '@angular/core';
import { AvBadge, AvButton, AvCluster, AvDivider, AvInline, AvStack, AvText } from 'angular-visuals';

const boxStyles = `
  .demo-box {
    border: 1px solid var(--av-color-border-soft);
    border-radius: var(--av-radius-sm);
    background: var(--av-color-surface);
    color: var(--av-color-text);
    padding: 0.75rem 1rem;
    min-width: 4.5rem;
    text-align: center;
  }

  .demo-panel {
    width: min(100%, 24rem);
  }
`;

@Component({
  standalone: true,
  imports: [AvText, AvButton],
  styles: [boxStyles],
  template: `
    <div class="demo-panel">
      <div class="demo-box">
        <av-text [value]="label()" animation="slide" />
      </div>

      <button av-button type="button" (click)="toggle()" style="margin-top: 1rem">
        Alterar texto
      </button>
    </div>
  `,
})
export class TextAnimatedExample {
  label = signal('Pronto');

  toggle(): void {
    this.label.update((value) => value === 'Pronto' ? 'Atualizado' : 'Pronto');
  }
}

@Component({
  standalone: true,
  imports: [AvStack],
  styles: [boxStyles],
  template: `
    <av-stack [gap]="3" class="demo-panel">
      <div class="demo-box">Header</div>
      <div class="demo-box">Content</div>
      <div class="demo-box">Footer</div>
    </av-stack>
  `,
})
export class StackExample {}

@Component({
  standalone: true,
  imports: [AvInline, AvBadge],
  styles: [boxStyles],
  template: `
    <av-inline [gap]="3">
      <span av-badge variant="orange">Alpha</span>
      <span av-badge variant="blue">Beta</span>
      <span av-badge variant="green">Stable</span>
    </av-inline>
  `,
})
export class InlineExample {}

@Component({
  standalone: true,
  imports: [AvCluster, AvButton],
  styles: [boxStyles],
  template: `
    <av-cluster [gap]="3">
      <button av-button variant="orange">Salvar</button>
      <button av-button variant="blue">Duplicar</button>
      <button av-button variant="slate">Cancelar</button>
    </av-cluster>
  `,
})
export class ClusterExample {}

@Component({
  standalone: true,
  imports: [AvDivider],
  styles: [`
    .divider-demo {
      display: grid;
      gap: 1rem;
      width: min(100%, 22rem);
      color: var(--av-color-text);
    }
  `],
  template: `
    <div class="divider-demo">
      <span>Acima</span>
      <lib-av-divider variant="orange"></lib-av-divider>
      <span>Abaixo</span>
    </div>
  `,
})
export class DividerExample {}
