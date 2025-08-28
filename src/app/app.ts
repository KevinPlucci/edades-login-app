import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
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
      this.suma = this.promedio = null;
    }
  }
  limpiar() {
    this.edadUno = this.edadDos = this.suma = this.promedio = null;
  }
}
