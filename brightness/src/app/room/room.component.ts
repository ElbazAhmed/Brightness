import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [RouterLink,FormsModule,RouterOutlet,NgFor,NavbarComponent,HttpClientModule,NgIf],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
  providers: [ApiService]
})
export class RoomComponent {
  roomId: number | undefined;
  buildingId : number | undefined;
  autoMode: boolean = true;
  brightness: number = 255; 
  errorMessage: string | null = null;

  lamps: any[] = [];
  newLampName: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService, private http: HttpClient) {}

  ngOnInit(): void {
    // Get the building ID from the route parameter
    const id = this.route.snapshot.paramMap.get('id');
    const id1 = this.route.snapshot.paramMap.get('id1');
    this.roomId = id1 ? +id1 : 0;
    this.buildingId = id ? +id : 0;
    console.log('Room ID:', this.roomId);
    this.loadLamps(this.buildingId, this.roomId);

    // Fetch the current mode from the API
    this.apiService.getMode().subscribe(
      (data) => {
        this.autoMode = data.mode === 'auto';
        console.log('Current mode:', this.autoMode ? 'Auto' : 'Manual');
      },
      (error) => {
        console.error('Error fetching mode:', error);
        this.errorMessage = 'Failed to fetch the current mode.';
      }
    );

  }

    // Load lamps of a room
    loadLamps(buildingId: number, roomId: number): void {
      this.apiService.getLamps(buildingId,roomId).subscribe((data) => {
        this.lamps = data.lamps;
      });
      console.log(this.lamps);
    }

     // Add a new room to a building
    addLamp(buildingId: number, roomId: number, newLampName: string): void {
      this.apiService.addLamp(buildingId, roomId, newLampName).subscribe(() => {
        this.loadLamps(buildingId,roomId); // Refresh rooms
      });
  }

  toggleMode() {
    const mode = this.autoMode ? 'auto' : 'manual';
    this.apiService.setMode(mode).subscribe(
      (response) => {
        console.log('Mode set successfully:', response);
      },
      (error) => {
        console.error('Error setting mode:', error);
      }
    );
  }


  updateBrightness(event: Event) {
    if (this.autoMode) {
      this.errorMessage = 'Manual mode is not active. Cannot adjust brightness.';
      return;
    }

    const newValue = +(event.target as HTMLInputElement).value; // Get the slider value
    this.brightness = newValue;

    this.apiService.setBright(this.brightness).subscribe(
      (response) => {
        console.log('Mode set successfully:', response);
      },
      (error) => {
        console.error('Error setting mode:', error);
        alert('Failed to set mode. Please try again.');
      }
    );
  }


}
