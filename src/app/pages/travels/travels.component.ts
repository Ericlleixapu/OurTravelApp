import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { TravelService } from '../../core/services/travel.service';
import { Travel } from '../../core/models/travel.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-travels',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './travels.component.html',
  styleUrl: './travels.component.scss'
})
export class TravelsComponent implements OnInit {

  public travels: Travel[] = [];
  public remove = '';
  constructor(private travelService: TravelService, private router: Router, private modalService: NgbModal
  ) { }

  async ngOnInit() {
    this.travels = await this.travelService.getTravels();
  }


  async createTravel() {

    this.travelService.newTravel = true;
    this.router.navigate(['travel']);
  }

  goToTravel(travel: Travel) {
    if (this.remove=='') {
      this.travelService.setTravel(travel);
      this.router.navigate(['travel']);
    }
  }

  async removeTravelModal(_id: string, deleteModal: TemplateRef<any>) {    
    this.remove = _id;
    this.modalService.open(deleteModal, { centered: true, backdrop: 'static' });
  }
  async removeTravel() {
    await this.travelService.removeTravel(this.remove);
    this.travels = await this.travelService.getTravels();
    this.remove = '';
  }

}

