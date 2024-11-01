import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = 'http://localhost:3000/api/files/';

  private getAuthHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  }

  constructor(private http: HttpClient, private userService: UserService) { }

  async uploadImage(file: File): Promise<any> {
    
    const headers = this.getAuthHeaders();

    const formData = new FormData();
    formData.append('profileImage', file);
    return await lastValueFrom(this.http.post<any>(this.apiUrl + 'profileImage', formData,{ headers }));
  }
}
