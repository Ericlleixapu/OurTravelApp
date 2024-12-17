import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
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

  constructor(private userService: UserService,  private router: Router) { }

  async register() {
    if (this.userService.checkData(this.newUser.email, this.newUser.password, this.passwordConfirm)) {
      await this.userService.register(this.newUser);
    }
  }

  async login() {

    if (this.userService.checkData(this.loginEmail)) {
      let res = await this.userService.login(this.loginEmail, this.loginPassword);

      if (res.ok) {
        this.router.navigate(['/travels']);
      }
    }
  }


}
