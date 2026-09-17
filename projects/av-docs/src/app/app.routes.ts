import { Routes } from '@angular/router';
import { NavigationPage } from './modules/components/navigation/navigation.page';
import { SpacingPage } from './modules/foundations/spacing/spacing.page';
import { TypographyPage } from './modules/foundations/typography/typography.page';
import { ColorsPage } from './modules/foundations/colors/colors.page';
import { OverviewPage } from './modules/overview/overview.page';
import { ComponentDocsPage } from './modules/components/component-docs/component-docs.page';

export const routes: Routes = [
  {
    path: '',
    data: { title: 'Visão geral' },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'overview' },

      { path: 'overview', data: { title: 'Visão geral' }, component: OverviewPage },

      {
        path: 'foundations',
        data: { title: 'Fundamentos' },
        children: [
          { path: 'colors', data: { title: 'Cores' }, component: ColorsPage },
          { path: 'typography', data: { title: 'Tipografia' }, component: TypographyPage },
          { path: 'spacing', data: { title: 'Espaçamento' }, component: SpacingPage },
        ],
      },

      {
        path: 'components',
        data: { title: 'Componentes' },
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'button' },
          { path: ':component', data: { title: 'Componente' }, component: ComponentDocsPage },
        ],
      },

      { path: 'guides', data: { title: 'Guias' }, component: NavigationPage },
    ],
  },
  { path: '**', redirectTo: 'overview' },
];
