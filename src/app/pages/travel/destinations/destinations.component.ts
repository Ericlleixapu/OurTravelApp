import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Travel } from '../../../core/models/travel.model';
import { UserService } from '../../../core/services/user.service';
import { NgbModal, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, from, map, Observable, OperatorFunction } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TravelService } from '../../../core/services/travel.service';
import { DatepickerComponent } from '../../../shared/components/datepicker/datepicker.component';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, DatepickerComponent,FormsModule,NgbTypeaheadModule],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.scss'
})
export class DestinationsComponent implements OnInit{

  public newDestination = {country: "", dateFrom: null, dateTo: null};

  public destinations = [1];
  public travels = [1, 2, 3, 2];
  public hotels = [1, 2, 3];


  public image$: Observable<any>= {} as Observable<any>;


  constructor(private travelService:TravelService, private userService: UserService, private modalService: NgbModal) { 
  }
  ngOnInit(): void {

    
  }

  addNewDestination(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, backdrop: 'static' });
  } 
  addNewJourney(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, backdrop: 'static' });
  } 
  addNewHotel(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, backdrop: 'static' });
  }

  onDateSelection(dates: { from: Date, to: Date }) {
  }

  public country:string="Spain";

	search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(100),
			distinctUntilChanged(),
			map((term) =>
				term.length < 1 ? [] : this.travelService.getCountryList().filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
			),
		);

}
