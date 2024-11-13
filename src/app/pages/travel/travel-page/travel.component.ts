import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { DestinationsComponent } from '../destinations/destinations.component';
import { ActivitiesComponent } from '../activities/activities.component';
import { ExpensesComponent } from '../expenses/expenses.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { DocumentsComponent } from '../documents/documents.component';

@Component({
  selector: 'app-travel-page',
  standalone: true,
  imports: [CommonModule, DestinationsComponent, ActivitiesComponent, ExpensesComponent,GalleryComponent,DocumentsComponent],
  templateUrl: './travel.component.html',
  styleUrl: './travel.component.scss'
})
export class TravelPageComponent{

  destinations: string = 'active';
  activities: string = 'inactive';
  expenses: string = 'inactive';
  images: string = 'inactive';
  documents: string = 'inactive';

  constructor( ) { 
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

}
