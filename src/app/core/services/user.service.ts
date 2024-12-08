import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { User } from '../models/user.model'; // Assegura't que tens un model d'usuari definit
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api/user';
  private currentUser: User = {} as User;

  constructor(private http: HttpClient, private authService: AuthService, private notificationService: NotificationService) {
   }

  public async login(loginEmail: string, loginPassword: string) {

    let res = await this.authService.login(loginEmail, loginPassword);
    if (res.ok) {
      await this.getUserProfile();
    }
    return res;

  }

  public async register(newUser: User) {
    await this.authService.register(newUser);
  }


  async getUserProfile(): Promise<User> {
    try {
      const headers = this.getAuthHeaders();
      const res = await this.http.get<User>(this.baseUrl + '/profile', { headers });
      this.currentUser = await lastValueFrom(res);
      return lastValueFrom(res);
    } catch (error) {
      this.notificationService.handleError(error, 'Error l obtenir l\' usuari');
      throw error;
    }
  }
  getCurrentUser(): User {
    return this.currentUser;
  }

  async searchUsers(query: string): Promise<User[]> {
    try {
      const headers = this.getAuthHeaders();
      const res = await lastValueFrom(this.http.get<User[]>(this.baseUrl + '/search/'+query, {headers }))
      return res;
    } catch (error:unknown) {
      return [];
    }
  }
  
  // Actualitza el perfil de l'usuari
  async updateUserProfile(userData: Partial<User>): Promise<User> {
    const headers = this.getAuthHeaders();
    this.currentUser = await lastValueFrom(this.http.put<User>(this.baseUrl + '/profile', { user: userData }, { headers }));
    return this.currentUser;
  }

  // TODO Actualitza el perfil de l'usuari
  async updatePassword(oldPassword: string, newPassword: string): Promise<User> {
    const headers = this.getAuthHeaders();
    try {
      this.currentUser = await lastValueFrom(this.http.put<User>(this.baseUrl + '/password', { oldPassword: oldPassword, newPassword: newPassword }, { headers }));
      return this.currentUser;
    } catch (error: any) {
      this.notificationService.handleError(error, 'Error al actualitzar la contrassenya');
      return error;
    }
  }

  // Obté els headers d'autorització amb el token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  }

  public logout() {
    this.currentUser = {} as User;
    this.authService.logout();
  }

  static checkData(email: string, pass?: string, confirm?: string,) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('El correu electrònic no es correcte.');
      return false;
    }
    if (pass !== null && confirm !== null) {
      if (pass == '') {
        alert('La contrasenya no es pot deixar en blanc.');
        return false;
      }
      if (pass !== confirm) {
        alert('Les contrasenyes no coincideixen.');
        return false;
      }
    }
    return true;
  }


}