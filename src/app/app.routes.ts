import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing';
import { LoginComponent } from './login/login';
import { SignupComponent } from './signup/signup';
import { AdminComponent } from './admin/admin';
import { ClaimComponent } from './claim/claim';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'claim/:token', component: ClaimComponent },
  { path: '**', redirectTo: '' }
];
