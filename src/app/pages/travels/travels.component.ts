import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { TravelService } from '../../core/services/travel.service';
import { Travel } from '../../core/models/travel.model';
@Component({
  selector: 'app-travels',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './travels.component.html',
  styleUrl: './travels.component.scss'
})
export class TravelsComponent implements OnInit {

  public travels: Travel[] = [];
  public remove = false;
  constructor(private travelService: TravelService, private router: Router
  ) { }

  async ngOnInit() {
    this.travels = await this.travelService.getTravels();
  }


  async createTravel() {
    await this.travelService.createTravel();
    this.router.navigate(['travel']);
  }

  goToTravel(travel: Travel) {
    if (this.remove==false) {
      this.travelService.setTravel(travel);
      this.router.navigate(['travel']);
    }
    this.remove = false;
  }

  async removeTravel(_id: string) {
    this.remove = true;
    await this.travelService.removeTravel(_id);
    this.travels = await this.travelService.getTravels();
  }

}

