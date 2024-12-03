import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Travel } from '../../../core/models/travel.model';
import { NgbModal, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, from, map, Observable, OperatorFunction } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TravelService } from '../../../core/services/travel.service';
import { DatepickerComponent } from '../../../shared/components/datepicker/datepicker.component';
import { Hotel } from '../../../core/models/hotel.model';
import { HotelService } from '../../../core/services/hotel.service';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule, DatepickerComponent, FormsModule, NgbTypeaheadModule],
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.scss'
})
export class HotelsComponent {

  travel: Travel = {} as Travel;
  selectedHotel: Hotel = {} as Hotel;

  public hotels: Hotel[] = [];


  public image$: Observable<any> = {} as Observable<any>;


  constructor(private travelService: TravelService, private modalService: NgbModal, private hotelService:HotelService) {
  }
  async ngOnInit() {

    this.travel = this.travelService.getTravel()
    this.hotels = await this.hotelService.getHotelsByTravel(this.travel._id);
    this.selectedHotel = this.newHotel();

  }

  
  openAddNewHotel(content: TemplateRef<any>, hotel?: Hotel) {
    this.selectedHotel = hotel || this.newHotel();
    this.modalService.open(content, { centered: true, backdrop: 'static' });
  }
  
  newHotel() {
    if (this.hotels.length > 0) {
      let lastHotel = this.hotels[this.hotels.length - 1];
      return {  } as Hotel;
    }
    return {  } as Hotel;
  }

  async addNewHotel() {
    if (this.checkHotelForm()) {
      this.hotels.push(await this.hotelService.addHotel(this.selectedHotel));
      this.modalService.dismissAll();
    } else {
      alert('S han d\'omplir tots els camps.');
    }
  }
  async updateHotel() {
    if (this.checkHotelForm()) {
      this.selectedHotel = await this.hotelService.updateHotel(this.selectedHotel);
      this.modalService.dismissAll();
    } else {
      alert('S han d\'omplir tots els camps.');
    }
  }
  async removeHotel() {
    if (confirm('Segur que vols eliminar el desti? aquesta acció no es pot desfer.')) {
      await this.hotelService.deleteHotel(this.selectedHotel);
      this.hotels = await this.hotelService.getHotelsByTravel(this.travel._id);
    }
  }

  checkHotelForm() {

    return true;
  }

}
