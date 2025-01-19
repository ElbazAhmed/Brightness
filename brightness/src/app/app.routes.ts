import { Routes } from '@angular/router';
import { BuildingComponent } from './building/building.component';
import { HomeComponent } from './home/home.component';
import { RoomComponent } from './room/room.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'building/:id', component: BuildingComponent },
    { path: 'room/:id/:id1', component: RoomComponent },
];
