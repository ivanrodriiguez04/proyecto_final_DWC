import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../servicios/login/login.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      emailUsuario: ['', [Validators.required, Validators.email]],
      passwordUsuario: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.errorMessage = ''; // Limpiar mensajes de error previos
      console.log('🔵 Enviando credenciales:', this.loginForm.value);

      this.loginService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('🟢 Respuesta del servidor:', response);

          if (!response || typeof response !== 'object' || !response.role) {
            this.errorMessage = 'Error en la respuesta del servidor.';
            return;
          }

          const role = response.role.toString().trim().toLowerCase(); // Convertir a string, limpiar y normalizar
          console.log('🔵 Rol obtenido:', role);

          this.loginService.setUserRole(role);

          switch (role) {
            case 'admin':
              console.log('🔵 Redirigiendo a /administrador');
              this.router.navigate(['/administrador']);
              break;
            case 'usuario':
              console.log('🔵 Redirigiendo a /cuentas');
              this.router.navigate(['/cuentas']);
              break;
            default:
              console.log('🟠 Rol desconocido, redirigiendo a /');
              this.router.navigate(['']);
          }
        },
        error: (err) => {
          console.error('🔴 Error en la autenticación:', err);
          this.errorMessage = err.error?.message || 'Error al iniciar sesión.';
        }
      });
    }
  }
}
