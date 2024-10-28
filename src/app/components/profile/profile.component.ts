import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User = { name: '', surname: '', alias: '', email: '' };
  oldUser: User = { name: '', surname: '', alias: '', email: '' };
  editing = false;
  changePassword = false;
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserProfile();
  }
  async getUserProfile() {
    this.oldUser = await this.userService.getUserProfile();
    this.user = JSON.parse(JSON.stringify(this.oldUser));
  }
  cancelEditUser() {
    this.user = JSON.parse(JSON.stringify(this.oldUser));;
    this.editing = false;
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
  logout(){
    this.userService.logout();
  }
  resetPassword() {
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.changePassword = false;
  }
}
