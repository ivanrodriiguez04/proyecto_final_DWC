import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CuentasService } from '../../servicios/cuentas/cuentas.service';
import { LoginService } from '../../servicios/login/login.service';

@Component({
  selector: 'app-cuentas',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule, RouterModule],
  templateUrl: './cuentas.component.html',
})
export class CuentasComponent implements OnInit {
  cuentas: any[] = [];

  constructor(
    private cuentasService: CuentasService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
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
}
