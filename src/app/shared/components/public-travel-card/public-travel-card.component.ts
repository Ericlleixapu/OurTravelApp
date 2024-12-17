import { Component, Input, input } from '@angular/core';
import { Travel } from '../../../core/models/travel.model';
import { TravelService } from '../../../core/services/travel.service';
import { DestinationService } from '../../../core/services/destination.service';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { User } from '../../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-public-travel-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-travel-card.component.html',
  styleUrl: './public-travel-card.component.scss'
})
export class PublicTravelCardComponent {
@Input () travel: Travel = {} as Travel;

  public user = {} as User;
  public function = false;

  constructor(
    private travelService: TravelService, 
    private userService: UserService, 
    private router:Router, 
    private notificationService: NotificationService) { }
  async ngOnInit() {
    this.user = this.userService.getCurrentUser();
  }

  async addFollower(travel: Travel) {
    if (this.userService.isAuthenticated()) {
      await this.travelService.addFollowerToTravel(travel, this.user);
      travel.followers.push(this.user._id);
      this.notificationService.showSuccess('Viatge afegit a la llista de seguiment');
    }else{
      this.router.navigate(['login']);
    }
    this.function = false;
  }

  async removeFollower(travel: Travel) {
    if (this.userService.isAuthenticated()) {
      await this.travelService.removeFollowerToTravel(travel, this.user);
      travel.followers = travel.followers.filter(follower => follower !== this.user._id);
      this.notificationService.showSuccess('Viatge eliminat de la llista de seguiment');
    }else{
      this.router.navigate(['login']);
    }
    this.function = false;
  }

  goToTravel(travel: Travel) {    
    if (!this.function) {
      this.router.navigate(['travel-summary/'+travel._id]);
    }
  }


}
