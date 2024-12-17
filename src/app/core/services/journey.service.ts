import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Journey } from '../models/journey.model';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

    private baseUrl = environment.apiUrl +'journey';

  constructor(private authService: AuthService, private http: HttpClient, private notification: NotificationService) { }

  async getJourneysByTravel(travelId: string): Promise<Journey[]> {
    const headers = this.getAuthHeaders();
    try {
      let res = await lastValueFrom(this.http.get<Journey[]>(this.baseUrl + '/travel/' + travelId, { headers }));
      return res;
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al carregar els destins');
      return [];
    }
  }

  async addJourney(journey: Journey): Promise<Journey> {
    const headers = this.getAuthHeaders();
    try {
      let res = await lastValueFrom(this.http.post<Journey>(this.baseUrl, journey, { headers }));
      return res;
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al crear el desti');
      return {} as Journey;
    }
  }
  async updateJourney(journey: Journey): Promise<Journey> {
    const headers = this.getAuthHeaders();
    try {
      let res = await lastValueFrom(this.http.put<Journey>(this.baseUrl + '/' + journey._id, journey, { headers }));
      return res;
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al modificar el desti');
      return {} as Journey;
    }
  }

  async deleteJourney(journey: Journey) {
    const headers = this.getAuthHeaders();
    try {
      let res = await lastValueFrom(this.http.delete<Journey>(this.baseUrl + '/' + journey._id, { headers }));
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
