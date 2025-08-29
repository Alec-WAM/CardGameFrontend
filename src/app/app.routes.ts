import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home-component/home-component';
import { RoomComponent } from './components/pages/room-component/room-component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'room/:roomCode', component: RoomComponent },
    { path: '**', redirectTo: '' } // wildcard fallback
];
