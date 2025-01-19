import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HttpClientModule, FormsModule, RouterLink,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [ApiService]
})
export class HomeComponent {

  buildings: any[] = [];
  newBuildingName: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchBuildings();

  }

  fetchBuildings() {
    this.apiService.getBuildings().subscribe(
      (data) => {
        console.log('Buildings fetched:', data); // Debugging
        this.buildings = data; // Ensure this line correctly updates the array
      },
      (error) => {
        console.error('Error fetching buildings:', error);
      }
    );
  }

  addBuilding() {
    if (this.newBuildingName.trim()) {
      this.apiService.addBuilding(this.newBuildingName).subscribe(() => {
        this.newBuildingName = ''; // Clear the input field
        this.fetchBuildings(); // Refresh the buildings list
      });
    }
  }
}
