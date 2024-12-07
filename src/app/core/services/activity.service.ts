import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private baseUrl = 'http://localhost:3000/api/activity';

  constructor(private authService: AuthService, private http: HttpClient, private notification: NotificationService) { }

  async getActivitiesByTravel(travelId: string): Promise<Activity[]> {
    const headers = this.getAuthHeaders();
    try {
      let res = await lastValueFrom(this.http.get<Activity[]>(this.baseUrl + '/travel/' + travelId, { headers }));
      return res;
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al carregar els destins');
      return [];
    }
  }

  async addActivity(activity: Activity): Promise<Activity> {
    const headers = this.getAuthHeaders();
    console.log(activity);
    try {
      let res = await lastValueFrom(this.http.post<Activity>(this.baseUrl, activity, { headers }));
      return res;
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al crear el desti');
      return {} as Activity;
    }
  }
  async updateActivity(activity: Activity): Promise<Activity> {
    const headers = this.getAuthHeaders();
    try {
      let res = await lastValueFrom(this.http.put<Activity>(this.baseUrl + '/' + activity._id, activity, { headers }));
      return res;
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al modificar el desti');
      return {} as Activity;
    }
  }

  async deleteActivity(activity: Activity) {
    const headers = this.getAuthHeaders();
    try {
      let res = await lastValueFrom(this.http.delete<Activity>(this.baseUrl + '/' + activity._id, { headers }));
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al modificar el desti');
    }
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  }
}
