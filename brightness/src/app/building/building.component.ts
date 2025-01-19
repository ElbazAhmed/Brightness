import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-building',
  standalone: true,
  imports: [NavbarComponent, FormsModule, NgFor,RouterOutlet,HttpClientModule, RouterLink],
  templateUrl: './building.component.html',
  styleUrl: './building.component.css',
  providers: [ApiService]
})
export class BuildingComponent {
  buildingId: number | undefined;

  rooms: any[] = [];
  newRoomName: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    // Get the building ID from the route parameter
    const id = this.route.snapshot.paramMap.get('id');
    this.buildingId = id ? +id : 0;
    console.log('Building ID:', this.buildingId);
    this.loadRooms(this.buildingId);

  }


  // Load rooms of a building
  loadRooms(buildingId: number): void {
    this.apiService.getBuilding(buildingId).subscribe((data) => {
      this.rooms = data.rooms;
    });
    console.log(this.rooms);
  }

  // Add a new room to a building
  addRoom(buildingId: number, roomName: string): void {
    this.apiService.addRoom(buildingId, roomName).subscribe(() => {
      this.loadRooms(buildingId); // Refresh rooms
    });
  }


}
