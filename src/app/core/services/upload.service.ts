import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private baseUrl = environment.apiUrl + 'file';

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  }

  constructor(private http: HttpClient, private authService: AuthService) { }

  async uploadTravelImage(file: File): Promise<any> {
    
    const headers = this.getAuthHeaders();

    const formData = new FormData();
    formData.append('travelImage', file);
    return await lastValueFrom(this.http.post<any>(this.baseUrl + '/travelImage', formData,{ headers }));
  }

  async uploadTravelDocument(file: File): Promise<any> {
    
    const headers = this.getAuthHeaders();

    const formData = new FormData();
    formData.append('travelDocument', file);
    return await lastValueFrom(this.http.post<any>(this.baseUrl + '/travelDocument', formData,{ headers }));
  }

  async uploadProfileImage(file: File): Promise<any> {
    
    const headers = this.getAuthHeaders();

    const formData = new FormData();
    formData.append('profileImage', file);
    return await lastValueFrom(this.http.post<any>(this.baseUrl + '/profileImage', formData,{ headers }));
  }
}
