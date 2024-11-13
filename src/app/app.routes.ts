import {  Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { TravelsComponent } from './pages/travels/travels.component';
import { TravelPageComponent } from './pages/destinations/travel-page/travel.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes =  [
    { path: '', component: HomeComponent }, // Ruta per a la pàgina d'inici
    { path: 'login', component: LoginComponent }, // Ruta per a la pàgina d'inici de sessió
    { path: 'register', component: RegisterComponent }, // Ruta per a la pàgina de registre
    { path: 'travels', component: TravelsComponent, canActivate: [AuthGuard] }, // Ruta per a la gestió de viatges, protegida per AuthGuard
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, // Ruta per a la gestió de viatges, protegida per AuthGuard
    { path: 'travel/:id', component: TravelPageComponent, canActivate: [AuthGuard] }, // Ruta per a la gestió de viatges, protegida per AuthGuard
    { path: 'travel/new', component: TravelPageComponent, canActivate: [AuthGuard] }, // Ruta per a la gestió de viatges, protegida per AuthGuard
    { path: '**', component:NotfoundComponent } // Redirigeix a 404 error per qualsevol ruta desconeguda
  ];
