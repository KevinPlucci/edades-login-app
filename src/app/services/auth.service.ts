import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

const USERS_KEY = 'usuarios';
const SESSION_KEY = 'usuario_actual';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readUsers(): Usuario[] {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  }
  private writeUsers(users: Usuario[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  registrar(user: Usuario): { ok: boolean; msg: string } {
    const users = this.readUsers();
    const existe = users.some(
      (u) => u.nombre.toLowerCase() === user.nombre.toLowerCase()
    );
    if (existe) return { ok: false, msg: 'El usuario ya existe' };
    users.push(user);
    this.writeUsers(users);
    return { ok: true, msg: 'Registrado con éxito' };
  }

  login(cred: Usuario): { ok: boolean; msg: string } {
    const users = this.readUsers();
    const match = users.find(
      (u) => u.nombre === cred.nombre && u.clave === cred.clave
    );
    if (!match) return { ok: false, msg: 'Usuario o clave incorrectos' };
    localStorage.setItem(SESSION_KEY, JSON.stringify(match));
    return { ok: true, msg: 'Login OK' };
  }

  logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  usuarioActual(): Usuario | null {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Usuario) : null;
  }

  estaLogueado(): boolean {
    return !!this.usuarioActual();
  }
}
