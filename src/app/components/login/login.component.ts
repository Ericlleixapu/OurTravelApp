import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  newUser: User = {} as User;
  passwordConfirm: string = '';
  loginEmail: string = '';
  loginPassword: string = '';

  constructor(private userService: UserService, private router: Router) { }

  register() {
    if (this.checkData(this.newUser.email, this.newUser.password, this.passwordConfirm)) {
      this.userService.register(this.newUser).subscribe({
        next: () => {
          this.router.navigate(['/travels']);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  async login() {

    if (this.checkData(this.loginEmail)) {
      let res = await this.userService.login(this.loginEmail, this.loginPassword);

      if (res.ok) {
        this.router.navigate(['/travels']);
      }
    }
  }


  checkData(email: string, pass?: string, confirm?: string,) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('El correu electrònic no es correcte.');
      return false;
    }
    if (pass!==null && confirm!==null) {
      if (pass == '') {
        alert('La contrasenya no es pot deixar en blanc.');
        return false;
      }
      if (pass !== confirm) {
        alert('Les contrasenyes no coincideixen.');
        return false;
      }
    }
    return true;
  }



}
