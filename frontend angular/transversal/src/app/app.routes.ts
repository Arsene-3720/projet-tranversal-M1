import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },

  // publiques
  { path: 'citoyens', loadComponent: () => import('./pages/citoyens-list/citoyens-list.component').then(m => m.CitoyensListComponent) },

  // protégées (exemples)
  { path: 'alerts', canActivate: [AuthGuard], loadComponent: () => import('./pages/alerts/alerts.component').then(m => m.AlertsComponent) },
  { path: '', pathMatch: 'full', redirectTo: 'citoyens' },
  { path: '**', redirectTo: 'citoyens' },
  { path: 'alerts', loadComponent: () => import('./pages/alerts/alerts.component').then(m => m.AlertsComponent) }
];
