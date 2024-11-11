import {  Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthGuard } from './services/auth.guard';
import { TravelComponent } from './components/travel/travel.component';
import { TravelsComponent } from './components/travels/travels.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes =  [
    { path: '', component: HomeComponent }, // Ruta per a la pàgina d'inici
    { path: 'login', component: LoginComponent }, // Ruta per a la pàgina d'inici de sessió
    { path: 'register', component: RegisterComponent }, // Ruta per a la pàgina de registre
    { path: 'travels', component: TravelsComponent, canActivate: [AuthGuard] }, // Ruta per a la gestió de viatges, protegida per AuthGuard
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, // Ruta per a la gestió de viatges, protegida per AuthGuard
    { path: 'travel/:id', component: TravelComponent, canActivate: [AuthGuard] }, // Ruta per a la gestió de viatges, protegida per AuthGuard
    { path: 'travel/new', component: TravelComponent, canActivate: [AuthGuard] }, // Ruta per a la gestió de viatges, protegida per AuthGuard
    { path: '**', component:NotfoundComponent } // Redirigeix a 404 error per qualsevol ruta desconeguda
  ];
