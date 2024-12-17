import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../../core/services/destination.service';
import { TravelService } from '../../core/services/travel.service';
import { Travel } from '../../core/models/travel.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TravelElementComponent } from "../../shared/components/travel-element/travel-element.component";
import { CommonModule } from '@angular/common';
import { Activity, ActivityIcon } from '../../core/models/activity.model';
import { Destination } from '../../core/models/destination.model';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-travel-summary',
  standalone: true,
  imports: [TravelElementComponent,CommonModule],
  templateUrl: './travel-summary.component.html',
  styleUrl: './travel-summary.component.scss'
})
export class TravelSummaryComponent implements OnInit {

  public user = {} as User;
  public travel: Travel = {} as Travel;
  public ActivityIcon = ActivityIcon;
  public sortedActivities:{destination:Destination,activities:Activity[]}[] = [];
  
  constructor(private travelService: TravelService,
      private userService: UserService, 
          private router:Router,  private destinationService: DestinationService,private route: ActivatedRoute) { }

  async ngOnInit() {
    const travelId = this.route.snapshot.paramMap.get('travelId');
    this.travel = await this.travelService.getPublicTravelById(travelId||'');
    this.user = this.userService.getCurrentUser();
    this.sortActivities();
      
  }

  sortActivities(){
    for(let dest of this.travel.destinations){
      this.sortedActivities.push({destination:dest,activities: this.travel.activities.filter(a=>a.destination?._id==dest._id)})
    }
  }
  
  async addFollower(travel: Travel) {
    if (this.userService.isAuthenticated()) {
      await this.travelService.addFollowerToTravel(travel, this.user);
      travel.followers.push(this.user._id);
    }else{
      this.router.navigate(['login']);
    }
  }

  async removeFollower(travel: Travel) {
    if (this.userService.isAuthenticated()) {
      await this.travelService.removeFollowerToTravel(travel, this.user);
      travel.followers = travel.followers.filter(follower => follower !== this.user._id);
    }else{
      this.router.navigate(['login']);
    }
  }

}
