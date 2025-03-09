import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContraseñaService } from '../../servicios/recuperar/contraseña.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cambiar-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './cambiar-password.component.html',
  styleUrl: './cambiar-password.component.css'
})
export class CambiarPasswordComponent implements OnInit {
  cambiarForm!: FormGroup;
  token: string = '';
  mensaje: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contraseñaService: ContraseñaService
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    this.cambiarForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsCoinciden });
  }

  passwordsCoinciden(group: FormGroup) {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    if (!password || !confirmPassword) return null;

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ notMatching: true });
      return { notMatching: true };
    } else {
      confirmPassword.setErrors(null);
      return null;
    }
  }

  cambiarPassword() {
    if (this.cambiarForm.invalid) {
      this.errorMessage = 'Por favor, completa los campos correctamente.';
      return;
    }

    if (this.cambiarForm.get('confirmPassword')?.hasError('notMatching')) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    const password = this.cambiarForm.value.password;

    this.contraseñaService.cambiarPassword(this.token, password).subscribe({
      next: (response) => {
        this.mensaje = response.mensaje;
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = error.error?.error || 'Hubo un error al cambiar la contraseña.';
      }
    });
  }
}
