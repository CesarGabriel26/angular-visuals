import { Component } from '@angular/core';
import { AvDropdown, AvNavLink, AvSidenav, AvStep, AvStepper, AvTab, AvTabs } from 'angular-visuals';

const navStyles = `
  .nav-demo {
    width: min(100%, 34rem);
  }

  .demo-copy {
    color: var(--av-color-text-muted);
    line-height: 1.5;
    margin: 0;
  }

  .sidenav-frame {
    width: min(100%, 28rem);
    height: 18rem;
    border: 1px solid var(--av-color-border-soft);
    border-radius: var(--av-radius-md);
    overflow: hidden;
  }

  .sidenav-brand {
    color: var(--av-color-text);
    font-weight: 800;
  }
`;

@Component({
  standalone: true,
  imports: [AvTabs, AvTab],
  styles: [navStyles],
  template: `
    <av-tabs class="nav-demo">
      <av-tab title="Preview" icon="search">
        <p class="demo-copy">Conteudo da primeira aba.</p>
      </av-tab>

      <av-tab title="Code" icon="code">
        <p class="demo-copy">Conteudo da segunda aba.</p>
      </av-tab>
    </av-tabs>
  `,
})
export class TabsBasicExample {}

@Component({
  standalone: true,
  imports: [AvTabs, AvTab],
  styles: [navStyles],
  template: `
    <av-tabs class="nav-demo">
      <av-tab title="Ativo">
        <p class="demo-copy">Tab disponivel.</p>
      </av-tab>

      <av-tab title="Disabled" [disabled]="true">
        <p class="demo-copy">Tab desabilitada.</p>
      </av-tab>
    </av-tabs>
  `,
})
export class TabBasicExample {}

@Component({
  standalone: true,
  imports: [AvStepper, AvStep],
  styles: [navStyles],
  template: `
    <av-stepper class="nav-demo" [currentStep]="1" [canSetStep]="true">
      <av-step title="Conta" icon="check">
        <p class="demo-copy">Dados da conta.</p>
      </av-step>

      <av-step title="Perfil">
        <p class="demo-copy">Preferencias do perfil.</p>
      </av-step>

      <av-step title="Publicar">
        <p class="demo-copy">Revisao final.</p>
      </av-step>
    </av-stepper>
  `,
})
export class StepperBasicExample {}

@Component({
  standalone: true,
  imports: [AvStepper, AvStep],
  styles: [navStyles],
  template: `
    <av-stepper class="nav-demo" [currentStep]="2">
      <av-step title="Upload" icon="check"></av-step>
      <av-step title="Validacao" icon="check"></av-step>
      <av-step title="Erro" [hasError]="true"></av-step>
    </av-stepper>
  `,
})
export class StepBasicExample {}

@Component({
  standalone: true,
  imports: [AvNavLink],
  styles: [navStyles],
  template: `
    <div class="nav-demo">
      <av-nav-link
        icon="search"
        label="Componentes"
        description="Lista de componentes"
        badge="New"
        [active]="true"
      />
    </div>
  `,
})
export class NavLinkBasicExample {}

@Component({
  standalone: true,
  imports: [AvDropdown, AvNavLink],
  styles: [navStyles],
  template: `
    <av-dropdown class="nav-demo" label="Componentes" icon="menu" [expanded]="true">
      <av-nav-link label="Button" description="button[av-button]" />
      <av-nav-link label="Select" description="av-select" badge="New" />
      <av-nav-link label="Table" description="av-table" />
    </av-dropdown>
  `,
})
export class DropdownBasicExample {}

@Component({
  standalone: true,
  imports: [AvSidenav, AvNavLink],
  styles: [navStyles],
  template: `
    <div class="sidenav-frame">
      <av-sidenav [width]="'14rem'">
        <div header class="sidenav-brand">Docs</div>

        <div content>
          <av-nav-link label="Overview" icon="search" [active]="true" />
          <av-nav-link label="Components" icon="menu" />
          <av-nav-link label="Settings" icon="schedule" />
        </div>

        <div footer>
          <span class="demo-copy">v0.1.0</span>
        </div>
      </av-sidenav>
    </div>
  `,
})
export class SidenavBasicExample {}
