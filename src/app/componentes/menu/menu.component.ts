import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login/login.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  imports: [NgIf],
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userRole: string | null = null;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.userRole = this.loginService.getUserRole();
  }

  logout() {
    this.loginService.logout();
    this.userRole = null;
    this.router.navigate(['/login']);
  }
}
