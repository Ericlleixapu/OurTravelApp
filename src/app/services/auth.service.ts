import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth';
  private tokenKey = 'authToken'; // Clau per emmagatzemar el token

  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, { name, email, password });
}

login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, { email, password })
        .pipe(
            tap(response => {
                this.storeToken(response.token); // Emmagatzema el token
            })
        );
}

logout() {
    sessionStorage.removeItem(this.tokenKey); // Neteja el token
}

private storeToken(token: string) {
    sessionStorage.setItem(this.tokenKey, token); // Emmagatzema el token en sessionStorage
}

public getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey); // Recupera el token
}

isAuthenticated(): boolean {
    return this.getToken() !== null; // Comprova si l'usuari està autenticat
}
}