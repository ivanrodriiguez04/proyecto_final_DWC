import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentasService } from '../../servicios/cuentas/cuentas.service';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../servicios/login/login.service';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-cuentas',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    ConfirmDialogComponent,
  ],
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {
  cuentas: any[] = [];
  emailUsuario: string | null = null;

  constructor(
    private cuentasService: CuentasService,
    private router: Router,
    private loginService: LoginService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loginService.user$.subscribe(user => {
      this.emailUsuario = user.email;
      if (this.emailUsuario) {
        this.cargarCuentas();
      }
    });
  }

  cargarCuentas(): void {
    if (this.emailUsuario) {
      this.cuentasService.obtenerCuentasPorEmail(this.emailUsuario).subscribe({
        next: (cuentas) => this.cuentas = cuentas,
        error: (err) => console.error('Error al obtener cuentas', err),
      });
    }
  }

  eliminarCuenta(idCuenta: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: '¿Eliminar cuenta?',
        message: '¿Estás seguro de que deseas eliminar esta cuenta?',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.cuentasService.eliminarCuenta(idCuenta).subscribe({
          next: () => this.cargarCuentas(),
          error: (err) => console.error('Error al eliminar cuenta', err),
        });
      }
    });
  }
}
