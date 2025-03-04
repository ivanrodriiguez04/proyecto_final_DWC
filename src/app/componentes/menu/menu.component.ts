import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../servicios/login/login.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  imports: [NgIf,RouterModule],
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userRole: string | null = null;
  userEmail: string | null = null;
  router = inject(Router);

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
}