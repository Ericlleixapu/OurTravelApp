import { CommonModule } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { Travel } from '../../../core/models/travel.model';
import { NgbDate, NgbModal, NgbTimepickerModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TravelService } from '../../../core/services/travel.service';
import { Journey, JourneyType } from '../../../core/models/journey.model';
import { JourneyService } from '../../../core/services/journey.service';
import { Destination } from '../../../core/models/destination.model';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-journeys',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbTypeaheadModule, NgbDatepickerModule, NgbTimepickerModule],
  templateUrl: './journeys.component.html',
  styleUrl: './journeys.component.scss'
})
export class JourneysComponent {


  today = new Date();
  startDay: NgbDate = new NgbDate(this.today.getFullYear(), this.today.getMonth() + 1, this.today.getDate());

  dateFrom: NgbDateStruct = {} as NgbDateStruct;
  timeFrom = { hour: 0, minute: 0 };
  dateTo: NgbDateStruct = {} as NgbDateStruct;
  timeTo = { hour: 0, minute: 0 };

  travel: Travel = {} as Travel;
  selectedJourney: Journey = {} as Journey;
  JourneyType = JourneyType;
  public journeys: Journey[] = [];
  public destinations: Destination[] = [];

  public image$: Observable<any> = {} as Observable<any>;


  constructor(private travelService: TravelService, private modalService: NgbModal, private journeyService: JourneyService) {
  }
  async ngOnInit() {

    this.travel = this.travelService.getTravel()
    this.journeys = await this.journeyService.getJourneysByTravel(this.travel._id);
    this.destinations = this.travel.destinations;
    this.selectedJourney = this.newJourney();
  }


  openAddNewJourney(content: TemplateRef<any>, journey?: Journey) {
    this.selectedJourney = journey || this.newJourney();

    this.dateFrom = {} as NgbDateStruct;
    this.timeFrom = { hour: 0, minute: 0 };
    this.dateTo = {} as NgbDateStruct;
    this.timeTo = { hour: 0, minute: 0 };

    if (journey?.dateTimeFrom) {
      let dateFrom = new Date(journey?.dateTimeFrom);
      this.dateFrom = new NgbDate(dateFrom.getFullYear(), dateFrom.getMonth() + 1, dateFrom.getDate());
      this.timeFrom = { hour: dateFrom.getHours(), minute: dateFrom.getMinutes() };
    }
    if (journey?.dateTimeTo) {
      let dateTo = new Date(journey?.dateTimeTo);
      this.dateTo = new NgbDate(dateTo.getFullYear(), dateTo.getMonth() + 1, dateTo.getDate());
      this.timeTo = { hour: dateTo.getHours(), minute: dateTo.getMinutes() };
    }
    this.modalService.open(content, { centered: true, backdrop: 'static' });
  }

  setDataArribada() {
    this.dateTo = new NgbDate(this.dateFrom.year, this.dateFrom.month, this.dateFrom.day);
  }

  newJourney() {
    return {
      from: null,
      to: null,
      travelId: this.travel._id,
      journeyType: JourneyType.Other
    } as Journey;
  }

  async addNewJourney() {
    if (this.checkJourneyForm()) {
      this.setDateTime();
      await this.journeyService.addJourney(this.selectedJourney);
      this.journeys = await this.journeyService.getJourneysByTravel(this.travel._id);
      this.modalService.dismissAll();
    } else {
      alert('Has d\'escollir l\'origen i el destí.');
    }
  }
  async updateJourney() {
    if (this.checkJourneyForm()) {
      this.setDateTime();
      await this.journeyService.updateJourney(this.selectedJourney);
      this.journeys = await this.journeyService.getJourneysByTravel(this.travel._id);
      this.modalService.dismissAll();
    } else {
      alert('Has d\'escollir l\'origen i el destí.');
    }
  }

  setDateTime() {
    this.selectedJourney.dateTimeFrom = new Date(this.dateFrom.year, this.dateFrom.month - 1, this.dateFrom.day, this.timeFrom.hour, this.timeFrom.minute);
    this.selectedJourney.dateTimeTo = new Date(this.dateTo.year, this.dateTo.month - 1, this.dateTo.day, this.timeTo.hour, this.timeTo.minute);
  }

  async removeJourney() {
    if (confirm('Segur que vols eliminar el trajecte? aquesta acció no es pot desfer.')) {
      await this.journeyService.deleteJourney(this.selectedJourney);
      this.journeys = await this.journeyService.getJourneysByTravel(this.travel._id);
    }
  }

  checkJourneyForm() {
    return true;
  }

}
