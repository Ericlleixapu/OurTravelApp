import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { TravelService } from '../../core/services/travel.service';
import { Travel } from '../../core/models/travel.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublicTravelCardComponent } from "../../shared/components/public-travel-card/public-travel-card.component";
@Component({
  selector: 'app-travels',
  standalone: true,
  imports: [CommonModule, RouterLink, PublicTravelCardComponent],
  templateUrl: './travels.component.html',
  styleUrl: './travels.component.scss'
})
export class TravelsComponent implements OnInit {

  public travels: Travel[] = [];
  public followedTravels: Travel[] = [];
  
  public travelId: string = '';
  public function = false;
  constructor(private travelService: TravelService, private router: Router, private modalService: NgbModal
  ) { }

  async ngOnInit() {
    this.travels = await this.travelService.getTravels();
    this.followedTravels = await this.travelService.getPublicTravelByUser();
  }


  async createTravel() {

    this.travelService.newTravel = true;
    this.router.navigate(['travel']);
  }

  goToTravel(travel: Travel) {
    if (!this.function) {
      this.travelService.setTravel(travel);
      this.router.navigate(['travel']);
    }
  }

  async removeTravelModal(_id: string, deleteModal: TemplateRef<any>) {   
    this.travelId = _id; 
    this.function = true;
    this.modalService.open(deleteModal, { centered: true, backdrop: 'static' });
  }
  async removeTravel() {
    await this.travelService.removeTravel(this.travelId);
    this.travels = await this.travelService.getTravels();
    this.travelId = '';
    this.function = false;
  }  
  async changeVisibility(travel:Travel) {
    await this.travelService.changeVisibility(travel);
    this.travels = await this.travelService.getTravels();
    this.function = false;
  }

}

