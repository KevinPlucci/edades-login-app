import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { BienvenidoComponent } from './components/bienvenido/bienvenido';
import { ErrorComponent } from './components/error/error';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'bienvenido', component: BienvenidoComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: 'login' },
];
