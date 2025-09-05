import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css'],
})
export class RegistroComponent {
  datos: Usuario = { nombre: '', clave: '' };
  msg = '';

  constructor(private auth: AuthService, private router: Router) {}

  registrar() {
    const res = this.auth.registrar(this.datos);
    this.msg = res.msg;
    if (res.ok) setTimeout(() => this.router.navigate(['/login']), 800);
  }

  limpiar() {
    this.datos = { nombre: '', clave: '' };
    this.msg = '';
  }
}
