import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbCollapseModule, RouterOutlet,RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  title = 'Travel Planner';
  isAuthenticated: boolean = false;
	isMenuCollapsed = true;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirigeix a la pàgina d'inici de sessió
  }

}
