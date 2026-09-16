import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: { title: 'Visão geral' },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'overview' },
      { path: 'overview', data: { title: 'Visão geral' } },
      {
        path: 'foundations',
        data: { title: 'Fundamentos' },
        children: [
          { path: 'colors', data: { title: 'Cores' } },
          { path: 'typography', data: { title: 'Tipografia' } },
          { path: 'spacing', data: { title: 'Espaçamento' } },
        ],
      },
      {
        path: 'components',
        data: { title: 'Componentes' },
        children: [
          { path: 'base', data: { title: 'Base' } },
          { path: 'form', data: { title: 'Formulários' } },
          { path: 'feedback', data: { title: 'Feedback' } },
          { path: 'layout', data: { title: 'Layout' } },
          { path: 'navigation', data: { title: 'Navegação' } },
        ],
      },
      { path: 'guides', data: { title: 'Guias' } },
    ],
  },
  { path: '**', redirectTo: 'overview' },
];
