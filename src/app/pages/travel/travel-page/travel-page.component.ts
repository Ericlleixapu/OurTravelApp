import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DestinationsComponent } from '../destinations/destinations.component';
import { ActivitiesComponent } from '../activities/activities.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { DocumentsComponent } from '../documents/documents.component';
import { TravelService } from '../../../core/services/travel.service';
import { MembersComponent } from '../members/members.component';
import { JourneysComponent } from "../journeys/journeys.component";
import { HotelsComponent } from '../hotels/hotels.component';
import { Router } from '@angular/router';
import { Travel } from '../../../core/models/travel.model';
@Component({
  selector: 'app-travel-page',
  standalone: true,
  imports: [
    CommonModule, 
    DestinationsComponent, 
    JourneysComponent, 
    HotelsComponent, 
    ActivitiesComponent, 
    GalleryComponent, 
    DocumentsComponent,
    MembersComponent
  ],
  templateUrl: './travel-page.component.html',
  styleUrl: './travel-page.component.scss'
})
export class TravelPageComponent implements OnInit {

  destinations: string = 'active';
  activities: string = 'inactive';
  members: string = 'inactive';
  images: string = 'inactive';
  documents: string = 'inactive';
  travel: Travel = {} as Travel;
  ready: boolean = false;

  constructor(
    private travelService: TravelService,
    private router: Router
  ) { }


  async ngOnInit() {
    this.travel = this.travelService.getTravel();

    if (this.travelService.newTravel) {
      await this.travelService.createTravel();
      this.travel = this.travelService.getTravel();
    }
    if(this.travel._id == null){
      this.router.navigate(['travels']);
    }
    this.travel = await this.travelService.getTravelById(this.travel._id);
    this.ready = true;
  }

  changeTab(tab: string) {
    this.destinations = 'inactive';
    this.activities = 'inactive';
    this.members = 'inactive';
    this.images = 'inactive';
    this.documents = 'inactive';

    switch (tab) {
      case 'destinations':
        this.destinations = 'active';
        break;
      case 'activities':
        this.activities = 'active';
        break;
      case 'images':
        this.images = 'active';
        break;
      case 'members':
        this.members = 'active';
        break;
      case 'documents':
        this.documents = 'active';
        break;
    }
  }

}
