import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Travel } from '../../models/travel.model';
import { TravelService } from '../../services/travel.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-travels',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './travels.component.html',
  styleUrl: './travels.component.scss'
})
export class TravelsComponent {

  public travels = [1, 2, 3];
  constructor(private travelService:TravelService) { 
  }
  

}

