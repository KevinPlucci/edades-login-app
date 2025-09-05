import { LoginComponent } from './components/login/login';
import { BienvenidoComponent } from './components/bienvenido/bienvenido';
import { ErrorComponent } from './components/error/error';
import { authGuard } from './guards/auth.guard';
import { RegistroComponent } from './components/registro/registro';

export const routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'registro', component: RegistroComponent, title: 'Registro' },
  {
    path: 'bienvenido',
    component: BienvenidoComponent,
    canActivate: [authGuard],
    title: 'Bienvenido',
  },
  { path: 'error', component: ErrorComponent, title: 'Error' },
  { path: '**', redirectTo: 'error' },
];
