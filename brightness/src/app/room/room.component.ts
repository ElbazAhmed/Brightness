import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [RouterLink,FormsModule,RouterOutlet,NgFor,NavbarComponent,HttpClientModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
  providers: [ApiService]
})
export class RoomComponent {
  roomId: number | undefined;
  buildingId : number | undefined;

  lamps: any[] = [];
  newLampName: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    // Get the building ID from the route parameter
    const id = this.route.snapshot.paramMap.get('id');
    const id1 = this.route.snapshot.paramMap.get('id1');
    this.roomId = id1 ? +id1 : 0;
    this.buildingId = id ? +id : 0;
    console.log('Room ID:', this.roomId);
    this.loadLamps(this.buildingId, this.roomId);

  }

    // Load lamps of a room
    loadLamps(buildingId: number, roomId: number): void {
      this.apiService.getLamps(buildingId,roomId).subscribe((data) => {
        this.lamps = data.rooms;
      });
      console.log(this.lamps);
    }

     // Add a new room to a building
    addLamp(buildingId: number, roomId: number, newLampName: string): void {
      this.apiService.addLamp(buildingId, roomId, newLampName).subscribe(() => {
        this.loadLamps(buildingId,roomId); // Refresh rooms
      });
  }


}
