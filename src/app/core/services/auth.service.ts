import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { lastValueFrom, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { NotificationService } from './notification.service';
import { environment } from '../../environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private baseUrl = environment.apiUrl + 'auth';
    private tokenKey = 'authToken'; // Clau per emmagatzemar el token

    constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) { }

    async register(user: User) {
        try {
            let res = await lastValueFrom(this.http.post<{ ok: string, message: string }>(this.baseUrl + '/register', user));
            if (res.ok) {
                this.notificationService.showSuccess(res.message);
            }
        } catch (error: unknown) {
            this.notificationService.handleError(error, 'Error al registrar l\' usuari');
        }
    }

    async login(email: string, password: string) {
        try {
            let res = await lastValueFrom(this.http.post<{ ok: string, token: string }>(this.baseUrl + '/login', { email, password }));
            this.storeToken(res.token); // Emmagatzema el token            
            return res;
        } catch (error: unknown) {
            this.notificationService.handleError(error, 'Error al iniciar sessió');
            return { ok: false };
        }
    }

    logout() {
        localStorage.removeItem(this.tokenKey); // Neteja el token        
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

}