import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user:User = {name: '', surname:'', alias:'', email:'', password:''};
  editing = false;
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserProfile();
   }
   async getUserProfile() {
    this.user = await this.userService.getUserProfile();
  }
  async updateUserProfile() {
    this.user = await this.userService.updateUserProfile(this.user);
  }
}
