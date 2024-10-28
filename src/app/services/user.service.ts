import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { User } from '../models/user.model'; // Assegura't que tens un model d'usuari definit
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {  
  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient,private authService: AuthService) {}
  async getUserProfile(): Promise<User> {
    try {
      const headers = this.getAuthHeaders();
      const user = await this.http.get<User>(this.baseUrl+'/profile', { headers });
      return lastValueFrom(user);
    } catch (error) {
      console.error('Error al obtenir el perfil de l\'usuari', error);
      throw error;
    }
  }

  // Actualitza el perfil de l'usuari
  async updateUserProfile(userData: Partial<User>): Promise<User> {
    const headers = this.getAuthHeaders();
    return lastValueFrom(this.http.put<User>(this.baseUrl+'/profile', {user : userData}, { headers }));
  }

    // TODO Actualitza el perfil de l'usuari
    async updatePassword(userData: Partial<User>, oldPassword: string, newPassword: string): Promise<User> {
      const headers = this.getAuthHeaders();
      return lastValueFrom(this.http.put<User>(this.baseUrl+'/profile', userData, { headers }));
    }
    logout(){
      this.authService.logout();
    }

  // Obté els headers d'autorització amb el token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  }
}