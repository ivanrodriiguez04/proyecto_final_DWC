import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../servicios/login/login.service';
import { NgIf } from '@angular/common';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  imports: [NgIf, RouterModule, MatMenuModule, MatButtonModule],
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userRole: string | null = null;
  userEmail: string | null = null;
  router = inject(Router);
  private closeTimeout: any; // Controla el cierre del menú

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.user$.subscribe(user => {
      this.userRole = user.role;
      this.userEmail = user.email;
    });
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  openMenu(menuTrigger: MatMenuTrigger): void {
    menuTrigger.openMenu();
  }

  scheduleClose(menuTrigger: MatMenuTrigger): void {
    this.closeTimeout = setTimeout(() => {
      menuTrigger.closeMenu();
    }, 300); // Espera 300ms antes de cerrar
  }

  cancelClose(): void {
    clearTimeout(this.closeTimeout); // Cancela el cierre si el cursor vuelve al menú
  }
}
