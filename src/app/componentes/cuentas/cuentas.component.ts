import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentasService } from '../../servicios/cuentas/cuentas.service';
import { LoginService } from '../../servicios/login/login.service';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cuentas',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {
  cuentas: any[] = [];

  constructor(
    private cuentasService: CuentasService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.cargarCuentas();
  }

  cargarCuentas(): void {
    const email = this.loginService.getUserEmail();
    if (!email) {
      console.error('No se encontró el correo del usuario logueado.');
      return;
    }

    this.cuentasService.obtenerCuentasPorEmail(email).subscribe({
      next: (data) => this.cuentas = data,
      error: (err) => console.error('Error al obtener cuentas', err),
    });
  }

  eliminarCuenta(idCuenta: number): void {
    this.cuentasService.eliminarCuenta(idCuenta).subscribe({
      next: () => this.cargarCuentas(),
      error: (err) => console.error('Error al eliminar cuenta', err),
    });
  }
}
