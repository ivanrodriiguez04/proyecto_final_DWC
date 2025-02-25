import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistroService } from '../../servicios/registro/registro.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule],
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
      confirmPasswordUsuario: ['', Validators.required],
      fotoDniFrontalUsuario: [null, Validators.required],
      fotoDniTraseroUsuario: [null, Validators.required],
      fotoUsuario: [null, Validators.required]
    });
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0]; // Obtiene el primer archivo seleccionado
    if (file) {
      this.registroForm.patchValue({
        [controlName]: file
      });
      this.registroForm.get(controlName)?.updateValueAndValidity(); // Asegura que el control se actualice
    }
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

    const formData = new FormData();
    Object.keys(this.registroForm.controls).forEach(key => {
      formData.append(key, this.registroForm.get(key)?.value);
    });

    this.registroService.registrarUsuario(formData).subscribe(
      response => alert('Registro exitoso, revisa tu correo'),
      error => {
        console.error('Error en el registro:', error); // Muestra el error en la consola para depuración
        this.mensajeError = 'Error en el registro: ' + (error.error?.message || JSON.stringify(error.error));
      }
    );
    
  }
}
