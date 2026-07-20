import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing';
import { AdminComponent } from './admin/admin';
import { ClaimComponent } from './claim/claim';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'claim/:token', component: ClaimComponent },
  { path: '**', redirectTo: '' }
];
