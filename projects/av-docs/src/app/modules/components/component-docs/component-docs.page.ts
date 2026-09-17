import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { AvBadge } from 'angular-visuals';
import { ExampleCardComponent } from '../../../components/example-card/example-card';
import type { ComponentCategory, ComponentDoc } from '../../../types/component';
import {
  COMPONENT_DOCS,
  COMPONENT_DOC_LIST,
  type ComponentDocSlug,
} from '../../../registry';

function isComponentDocSlug(slug: string): slug is ComponentDocSlug {
  return slug in COMPONENT_DOCS;
}

@Component({
  standalone: true,
  imports: [AvBadge, RouterLink, ExampleCardComponent],
  selector: 'app-component-docs.page',
  styleUrl: './component-docs.page.css',
  templateUrl: './component-docs.page.html',
})
export class ComponentDocsPage {
  private readonly route = inject(ActivatedRoute);

  readonly docs = COMPONENT_DOC_LIST;

  readonly componentSlug = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('component') ?? 'button')
    ),
    {
      initialValue: this.route.snapshot.paramMap.get('component') ?? 'button',
    }
  );

  readonly doc = computed<ComponentDoc | undefined>(() => {
    const slug = this.componentSlug();

    return isComponentDocSlug(slug)
      ? COMPONENT_DOCS[slug]
      : undefined;
  });

  private readonly categoryLabels: Record<ComponentCategory, string> = {
    base: 'Base',
    forms: 'Formularios',
    feedback: 'Feedback',
    layout: 'Layout',
    navigation: 'Navegacao',
    overlay: 'Overlay',
    data: 'Data',
  };

  private readonly categoryVariants: Record<ComponentCategory, string> = {
    base: 'orange',
    forms: 'blue',
    feedback: 'green',
    layout: 'purple',
    navigation: 'slate',
    overlay: 'red',
    data: 'green',
  };

  categoryLabel(category: ComponentCategory): string {
    return this.categoryLabels[category];
  }

  categoryVariant(category: ComponentCategory): string {
    return this.categoryVariants[category];
  }
}
