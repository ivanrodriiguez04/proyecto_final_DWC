import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContraseñaService } from '../../servicios/recuperar/contraseña.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-recuperar-password',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './recuperar-password.component.html',
  styleUrl: './recuperar-password.component.css'
})
export class RecuperarPasswordComponent {
  recuperarForm: FormGroup;
  mensaje: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private contraseñaservice: ContraseñaService, private router: Router) {
    this.recuperarForm = this.fb.group({
      emailUsuario: ['', [Validators.required, Validators.email]]
    });
  }

  enviarCorreo() {
    if (this.recuperarForm.valid) {
      this.contraseñaservice.recuperarPassword(this.recuperarForm.value.emailUsuario).subscribe({
        next: (response) => {
          this.mensaje = response.mensaje;
          this.errorMessage = '';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (error) => {
          this.errorMessage = error.error?.error || 'Error al enviar el correo. Inténtalo de nuevo.';
        }
      });
    }
  }
}