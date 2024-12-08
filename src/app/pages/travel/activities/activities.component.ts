import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { TravelElementComponent } from "../../../shared/components/travel-element/travel-element.component";
import { Activity, ActivityType, ActivityIcon } from '../../../core/models/activity.model';
import { NgbDate, NgbDatepickerModule, NgbDateStruct, NgbModal, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { ActivityService } from '../../../core/services/activity.service';
import { TravelService } from '../../../core/services/travel.service';
import { Travel } from '../../../core/models/travel.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule, TravelElementComponent, FormsModule,NgbDatepickerModule, NgbTimepicker],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent implements OnInit {

  public travel: Travel = {} as Travel;
  public activities: Activity[] = [];
  public ActivityType = ActivityType;
  public activityTypes = Object.values(ActivityType);
  public ActivityIcon = ActivityIcon;
  public selectedActivity: Activity = {} as Activity;

  public today = new Date();
  
	public activityNgbDate: NgbDate={} as NgbDate;
	public date: { year: number, month: number}={ year: this.today.getFullYear(), month: this.today.getMonth() + 1};
  public activityNgbTime = { hour: 0, minute: 0 };

  constructor(private modalService: NgbModal, private activityService: ActivityService, private travelService: TravelService) {
  }

  async ngOnInit() {
    this.travel = this.travelService.getTravel();
    this.activities = this.travel.activities;
  }

  openActivityModal(content: TemplateRef<any>, activity?: Activity) {
    if (activity) {
      this.activityNgbDate = this.convertDateToNgbDate(activity.date).date;
      this.activityNgbTime = this.convertDateToNgbDate(activity.date).time;
      this.selectedActivity = activity;
    } else {
      this.activityNgbDate = new NgbDate(this.today.getFullYear(), this.today.getMonth() + 1, this.today.getDate());
      this.activityNgbTime = { hour: 0, minute: 0 };
      this.selectedActivity = this.newActivity();
    }
    this.modalService.open(content, { centered: true, backdrop: 'static' });
  }
  async addActivity() {
    this.selectedActivity.date = this.convertNgbDateToDate(this.activityNgbDate, this.activityNgbTime);
    if(!this.checkForm()) return;
    await this.activityService.addActivity(this.selectedActivity);
    this.activities = await this.activityService.getActivitiesByTravel(this.travel._id);
    this.modalService.dismissAll();
  }  
  async updateActivity() {
    this.selectedActivity.date = this.convertNgbDateToDate(this.activityNgbDate, this.activityNgbTime);
    if(!this.checkForm()) return;
    await this.activityService.updateActivity(this.selectedActivity);
    this.activities = await this.activityService.getActivitiesByTravel(this.travel._id);
    this.modalService.dismissAll();
  }
  async removeActivity(activity: Activity) {    
    await this.activityService.deleteActivity(this.selectedActivity);
    this.activities = await this.activityService.getActivitiesByTravel(this.travel._id);
  }

  checkForm():boolean{
    if(this.selectedActivity.name == '' || !this.selectedActivity.destination){
      alert("S'han d'omplir tots els camps");
      return false;
    }
    return true;
  }
  
  convertDateToNgbDate(date: Date) {
    let dateFrom = new Date(date);
    return { date: new NgbDate(dateFrom.getFullYear(), dateFrom.getMonth() + 1, dateFrom.getDate()), time: { hour: dateFrom.getHours(), minute: dateFrom.getMinutes() } };
  }

  convertNgbDateToDate(date: NgbDate, time?: { hour: number, minute: number }) {
    if (time) {
      return new Date(date.year, date.month - 1, date.day, time.hour, time.minute);
    }
    return new Date(date.year, date.month - 1, date.day);
  }

  compareFn(item1: any, item2: any): boolean {
    return item1 && item2 ? item1._id === item2._id : item1 === item2;
  }

  newActivity(): Activity {
    return {
      name: '',
      type: ActivityType.OTHER,
      description: '',
      date: new Date(),
      travelId: this.travel._id
    };
  }
}
