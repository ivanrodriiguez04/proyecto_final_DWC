import { Component, inject } from '@angular/core';
import { AuthService } from '../../servicios/autentificacion/auth.service';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatError,
    MatFormField,
    FormsModule,
    MatLabel,
    NgIf,
    MatInput,
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  user: string = '';
  password: string = '';
  loginValid: boolean = true;
  year: number = new Date().getFullYear();

  login(): void {
    this.authService.login(this.user, this.password).then(() => {
      this.loginValid = true;
      this.router.navigate(['notas']);
    }).catch(() => this.loginValid = false);

  }
}
