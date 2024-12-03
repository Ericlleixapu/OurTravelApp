import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DestinationsComponent } from '../destinations/destinations.component';
import { ActivitiesComponent } from '../activities/activities.component';
import { ExpensesComponent } from '../expenses/expenses.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { DocumentsComponent } from '../documents/documents.component';
import { TravelService } from '../../../core/services/travel.service';
import { Router } from '@angular/router';
import { Travel } from '../../../core/models/travel.model';

@Component({
  selector: 'app-travel-page',
  standalone: true,
  imports: [CommonModule, DestinationsComponent, ActivitiesComponent, ExpensesComponent, GalleryComponent, DocumentsComponent],
  templateUrl: './travel-page.component.html',
  styleUrl: './travel-page.component.scss'
})
export class TravelPageComponent implements OnInit {

  destinations: string = 'active';
  activities: string = 'inactive';
  expenses: string = 'inactive';
  images: string = 'inactive';
  documents: string = 'inactive';

  travel:Travel = {} as Travel;

  constructor(private travelService: TravelService, private router: Router) { }


  ngOnInit() {
    if (!this.travelService.getTravel()) {
      this.router.navigate(['travels']);
    }
    this.travel = this.travelService.getTravel();
  }

  changeTab(tab: string) {
    this.destinations = 'inactive';
    this.activities = 'inactive';
    this.expenses = 'inactive';
    this.images = 'inactive';
    this.documents = 'inactive';

    switch (tab) {
      case 'destinations':
        this.destinations = 'active';
        break;
      case 'activities':
        this.activities = 'active';
        break;
      case 'expenses':
        this.expenses = 'active';
        break;
      case 'images':
        this.images = 'active';
        break;
      case 'documents':
        this.documents = 'active';
        break;
    }
  }

  updateTravel() {
    this.travelService.updateTravel(this.travel);
  }

}
