import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Travel } from '../../models/travel.model';
import { UserService } from '../../services/user.service';
import { NgbModal, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { debounceTime, distinctUntilChanged, from, map, Observable, OperatorFunction } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TravelService } from '../../services/travel.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, DatepickerComponent,FormsModule,NgbTypeaheadModule,RouterLink],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.scss'
})
export class DestinationsComponent implements OnInit{

  public newTravel: Travel = {} as Travel;
  public travelTypes = Travel.getTypes();
  public newDestination = {country: "", dateFrom: null, dateTo: null};

  public destinations = [1];
  public travels = [1, 2, 3, 2];
  public hotels = [1, 2, 3];


  public image$: Observable<any>= {} as Observable<any>;


  constructor(private travelService:TravelService, private userService: UserService, private modalService: NgbModal) { 
  }
  ngOnInit(): void {
    
    this.newTravel = new Travel(this.userService.getCurrentUser());

    
      this.image$ = this.travelService.getImage();
    
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
    this.newTravel.dateFrom = dates.from;
    this.newTravel.dateTo = dates.to;
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
