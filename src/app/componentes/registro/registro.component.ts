import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistroService } from '../../servicios/registro/registro.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  registroForm: FormGroup;
  mensajeError: string = '';

  constructor(private fb: FormBuilder, private registroService: RegistroService) {
    this.registroForm = this.fb.group({
      nombreCompletoUsuario: ['', Validators.required],
      dniUsuario: ['', Validators.required],
      telefonoUsuario: ['', Validators.required],
      emailUsuario: ['', [Validators.required, Validators.email]],
      confirmEmailUsuario: ['', [Validators.required, Validators.email]],
      passwordUsuario: ['', Validators.required],
      confirmPasswordUsuario: ['', Validators.required]
    });
  }

  validarYEnviar() {
    if (this.registroForm.invalid) {
      this.mensajeError = 'Todos los campos son obligatorios';
      return;
    }

    const email = this.registroForm.get('emailUsuario')?.value;
    const confirmEmail = this.registroForm.get('confirmEmailUsuario')?.value;
    const password = this.registroForm.get('passwordUsuario')?.value;
    const confirmPassword = this.registroForm.get('confirmPasswordUsuario')?.value;

    if (email !== confirmEmail) {
      this.mensajeError = 'Los emails no coinciden';
      return;
    }

    if (password !== confirmPassword) {
      this.mensajeError = 'Las contraseñas no coinciden';
      return;
    }

    // Crear el objeto JSON con los datos correctos
    const usuario = {
      nombreCompletoUsuario: this.registroForm.get('nombreCompletoUsuario')?.value,
      dniUsuario: this.registroForm.get('dniUsuario')?.value,
      telefonoUsuario: this.registroForm.get('telefonoUsuario')?.value,
      emailUsuario: this.registroForm.get('emailUsuario')?.value,
      passwordUsuario: this.registroForm.get('passwordUsuario')?.value,
      rolUsuario: 'usuario',  // Se mantiene fijo
      confirmado: false       // Se mantiene fijo hasta confirmación
    };

    this.registroService.registrarUsuario(usuario).subscribe(
      response => alert('Registro exitoso, revisa tu correo'),
      error => {
        console.error('Error en el registro:', error);
        this.mensajeError = 'Error en el registro: ' + (error.error?.message || JSON.stringify(error.error));
      }
    );
  }
}
