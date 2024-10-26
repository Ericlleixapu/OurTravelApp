import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from 'express';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})

export class AuthComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  register() {
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: () => {
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
