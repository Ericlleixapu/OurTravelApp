import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet} from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'OurTravel';
  isAuthenticated: boolean = false;
	isMenuCollapsed = true;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

}