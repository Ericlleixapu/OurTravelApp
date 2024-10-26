import {  Routes } from '@angular/router';
import { AuthComponent} from './components/auth/auth.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
//import { TravelsComponent } from './components/travels/travels.component';
//import { AuthGuard } from './guards/auth.guard';

export const routes: Routes =  [
    { path: '', component: HomeComponent }, // Ruta per a la pàgina d'inici
    { path: 'login', component: AuthComponent }, // Ruta per a la pàgina d'inici de sessió
    { path: 'register', component: ProfileComponent }, // Ruta per a la pàgina de registre
    //{ path: 'travels', component: TravelsComponent, canActivate: [AuthGuard] }, // Ruta per a la gestió de viatges, protegida per AuthGuard
    { path: '**', redirectTo: '' } // Redirigeix a l'inici per qualsevol ruta desconeguda
  ];
