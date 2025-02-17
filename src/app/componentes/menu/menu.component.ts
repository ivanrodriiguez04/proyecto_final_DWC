import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../servicios/login/login.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
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