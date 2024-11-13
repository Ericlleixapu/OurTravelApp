import { Component, OnInit } from '@angular/core';
import { User } from '../../core/models/user.model';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { UploadService } from '../../core/services/upload.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;
  oldUser: User = {} as User;
  editing = false;
  changePassword = false;
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  selectedFile: File | null = null;
  uploadResponse: any;

  constructor(private userService: UserService,private uploadService: UploadService) { }

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
        await this.userService.updatePassword(this.oldPassword, this.newPassword);
        this.resetPassword();
      }
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.uploadImage();
    }
  }

  async uploadImage() {
    if (this.selectedFile) {
      await this.uploadService.uploadImage(this.selectedFile);
      this.getUserProfile();
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
