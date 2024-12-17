import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Travel } from '../../core/models/travel.model';
import { TravelService } from '../../core/services/travel.service';
import { debounceTime, distinctUntilChanged, map, Observable, OperatorFunction } from 'rxjs';
import { DestinationService } from '../../core/services/destination.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import { PublicTravelCardComponent } from "../../shared/components/public-travel-card/public-travel-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbTypeaheadModule, PublicTravelCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public allTravels: Travel[] = [];
  public travels: Travel[] = [];
  public countries: string[] = [];
  public query = '';
  public user = {} as User;
  public function = false;

  constructor(private travelService: TravelService, private destinationService: DestinationService, private userService: UserService, private router: Router) { }
  async ngOnInit() {
    this.allTravels = await this.travelService.getAllPublicTravels();
    this.travels = this.allTravels;
    this.countries = await this.destinationService.getCountryList();
    this.user = this.userService.getCurrentUser();
  }
  async getTravelsByCountry() {
    if (this.query.length > 2) {
      this.travels = await this.travelService.getPublicTravelByCountry(this.query);
    } if (this.query.length == 0) {
      this.travels = this.allTravels;
    }
  }

  searchCountry: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map((term) =>
        term.length < 1 ? [] : this.countries.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
      ),
    );
}
