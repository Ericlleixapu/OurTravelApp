import {  Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { TravelsComponent } from './pages/travels/travels.component';
import { AuthGuard } from './core/guards/auth.guard';
import { TravelPageComponent } from './pages/travel/travel-page/travel-page.component';
import { TravelSummaryComponent } from './pages/travel-summary/travel-summary.component';

export const routes: Routes =  [
    { path: '', component: HomeComponent }, // Ruta per a la pàgina d'inici
    { path: 'login', component: LoginComponent }, // Ruta per a la pàgina d'inici de sessió
    { path: 'travels', component: TravelsComponent, canActivate: [AuthGuard] }, // Ruta per a la gestió de viatges, protegida per AuthGuard
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, // Ruta per a la gestió de viatges, protegida per AuthGuard
    { path: 'travel', component: TravelPageComponent, canActivate: [AuthGuard] }, // Ruta per a la gestió de viatges, protegida per AuthGuard
    { path: 'travel-summary/:travelId', component: TravelSummaryComponent}, // Ruta per a la gestió de viatges, protegida per AuthGuard
    { path: '**', component:NotfoundComponent } // Redirigeix a 404 error per qualsevol ruta desconeguda
  ];
