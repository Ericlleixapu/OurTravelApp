import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { User } from '../models/user.model'; // Assegura't que tens un model d'usuari definit
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api/users';
  private currentUser: User = {} as User;
  private tokenKey = 'authToken'; // Clau per emmagatzemar el token

  constructor(private http: HttpClient, private router: Router) { }
  register(user: User): Observable<User> {
      return this.http.post<User>(this.baseUrl + '/register', user);
  }

  async login(email: string, password: string) {
      try {
          let res = await lastValueFrom(this.http.post<{ token: string }>(this.baseUrl + '/login', { email, password }));
          this.storeToken(res.token); // Emmagatzema el token     
          this.getUserProfile();       
          return res;
      } catch (error: any) {
          return error;
      }
  }

  logout() {
      localStorage.removeItem(this.tokenKey); // Neteja el token      
      this.currentUser = {} as User;  
      this.router.navigate(['/']);
  }

  private storeToken(token: string) {
      localStorage.setItem(this.tokenKey, token); // Emmagatzema el token en localStorage
  }

  public getToken(): string | null {
      return localStorage.getItem(this.tokenKey); // Recupera el token
  }

  isAuthenticated(): boolean {
      return this.getToken() !== null; // Comprova si l'usuari està autenticat
  }
  
  async getUserProfile(): Promise<User> {
    try {
      const headers = this.getAuthHeaders();
      const res = await this.http.get<User>(this.baseUrl + '/profile', { headers });
      this.currentUser = await lastValueFrom(res);
      return lastValueFrom(res);
    } catch (error) {
      console.error('Error al obtenir el perfil de l\'usuari', error);
      throw error;
    }
  }
  getCurrentUser(): User {
    return this.currentUser;
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
      return error;
    }
  }

  // Obté els headers d'autorització amb el token
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  }
}