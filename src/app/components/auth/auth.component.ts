import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from 'express';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})

export class AuthComponent {
  newUser:User = {name: '', surname:'', alias:'', email:'', password:''};
  passwordConfirm: string = '';
  loginEmail: string = '';
  loginPassword: string = '';

  constructor(private authService: AuthService) { }

  register() {
    this.authService.register(this.newUser).subscribe({
      next: () => {
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  login() {
    this.authService.login(this.loginEmail, this.loginPassword).subscribe({
      next: () => {
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
