import { Routes } from '@angular/router';
import { LandingComponent } from './landing';
import { AdminComponent } from './admin';
import { ClaimComponent } from './claim';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'claim/:token', component: ClaimComponent },
  { path: '**', redirectTo: '' }
];
