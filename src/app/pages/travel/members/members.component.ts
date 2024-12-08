import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TravelService } from '../../../core/services/travel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { FormsModule } from '@angular/forms';
import { Travel } from '../../../core/models/travel.model';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent implements OnInit {

  public members:User[] = [];
  public founds:User[] = [];
  public query = '';
  public travel: Travel = {} as Travel;

  constructor(private travelService: TravelService, private modalService: NgbModal, private userService: UserService) { }
  async ngOnInit(){

    this.founds = [];
    this.travel = this.travelService.getTravel();
    this.members = this.travel.members;
  }

  async search(){
    if(this.query.length < 3) {
      this.founds = [];
      return;
    }
    this.founds = await this.userService.searchUsers(this.query);
  }

async addMember(user:User){
  await this.travelService.addMember(this.travel,user);
  this.travel = await this.travelService.getTravelById(this.travel._id);
  this.members = this.travel.members;
}

async removeMember(user:User){
  await this.travelService.removeMember(this.travel,user);
  this.travel = await this.travelService.getTravelById(this.travel._id);
  this.members = this.travel.members;
}

}
