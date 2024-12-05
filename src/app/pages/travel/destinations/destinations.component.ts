import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Travel } from '../../../core/models/travel.model';
import { NgbModal, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map, Observable, OperatorFunction } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TravelService } from '../../../core/services/travel.service';
import { DatepickerComponent } from '../../../shared/components/datepicker/datepicker.component';
import { Destination } from '../../../core/models/destination.model';
import { DestinationService } from '../../../core/services/destination.service';
import { JourneysComponent } from "../journeys/journeys.component";
import { HotelsComponent } from '../hotels/hotels.component';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, DatepickerComponent, FormsModule, NgbTypeaheadModule, JourneysComponent, HotelsComponent],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.scss'
})
export class DestinationsComponent implements OnInit {

  travel: Travel = {} as Travel;
  selectedDestination: Destination = {} as Destination;

  public destinations: Destination[] = [];
  public countries: string[] = [];
  public cities: string[] = [];

  constructor(private travelService: TravelService, private modalService: NgbModal, private destinationService: DestinationService) {
  }
  async ngOnInit() {

    this.travel = this.travelService.getTravel()
    this.destinations = this.travel.destinations;
    this.selectedDestination = this.newDestination();
    this.countries = await this.destinationService.getCountryList();

  }

  openDestinationModal(content: TemplateRef<any>, destination?: Destination) {
    this.selectedDestination = destination || this.newDestination();
    this.modalService.open(content, { centered: true, backdrop: 'static' });
  }

  newDestination() {
    if (this.destinations.length > 0) {
      let lastDestination = this.destinations[this.destinations.length - 1];
      return { country: lastDestination.country, location: '', dateFrom: lastDestination.dateTo, dateTo: null, comment: '', travelId: this.travel._id } as Destination;
    }
    return { country: '', location: '', dateFrom: null, dateTo: null, comment: '', travelId: this.travel._id } as Destination;
  }

  async addNewDestination() {
    if (this.checkDestinationForm()) {
      this.destinations.push(await this.destinationService.addDestination(this.selectedDestination));
      this.modalService.dismissAll();
    } else {
      alert('S han d\'omplir tots els camps.');
    }
  }
  async updateDestination() {
    if (this.checkDestinationForm()) {
      this.selectedDestination = await this.destinationService.updateDestination(this.selectedDestination);
      this.modalService.dismissAll();
    } else {
      alert('S han d\'omplir tots els camps.');
    }
  }
  async removeDestination() {
    if (confirm('Segur que vols eliminar el desti? aquesta acció no es pot desfer.')) {
      await this.destinationService.deleteDestination(this.selectedDestination);
      this.destinations = await this.destinationService.getDestinationsByTravel(this.travel._id);
      this.travel.destinations = this.destinations;
    }
  }
  async getCities() {
    if (this.selectedDestination.country != '') {
      this.cities = await this.destinationService.getCityList(this.selectedDestination.country);
    }
  }
  checkDestinationForm() {
    if (this.selectedDestination.location == '') {
      return false;
    }
    if (this.selectedDestination.country == '') {
      return false;
    }
    if (!this.selectedDestination.dateFrom) {
      return false;
    }
    if (!this.selectedDestination.dateTo) {
      return false;
    }
    return true;
  }


  onDateSelection(dates: { from: Date, to: Date }) {
    this.selectedDestination.dateFrom = dates.from;
    this.selectedDestination.dateTo = dates.to;
  }

  searchCountry: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map((term) =>
        term.length < 1 ? [] : this.countries.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
      ),
    );

  searchCity: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map((term) =>
        term.length < 1 ? [] : this.cities.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
      ),
    );


}

