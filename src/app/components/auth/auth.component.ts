import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router} from '@angular/router';
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

  constructor(private authService: AuthService,private router: Router) { }

  register() {
    this.authService.register(this.newUser).subscribe({
      next: () => {        
        this.router.navigate(['/travels']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
/*
  async updatePassword() {
    if (this.newPassword !== this.confirmPassword || this.newPassword === '' || this.oldPassword === '') {
      alert('Les contrasenyes no coincideixen o no estan escrites');
    } else {
      if (confirm('Segur que vols canviar la contrasenya?')) {
        await this.userService.updatePassword(this.user, this.oldPassword, this.newPassword);
        this.resetPassword();
      }
    }
  }

  async updateUserProfile() {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(this.user.email)) {
      alert('El correu electrònic no es correcte');
    } else {
    await this.userService.updateUserProfile(this.user);
    this.oldUser = JSON.parse(JSON.stringify(this.user));
    this.editing = false;
    }
  }

  */
  login() {
    this.authService.login(this.loginEmail, this.loginPassword).subscribe({
      next: () => {
        this.router.navigate(['/travels']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
