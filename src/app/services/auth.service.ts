import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { lastValueFrom, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'http://localhost:3000/api/auth';
    private tokenKey = 'authToken'; // Clau per emmagatzemar el token

    constructor(private http: HttpClient, private router: Router) { }
    async register(user: User): Promise<User> {
        return lastValueFrom(this.http.post<User>(this.baseUrl + '/register', user));
    }

    async login(email: string, password: string) {
        try {
            let res = await lastValueFrom(this.http.post<{ token: string }>(this.baseUrl + '/login', { email, password }));
            this.storeToken(res.token); // Emmagatzema el token            
            return res;
        } catch (error: any) {
            return error;
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