import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';

import { CuentasService } from '../../servicios/cuentas/cuentas.service';
import { LoginService } from '../../servicios/login/login.service'; // Ruta según tu estructura

@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './crear-cuenta.component.html',
})
export class CrearCuentaComponent {
  cuentaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cuentasService: CuentasService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.cuentaForm = this.fb.group({
      nombreCuenta: ['', Validators.required],
      tipoCuenta: ['', Validators.required],
    });
  }

  crearCuenta(): void {
    const emailUsuario = this.loginService.getUserEmail();

    if (!emailUsuario) {
      console.error('Usuario no autenticado');
      alert('No se ha detectado ningún usuario logueado');
      return;
    }

    const cuenta = {
      nombreCuenta: this.cuentaForm.value.nombreCuenta,
      tipoCuenta: this.cuentaForm.value.tipoCuenta,
      dineroCuenta: 0,
      ibanCuenta: this.generarIBAN(),
      emailUsuario,
    };

    this.cuentasService.crearCuenta(cuenta).subscribe({
      next: () => {
        console.log('Cuenta creada con éxito');
        this.router.navigate(['/cuentas']);
      },
      error: (err) => {
        console.error('Error al crear cuenta', err);
        alert('Hubo un error al crear la cuenta.');
      }
    });
  }

  generarIBAN(): string {
    const randomDigits = () => Math.floor(1000 + Math.random() * 9000);
    return `ES${randomDigits()}${randomDigits()}${randomDigits()}${randomDigits()}`;
  }
}
