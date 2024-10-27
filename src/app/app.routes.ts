import {  Routes } from '@angular/router';
import { AuthComponent} from './components/auth/auth.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthGuard } from './services/auth.guard';
import { TravelComponent } from './components/travel/travel.component';
import { TravelsComponent } from './components/travels/travels.component';

export const routes: Routes =  [
    { path: '', component: HomeComponent }, // Ruta per a la pàgina d'inici
    { path: 'login', component: AuthComponent }, // Ruta per a la pàgina d'inici de sessió
    { path: 'register', component: ProfileComponent }, // Ruta per a la pàgina de registre
    { path: 'travels', component: TravelsComponent, canActivate: [AuthGuard] }, // Ruta per a la gestió de viatges, protegida per AuthGuard
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, // Ruta per a la gestió de viatges, protegida per AuthGuard
    { path: 'travels/:id', component: TravelComponent, canActivate: [AuthGuard] }, // Ruta per a la gestió de viatges, protegida per AuthGuard
    { path: '**', component:NotfoundComponent } // Redirigeix a 404 error per qualsevol ruta desconeguda
  ];
