import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Travel } from '../models/travel.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class TravelService {
    private baseUrl = 'http://localhost:3000/api/travels';

    constructor(private http: HttpClient, private authService: AuthService) {}

    private getHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    getTravels(): Observable<Travel[]> {
        return this.http.get<Travel[]>(this.baseUrl, { headers: this.getHeaders() });
    }

    createTravel(travel: Travel): Observable<Travel> {
        return this.http.post<Travel>(this.baseUrl, travel, { headers: this.getHeaders() });
    }
}
