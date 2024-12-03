import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Travel } from '../models/travel.model';
import { AuthService } from './auth.service';
import { lastValueFrom, map, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from './notification.service';

@Injectable({
	providedIn: 'root'
})
export class TravelService {
	private baseUrl = 'http://localhost:3000/api/travel';
	private travel = {} as Travel;

	constructor(private http: HttpClient, private authService: AuthService, private notification: NotificationService) { }

	async getTravels(): Promise<Travel[]> {
		const headers = this.getAuthHeaders();
		try {
			let res = await lastValueFrom(this.http.get<Travel[]>(this.baseUrl, { headers }));
			return res;
		} catch (error: unknown) {
			this.notification.handleError(error, 'Error al carregar els viatges');
			return [];
		}
	}

	async createTravel(): Promise<Travel> {
		const headers = this.getAuthHeaders();
		try {
		let res = await lastValueFrom(this.http.post<{ message: String, travel: Travel }>(this.baseUrl, {}, { headers }));
		this.travel = res.travel;
		return this.travel;
		} catch (error: unknown) {
			this.notification.handleError(error, 'Error al crear el viatge');
			return {} as Travel;
		}
	}

	async updateTravel(travel:Travel): Promise<Travel> {
		const headers = this.getAuthHeaders();
		try {
		let res = await lastValueFrom(this.http.put<{ message: String, travel: Travel }>(this.baseUrl, travel, { headers }));
		this.travel = res.travel;
		return this.travel;
		} catch (error: unknown) {
			this.notification.handleError(error, 'Error al actualitzar el viatge');
			return {} as Travel;
		}
	}

	async removeTravel(_id: string) {
		const headers = this.getAuthHeaders();
		try {
		this.travel = await lastValueFrom(this.http.delete<Travel>(this.baseUrl + '/' + _id, { headers }));
		} catch (error: unknown) {
			this.notification.handleError(error, 'Error al eliminar el viatge');
		}
	}

	setTravel(travel: Travel) {
		this.travel = travel;
	}
	getTravel(): Travel {
		return this.travel;
	}

	private getAuthHeaders(): HttpHeaders {
		const token = this.authService.getToken();
		return new HttpHeaders({
			'Authorization': 'Bearer ' + token
		});
	}

}
