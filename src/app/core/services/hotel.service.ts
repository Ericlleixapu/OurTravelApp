import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from '../models/hotel.model';
import { lastValueFrom, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private baseUrl = 'http://localhost:3000/api/hotel';

  constructor(private authService: AuthService, private http: HttpClient, private notification: NotificationService) { }

  async getHotelsByTravel(travelId: string): Promise<Hotel[]> {
    const headers = this.getAuthHeaders();
    try {
      let res = await lastValueFrom(this.http.get<Hotel[]>(this.baseUrl + '/travel/' + travelId, { headers }));
      return res;
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al carregar els destins');
      return [];
    }
  }

  async addHotel(hotel: Hotel): Promise<Hotel> {
    const headers = this.getAuthHeaders();
    try {
      let res = await lastValueFrom(this.http.post<Hotel>(this.baseUrl, hotel, { headers }));
      return res;
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al crear el desti');
      return {} as Hotel;
    }
  }
  async updateHotel(hotel: Hotel): Promise<Hotel> {
    const headers = this.getAuthHeaders();
    try {
      let res = await lastValueFrom(this.http.put<Hotel>(this.baseUrl + '/' + hotel._id, hotel, { headers }));
      return res;
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al modificar el desti');
      return {} as Hotel;
    }
  }

  async deleteHotel(hotel: Hotel) {
    const headers = this.getAuthHeaders();
    try {
      let res = await lastValueFrom(this.http.delete<Hotel>(this.baseUrl + '/' + hotel._id, { headers }));
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
