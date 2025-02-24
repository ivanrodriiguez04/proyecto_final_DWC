import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../servicios/login/login.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
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
      this.loginService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response); // Depuración
  
          const role = response.role.trim(); 
          console.log('Rol obtenido:', role); // Depuración
  
          if (role) {
            this.loginService.setUserRole(role);
  
            // If-else para manejar diferentes roles
            if (role === 'admin') {
              console.log('Redirigiendo a administrador');
              this.router.navigate(['/administrador']);
            } else if (role === 'usuario') {
              console.log('Redirigiendo a cuentas');
              this.router.navigate(['/cuentas']);
            } else {
              console.log('Rol desconocido, redirigiendo a inicio');
              this.router.navigate(['/']);
            }
          } else {
            this.errorMessage = 'Error obteniendo el rol del usuario.';
          }
        },
        error: (err) => {
          console.error('Error en la autenticación:', err);
          this.errorMessage = err.error || 'Error al iniciar sesión';
        }
      });
    }
  }
  
  
}
