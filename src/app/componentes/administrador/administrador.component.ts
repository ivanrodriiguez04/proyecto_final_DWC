import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdministradorService, Usuario } from '../../servicios/administrador/administrador.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'email', 'accion'];
  dataSource = new MatTableDataSource<Usuario>([]);
  usuarios: Usuario[] = [];

  constructor(private adminService: AdministradorService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.adminService.obtenerUsuarios().subscribe(data => {
      this.usuarios = data.filter(user => user.rolUsuario === 'usuario');
      this.dataSource.data = this.usuarios;
    });
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Seguro que quieres eliminar este usuario?')) {
      this.adminService.eliminarUsuario(id).subscribe({
        next: () => {
          this.usuarios = this.usuarios.filter(u => u.idUsuario !== id);
          this.dataSource.data = [...this.usuarios]; // Actualiza la tabla correctamente
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
        }
      });
    }
  }  
}

@NgModule({
  declarations: [AdministradorComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    BrowserAnimationsModule
  ]
})
export class AdministradorModule {}
