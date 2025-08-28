# Angular mini‑app

Pequeño proyecto Angular con:
- `app.component` que calcula **suma** y **promedio** de dos edades, con **Calcular** y **Limpiar**.
- Clase `Usuario` (nombre, clave).
- Componentes: `login`, `bienvenido`, `error`.
- Ruteo básico: `/login`, `/bienvenido`, `/error`. Inicio en `/login`.

> Probado como estructura mínima sobre Angular 16+. Si usás otra versión, cambiá el `standalone`/módulos según tu setup. Abajo te dejo **con módulos clásicos** (no standalone) porque es lo más pedido en cursadas.

---

## Estructura de archivos
```
src/
  app/
    models/
      usuario.ts
    components/
      bienvenido/
        bienvenido.component.ts
        bienvenido.component.html
        bienvenido.component.css
      login/
        login.component.ts
        login.component.html
        login.component.css
      error/
        error.component.ts
        error.component.html
        error.component.css
    app-routing.module.ts
    app.module.ts
    app.component.ts
    app.component.html
    app.component.css
  main.ts
```

---

## Código

### `src/app/models/usuario.ts`
```ts
export class Usuario {
  constructor(
    public nombre: string = '',
    public clave: string = ''
  ) {}
}
```

### `src/app/components/bienvenido/bienvenido.component.ts`
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent {}
```

### `src/app/components/bienvenido/bienvenido.component.html`
```html
<section class="card">
  <h1>¡Bienvenido/a! 🎉</h1>
  <p>Ingresaste correctamente.</p>
  <a routerLink="/login">Volver al login</a>
</section>
```

### `src/app/components/bienvenido/bienvenido.component.css`
```css
.card{max-width:480px;margin:24px auto;padding:16px;border:1px solid #ddd;border-radius:12px}
h1{margin:0 0 8px}
```

### `src/app/components/error/error.component.ts`
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {}
```

### `src/app/components/error/error.component.html`
```html
<section class="card error">
  <h1>Error</h1>
  <p>Usuario o clave incorrectos.</p>
  <a routerLink="/login">Volver a intentar</a>
</section>
```

### `src/app/components/error/error.component.css`
```css
.card{max-width:480px;margin:24px auto;padding:16px;border:1px solid #f4c7c7;border-radius:12px;background:#fff5f5}
h1{color:#b10000;margin:0 0 8px}
```

### `src/app/components/login/login.component.ts`
```ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: Usuario = new Usuario();
  mostrandoPass = false;

  // Demo simple: credenciales fijas
  private validUser = new Usuario('admin', '1234');

  constructor(private router: Router) {}

  login() {
    const ok =
      this.usuario.nombre === this.validUser.nombre &&
      this.usuario.clave === this.validUser.clave;

    if (ok) {
      this.router.navigate(['/bienvenido']);
    } else {
      this.router.navigate(['/error']);
    }
  }

  limpiar() {
    this.usuario = new Usuario();
  }
}
```

### `src/app/components/login/login.component.html`
```html
<section class="card">
  <h1>Login</h1>

  <label>Usuario</label>
  <input [(ngModel)]="usuario.nombre" placeholder="Usuario" />

  <label>Clave</label>
  <div class="pass-row">
    <input [type]="mostrandoPass ? 'text' : 'password'" [(ngModel)]="usuario.clave" placeholder="Clave" />
    <button type="button" (click)="mostrandoPass = !mostrandoPass">{{ mostrandoPass ? '🙈' : '👁️' }}</button>
  </div>

  <div class="buttons">
    <button (click)="login()">Ingresar</button>
    <button class="secondary" (click)="limpiar()">Limpiar</button>
  </div>

  <small>Tip: usuario <b>admin</b> / clave <b>1234</b></small>
</section>
```

### `src/app/components/login/login.component.css`
```css
.card{max-width:480px;margin:24px auto;padding:16px;border:1px solid #ddd;border-radius:12px;display:flex;flex-direction:column;gap:8px}
label{font-weight:600}
input{padding:8px;border:1px solid #ccc;border-radius:8px}
.pass-row{display:flex;gap:8px;align-items:center}
.pass-row button{padding:8px 10px}
.buttons{display:flex;gap:8px;margin-top:8px}
button{padding:8px 12px;border-radius:8px;border:1px solid #aaa;background:#f7f7f7;cursor:pointer}
button.secondary{background:#fff}
```

---

## Parte 1: `app.component` (edades)

### `src/app/app.component.ts`
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  edadUno: number | null = null;
  edadDos: number | null = null;

  suma: number | null = null;
  promedio: number | null = null;

  calcular() {
    const e1 = Number(this.edadUno);
    const e2 = Number(this.edadDos);

    if (Number.isFinite(e1) && Number.isFinite(e2)) {
      this.suma = e1 + e2;
      this.promedio = (e1 + e2) / 2;
    } else {
      this.suma = null;
      this.promedio = null;
    }
  }

  limpiar() {
    this.edadUno = null;
    this.edadDos = null;
    this.suma = null;
    this.promedio = null;
  }
}
```

### `src/app/app.component.html`
```html
<nav class="topbar">
  <a routerLink="/login" routerLinkActive="active">Login</a>
  <a routerLink="/bienvenido" routerLinkActive="active">Bienvenido</a>
  <a routerLink="/error" routerLinkActive="active">Error</a>
</nav>

<section class="card">
  <h1>Calculadora de Edades</h1>

  <label>Edad Uno</label>
  <input type="number" [(ngModel)]="edadUno" placeholder="Edad Uno" />

  <label>Edad Dos</label>
  <input type="number" [(ngModel)]="edadDos" placeholder="Edad Dos" />

  <div class="buttons">
    <button (click)="calcular()">Calcular</button>
    <button class="secondary" (click)="limpiar()">Limpiar cuadros de textos</button>
  </div>
</section>

<section class="card outputs">
  <label>Suma</label>
  <input type="text" [value]="suma ?? ''" readonly />

  <label>Promedio</label>
  <input type="text" [value]="promedio ?? ''" readonly />
</section>

<router-outlet></router-outlet>
```

### `src/app/app.component.css`
```css
.topbar{display:flex;gap:12px;padding:12px;border-bottom:1px solid #eee}
.topbar a{padding:6px 10px;border-radius:8px;text-decoration:none;color:#333}
.topbar a.active{background:#efefef}
.card{max-width:520px;margin:18px auto;padding:16px;border:1px solid #ddd;border-radius:12px;display:flex;flex-direction:column;gap:8px}
.buttons{display:flex;gap:8px}
button{padding:8px 12px;border-radius:8px;border:1px solid #aaa;background:#f7f7f7;cursor:pointer}
button.secondary{background:#fff}
.outputs input[readonly]{background:#fafafa}
```

---

## Ruteo y módulo

### `src/app/app-routing.module.ts`
```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'bienvenido', component: BienvenidoComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

### `src/app/app.module.ts`
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    LoginComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### `src/main.ts` (Angular con módulos)
```ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

---

## Comandos útiles
```bash
# crear proyecto (si no lo tenés)
ng new edades-login-app --routing=false --style=css
cd edades-login-app

# crear componentes
ng g c components/bienvenido
ng g c components/login
ng g c components/error

# (opcional) crear carpeta de modelos
mkdir -p src/app/models
# luego crear src/app/models/usuario.ts como arriba

# correr
ng serve -o
```

---

## Notas
- Para evaluación en cátedra: el punto 1 (suma/promedio) está en `app.component` con **dos inputs de entrada** y **dos de salida (readonly)**, y botones **Calcular** / **Limpiar**.
- El punto 2 deja listos los componentes y el ruteo. El `login` usa un check súper simple (admin/1234) y navega a `bienvenido` o `error`.
- Si preferís **standalone components** o **Reactive Forms**, avisame y te lo reescribo.

