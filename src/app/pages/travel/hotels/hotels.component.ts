import { CommonModule } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { Travel } from '../../../core/models/travel.model';
import { NgbModal, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TravelService } from '../../../core/services/travel.service';
import { DatepickerComponent } from '../../../shared/components/datepicker/datepicker.component';
import { Hotel } from '../../../core/models/hotel.model';
import { HotelService } from '../../../core/services/hotel.service';
import { Destination } from '../../../core/models/destination.model';
import { TravelElementComponent } from "../../../shared/components/travel-element/travel-element.component";

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule, DatepickerComponent, FormsModule, NgbTypeaheadModule, TravelElementComponent],
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.scss'
})
export class HotelsComponent {

  travel: Travel = {} as Travel;
  selectedHotel: Hotel = {} as Hotel;
  destinations: Destination[] = [];

  public hotels: Hotel[] = [];

  constructor(private travelService: TravelService, private modalService: NgbModal, private hotelService: HotelService) {
  }
  async ngOnInit() {

    this.travel = this.travelService.getTravel()
    this.destinations = this.travel.destinations;
    this.hotels = this.travel.hotels;

    this.selectedHotel = this.newHotel();
  }


  compareFn(item1: any, item2: any): boolean {
    return item1 && item2 ? item1._id === item2._id : item1 === item2;
  }

  openAddNewHotel(content: TemplateRef<any>, hotel?: Hotel) {
    this.selectedHotel = hotel || this.newHotel();
    this.modalService.open(content, { centered: true, backdrop: 'static' });
  }

  newHotel(): Hotel {
    return { name: '', destination: this.destinations[this.hotels.length], travelId: this.travel._id };
  }

  async addNewHotel() {
    if (this.checkHotelForm()) {
      await this.hotelService.addHotel(this.selectedHotel);
      this.hotels = await this.hotelService.getHotelsByTravel(this.travel._id);
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
  async removeHotel(hotel: Hotel) {
      await this.hotelService.deleteHotel(hotel);
      this.hotels = await this.hotelService.getHotelsByTravel(this.travel._id);
  }

  checkHotelForm() {

    return true;
  }

}
