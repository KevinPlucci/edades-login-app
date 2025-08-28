import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  usuario = { nombre: '', clave: '' };
  mostrandoPass = false;

  private validUser = { nombre: 'admin', clave: '1234' };

  constructor(private router: Router) {}

  login() {
    const ok =
      this.usuario.nombre === this.validUser.nombre &&
      this.usuario.clave === this.validUser.clave;
    this.router.navigate([ok ? '/bienvenido' : '/error']);
  }

  limpiar() {
    this.usuario = { nombre: '', clave: '' };
  }
}
