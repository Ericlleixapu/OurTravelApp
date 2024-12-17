import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Travel } from '../models/travel.model';
import { AuthService } from './auth.service';
import { lastValueFrom } from 'rxjs';
import { NotificationService } from './notification.service';
import { User } from '../models/user.model';

@Injectable({
	providedIn: 'root'
})
export class TravelService {
	private baseUrl = 'http://localhost:3000/api/travel';
	private travel = {} as Travel;
	public newTravel: boolean = false;

	constructor(private http: HttpClient, private authService: AuthService, private notification: NotificationService) {
		this.newTravel = false;
	}

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
	async getTravelById(id: string): Promise<Travel> {
		const headers = this.getAuthHeaders();
		try {
			let res = await lastValueFrom(this.http.get<Travel>(this.baseUrl + '/' + id, { headers }));
			this.travel = res;
			return res;
		} catch (error: unknown) {
			this.notification.handleError(error, 'Error al carregar els viatges');
			return {} as Travel;
		}
	}

	async createTravel(): Promise<Travel> {
		this.newTravel = false;
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

	async updateTravel(travel: Travel): Promise<Travel> {
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

	async addMember(travel: Travel, member: User) {
		const headers = this.getAuthHeaders();
		try {
			await lastValueFrom(this.http.put<{ message: String, travel: Travel }>(this.baseUrl + '/addMember/' + travel._id, member, { headers }));
		} catch (error: unknown) {
			this.notification.handleError(error, 'Error al actualitzar el viatge');
		}
	}

	async removeMember(travel: Travel, member: User) {
		const headers = this.getAuthHeaders();
		try {
			await lastValueFrom(this.http.put<{ message: String, travel: Travel }>(this.baseUrl + '/removeMember/' + travel._id, member, { headers }));
		} catch (error: unknown) {
			this.notification.handleError(error, 'Error al actualitzar el viatge');
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
	

	async getAllPublicTravels(): Promise<Travel[]> {
		try {
			let res = await lastValueFrom(this.http.get<Travel[]>(this.baseUrl+'/public'));
			return res;
		} catch (error: unknown) {
			this.notification.handleError(error, 'Error al carregar els viatges');
			return [];
		}
	}
	async getPublicTravelById(id: string): Promise<Travel> {
		try {
			let res = await lastValueFrom(this.http.get<Travel>(this.baseUrl + '/public/' + id));
			this.travel = res;
			return res;
		} catch (error: unknown) {
			this.notification.handleError(error, 'Error al carregar els viatges');
			return {} as Travel;
		}
	}	
	async getPublicTravelByUser(): Promise<Travel[]> {
		const headers = this.getAuthHeaders();
		try {
			let res = await lastValueFrom(this.http.get<Travel[]>(this.baseUrl+'/publicByUser', { headers }));
			return res;
		} catch (error: unknown) {
			this.notification.handleError(error, 'Error al carregar els viatges');
			return [];
		}
	}
	async getPublicTravelByCountry(country: string): Promise<Travel[]> {
		const headers = this.getAuthHeaders();
		try {
			let res = await lastValueFrom(this.http.get<Travel[]>(this.baseUrl+'/publicByCountry/'+country, { headers }));
			return res;
		} catch (error: unknown) {
			this.notification.handleError(error, 'Error al carregar els viatges');
			return [];
		}
	}

	
	async addFollowerToTravel(travel: Travel, follower: User) {
		const headers = this.getAuthHeaders();
		try {
			await lastValueFrom(this.http.put<{ message: String, travel: Travel }>(this.baseUrl + '/public/addFollower/' + travel._id, follower, { headers }));
		} catch (error: unknown) {
			this.notification.handleError(error, 'Error al actualitzar el viatge');
		}
	}
	async removeFollowerToTravel(travel: Travel, follower: User) {
		const headers = this.getAuthHeaders();
		try {
			await lastValueFrom(this.http.put<{ message: String, travel: Travel }>(this.baseUrl + '/public/removeFollower/' + travel._id, follower, { headers }));
		} catch (error: unknown) {
			this.notification.handleError(error, 'Error al actualitzar el viatge');
		}
	}
	async changeVisibility(travel: Travel) {
		const headers = this.getAuthHeaders();
		try {
			await lastValueFrom(this.http.put<{ message: String, travel: Travel }>(this.baseUrl + '/changeVisibility/' + travel._id,{}, { headers }));
		} catch (error: unknown) {
			this.notification.handleError(error, 'Error al actualitzar el viatge');
		}
	}

/*
router.get('/public', travelController.getAllPublicTravels);
router.get('/public/:id', travelController.getPublicTravelById);
router.put('/public/:travelId', travelController.addFollowerToTravel);
router.put('/changeVisibility/:travelId', authMiddleware, travelController.changeVisibility);

router.put('/public/removeFollower/:travelId', authMiddleware,travelController.removeFollowerToTravel);
*/

	private getAuthHeaders(): HttpHeaders {
		const token = this.authService.getToken();
		return new HttpHeaders({
			'Authorization': 'Bearer ' + token
		});
	}

}
